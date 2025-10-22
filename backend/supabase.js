import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

if (!supabaseAnonKey || !supabaseUrl) {
  console.log("Error: Env variables not found")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
