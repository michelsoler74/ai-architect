require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
  const { data, error } = await supabase.from('profiles').select('*').limit(5);
  console.log("PROFILES:", data);
  if (error) console.error("SELECT ERROR:", error);
  
  // also check ai_logs for the user
  const { data: logs, error: logsError } = await supabase.from('ai_logs').select('*');
  console.log("LOGS:", logs);
  if (logsError) console.error("LOGS ERROR:", logsError);
}
check();
