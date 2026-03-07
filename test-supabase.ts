import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
    console.log("Intentando insertar en ai_logs...");
    const { data, error } = await supabase
        .from('ai_logs')
        .insert([{
            prompt: "Test from local script",
            response: "This is a test",
            model_used: "test-model"
        }])
        .select();
    
    if (error) {
        console.error("❌ Error Supabase:", error);
    } else {
        console.log("✅ Éxito:", data);
    }
}

testInsert();
