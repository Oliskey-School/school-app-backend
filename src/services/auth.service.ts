import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { supabase, supabaseAnon } from "../config/supabase";
import { config } from "../config/env";

export class AuthService {
  static async schoolSignup(data: any) {
    const email = data.email?.trim?.().toLowerCase?.();
    const password = data.password;
    const school_name = data.school_name;
    const full_name = data.full_name;
    const motto = data.motto;
    const address = data.address;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    if (!school_name) {
      throw new Error("school_name is required");
    }
    if (!full_name) {
      throw new Error("full_name is required");
    }

    // Use anon key so Supabase sends email OTP/link verification.
    // DB trigger handle_new_school_signup will create school/branch/admin profile based on metadata.
    const { data: signUpData, error } = await supabaseAnon.auth.signUp({
      email,
      password,
      options: {
        data: {
          signup_type: "new_school",
          school_name,
          full_name,
          motto,
          address,
          role: "admin",
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    // If email confirmation is enabled, user may be null and session may be null.
    // Frontend should prompt: "Check your email to verify".
    return {
      user: signUpData.user,
      session: signUpData.session,
      needs_email_verification: !signUpData.session,
    };
  }

  static async signup(data: any) {
    const email = data.email?.trim?.().toLowerCase?.();
    const password = data.password;
    const role = data.role || "Student";
    const school_id = data.school_id;
    const full_name = data.full_name;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // 1. Create Supabase Auth user (service role key required)
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name,
          role,
          school_id,
        },
      });

    if (authError) {
      throw new Error(`Supabase Auth Error: ${authError.message}`);
    }

    const userId = authData.user.id;

    // 2. Upsert profile record in public.users
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data: user, error } = await supabase
      .from("users")
      .upsert({
        id: userId,
        email,
        password_hash: hashedPassword,
        role,
        school_id,
        full_name,
        name: full_name,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    // 3. Create a session token so the caller can use it for auth
    const { data: sessionData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError || !sessionData?.session?.access_token) {
      throw new Error(
        `Supabase Sign-in Error: ${signInError?.message || "No session returned"}`,
      );
    }

    const token = sessionData.session.access_token;

    return { user, token };
  }

  static async login(email: string, password: string) {
    const normalizedEmail = email?.trim?.().toLowerCase?.();

    // 0. Handle Demo Login
    const isDemoAccount =
      normalizedEmail.endsWith("@demo.com") || normalizedEmail.includes("demo_");
    if (isDemoAccount && password === "password123") {
      const role = normalizedEmail.split("@")[0].replace("demo_", "");
      const demoUser = {
        id: `demo-${role}-id`,
        email: normalizedEmail,
        role: role.charAt(0).toUpperCase() + role.slice(1),
        school_id: "d0ff3e95-9b4c-4c12-989c-e5640d3cacd1",
        full_name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      };
      const token = jwt.sign(demoUser, config.jwtSecret, { expiresIn: "1d" });
      return { user: demoUser, token };
    }

    // 1. Authenticate with Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

    if (authError || !authData?.session) {
      throw new Error("Invalid credentials");
    }

    const token = authData.session.access_token;
    const userId = authData.user?.id;

    // 2. Fetch profile from public.users (fallback if missing)
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      throw new Error("User profile not found");
    }

    return { user, token };
  }
  static async createUser(data: any) {
    const email = data.email?.trim?.().toLowerCase?.();
    const password = data.password;
    const role = data.role || "Student";
    const school_id = data.school_id;
    const full_name = data.full_name;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    if (!school_id) {
      throw new Error("school_id is required");
    }
    if (!full_name) {
      throw new Error("full_name is required");
    }

    // 1. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Create Supabase Auth User (Auto-confirmed)
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name,
          role,
          school_id,
          username: data.username,
        },
      });

    if (authError) throw new Error(`Supabase Auth Error: ${authError.message}`);
    const userId = authData.user.id;

    // 3. Upsert into public.users (Sync ID & Hash)
    // Using upsert to handle potential trigger race conditions
    const { error: userError } = await supabase.from("users").upsert({
      id: userId,
      email,
      password_hash: hashedPassword,
      role,
      school_id,
      full_name,
      name: full_name,
    });

    if (userError) {
      // Fallback: If ID mismatch (e.g., users.id is int), try letting DB generate ID
      const { error: retryError } = await supabase.from("users").insert({
        email,
        password_hash: hashedPassword,
        role,
        school_id,
        full_name,
      });
      if (retryError)
        throw new Error(`User DB Error: ${retryError.message || userError.message}`);
    }

    // 4. Update auth_accounts (for username login)
    const { error: accountError } = await supabase
      .from("auth_accounts")
      .upsert({
        username: data.username,
        email,
        school_id,
        is_verified: true,
        user_id: userId,
      });

    if (accountError)
      console.warn("Auth Account Sync Warning:", accountError.message);

    return { id: userId, email, username: data.username };
  }
}
