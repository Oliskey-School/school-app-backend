import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase";
import { config } from "../config/env";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.warn("⚠️ [Auth] No authorization header provided");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // First try Supabase token validation
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (user) {
      // Fetch additional profile data (role, school_id) to populate req.user
      // Prefer `users` table (used by signup flow). Fallback to `profiles` for older schemas.
      const { data: profileFromUsers, error: usersProfileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const { data: profileFromProfiles, error: profilesProfileError } =
        !profileFromUsers
          ? await supabase
              .from("profiles")
              .select("*")
              .eq("id", user.id)
              .maybeSingle()
          : { data: null, error: null };

      if (usersProfileError || profilesProfileError) {
        console.warn(
          "⚠️ [Auth] Failed to load profile:",
          usersProfileError?.message || profilesProfileError?.message,
        );
      }

      const profile = profileFromUsers ?? profileFromProfiles;

      req.user = {
        ...user,
        ...profile,
        school_id: profile?.school_id,
      };

      return next();
    }

    // If Supabase auth fails, fall back to local JWT (demo tokens)
    const decoded = jwt.verify(token, config.jwtSecret) as any;
    req.user = decoded;
    return next();
  } catch (error: any) {
    console.error("Auth Exception:", error.message ?? error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};
