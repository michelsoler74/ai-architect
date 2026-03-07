const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://fsclleaqcbimjkdhyjnr.supabase.co";
const supabaseKey = "sb_publishable_RvpbLbi8PQAwhGHadUf5OQ_qFQXCtpO";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
    console.log("Intentando insertar en ai_logs...");
    const { data, error } = await supabase
        .from('ai_logs')
        .insert([{
            prompt: "Test from local script JS",
            response: "This is a test from JS",
            model_used: "test-model-js"
        }])
        .select();
    
    if (error) {
        console.error("❌ Error Supabase:", error);
    } else {
        console.log("✅ Éxito:", data);
    }
}

testInsert();
