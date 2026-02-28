const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const supabase = require('./utils/supabaseClient');

async function test() {
  try {
    const { data, error } = await supabase.from('products').select('*').limit(1);
    if (error) {
      console.error('SUPABASE ERROR:', error);
      process.exit(2);
    }
    console.log('SUPABASE OK:', data);
    process.exit(0);
  } catch (err) {
    console.error('EXCEPTION:', err);
    process.exit(3);
  }
}

test();
