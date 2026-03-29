// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts"
import { getSupabaseAdmin, getCallerFromRequest } from "../_shared/supabaseAdmin.ts";

Deno.serve(async (req) => {
  const caller = await getCallerFromRequest(req);

  if (!caller) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data: user, error } = await supabaseAdmin.auth.admin.deleteUser(caller.id);

  if (!user || error) {
    console.error("Error deleting user: ", error?.message);
    return new Response(JSON.stringify({ deleted: false }), { status: 200 });
  }

  return new Response(JSON.stringify({ deleted: true }), { status: 200 });
})
