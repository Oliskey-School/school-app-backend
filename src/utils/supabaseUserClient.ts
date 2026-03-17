import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { config } from "../config/env";

export const createSupabaseUserClient = (accessToken: string): SupabaseClient => {
  if (!config.supabaseUrl || !config.supabaseAnonKey) {
    throw new Error("Supabase URL/Anon key not configured");
  }

  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
