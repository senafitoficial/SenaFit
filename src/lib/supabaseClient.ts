
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key cargada:", Boolean(supabaseKey));

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Faltan las credenciales de Supabase");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
