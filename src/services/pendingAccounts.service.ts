import crypto from "crypto";
import { supabase } from "../config/supabase";
import { createSupabaseUserClient } from "../utils/supabaseUserClient";

export class PendingAccountsService {
  static async createPending(accessToken: string, data: any) {
    const userClient = createSupabaseUserClient(accessToken);

    const email = data.email?.trim?.().toLowerCase?.();
    const full_name = data.full_name;
    const role = data.role;
    const school_id = data.school_id;
    const branch_id = data.branch_id ?? null;
    const class_id = data.class_id ?? null;

    if (!school_id) throw new Error("school_id is required");
    if (!email) throw new Error("email is required");
    if (!full_name) throw new Error("full_name is required");
    if (!role) throw new Error("role is required");

    const { data: row, error } = await userClient
      .from("pending_accounts")
      .insert({
        school_id,
        branch_id,
        class_id,
        email,
        full_name,
        role,
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return row;
  }

  static async listPending(accessToken: string, filters: any) {
    const userClient = createSupabaseUserClient(accessToken);

    const status = filters.status ?? "pending";
    const school_id = filters.school_id;

    if (!school_id) throw new Error("school_id is required");

    let query = userClient
      .from("pending_accounts")
      .select("*")
      .eq("school_id", school_id)
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  }

  static async approvePending(accessToken: string, pendingId: string) {
    // Validate caller and read pending row via RLS (must be admin/proprietor/super_admin)
    const userClient = createSupabaseUserClient(accessToken);

    const { data: pending, error: pendingError } = await userClient
      .from("pending_accounts")
      .select("*")
      .eq("id", pendingId)
      .single();

    if (pendingError) throw new Error(pendingError.message);
    if (!pending) throw new Error("Pending account not found");
    if (pending.status !== "pending") {
      throw new Error(`Pending account already ${pending.status}`);
    }

    // Generate temporary password (one-time display)
    const tempPassword = crypto.randomBytes(9).toString("base64url");

    // Create Auth user (service role)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: pending.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        full_name: pending.full_name,
        role: pending.role,
        school_id: pending.school_id,
        branch_id: pending.branch_id,
      },
    });

    if (authError) {
      throw new Error(`Supabase Auth Error: ${authError.message}`);
    }

    const authUserId = authData.user.id;

    // Insert profile row in public.users (service role bypasses RLS)
    // Let DB trigger set_custom_id_trigger generate custom_id automatically.
    const insertPayload: any = {
      id: authUserId,
      school_id: pending.school_id,
      branch_id: pending.branch_id,
      email: pending.email,
      full_name: pending.full_name,
      name: pending.full_name,
      role: pending.role,
      is_active: true,
    };

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .insert(insertPayload)
      .select("*")
      .single();

    if (profileError) {
      // Defensive fallback if schema doesn't include branch_id
      if (
        typeof profileError.message === "string" &&
        profileError.message.toLowerCase().includes("branch_id")
      ) {
        delete insertPayload.branch_id;
        const { data: retryProfile, error: retryError } = await supabase
          .from("users")
          .insert(insertPayload)
          .select("*")
          .single();

        if (retryError) {
          throw new Error(`Profile creation failed: ${retryError.message}`);
        }

        // Mark pending row approved
        const { error: updateError } = await userClient
          .from("pending_accounts")
          .update({
            status: "approved",
            approved_at: new Date().toISOString(),
          })
          .eq("id", pendingId);

        if (updateError) throw new Error(updateError.message);

        return {
          user: retryProfile,
          temp_password: tempPassword,
        };
      }

      throw new Error(`Profile creation failed: ${profileError.message}`);
    }

    // Mark pending row approved
    const { error: updateError } = await userClient
      .from("pending_accounts")
      .update({
        status: "approved",
        approved_at: new Date().toISOString(),
      })
      .eq("id", pendingId);

    if (updateError) throw new Error(updateError.message);

    return {
      user: profile,
      temp_password: tempPassword,
    };
  }
}
