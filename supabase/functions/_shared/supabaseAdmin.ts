import { createClient } from "https://esm.sh/@supabase/supabase-js";

export function getSupabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SERVICE_ROLE_KEY")!
  );
}

/**
 * Extracts and verifies the JWT from the Authorization header.
 * Returns the authenticated user or null.
 */
export async function getCallerFromRequest(req: Request) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");
  const supabaseAdmin = getSupabaseAdmin();
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) return null;

  return user;
}
