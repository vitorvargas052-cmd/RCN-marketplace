import { createClient } from "@supabase/supabase-js";

// 🔗 Conexão única com o Supabase (usada em todo o projeto)
const supabaseUrl = "https://zqkksqfjwjznbkmivycc.supabase.com";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxa2tzcWZqd2p6bmJrbWl2eWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NjU5NjMsImV4cCI6MjA3NzI0MTk2M30.wiAKtsG4-or0CwW1kjRBx3ljFLnRLKhR6TXD202BcF0";

export const supabase = createClient(supabaseUrl, supabaseKey);
