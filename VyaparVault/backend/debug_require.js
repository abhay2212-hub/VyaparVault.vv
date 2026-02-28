require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const admin = require('./routes/adminRoutes');
console.log('admin type:', typeof admin);
console.log('admin keys:', Object.keys(admin));
if (admin && admin.stack) console.log('router stack length', admin.stack.length);
