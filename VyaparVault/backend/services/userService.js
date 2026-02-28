const supabase = require('../utils/supabaseClient');
const bcrypt = require('bcryptjs');

function mapUserRow(row) {
    if (!row) return null;
    const user = { ...row, _id: row.id };
    delete user.id;
    return user;
}

async function getByEmail(email) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .limit(1)
        .maybeSingle();

    if (error) throw error;
    const user = mapUserRow(data);
    if (!user) return null;
    user.comparePassword = async (candidate) => bcrypt.compare(candidate, data.password);
    return user;
}

async function createUser({ username, email, password, role = 'user', address }) {
    const hashed = await bcrypt.hash(password, 10);
    const insert = {
        username,
        email,
        password: hashed,
        role,
        address: address || null,
        createdAt: new Date().toISOString()
    };

    const { data, error } = await supabase.from('users').insert(insert).select().single();
    if (error) throw error;
    const user = mapUserRow(data);
    user.comparePassword = async (candidate) => bcrypt.compare(candidate, data.password);
    return user;
}

async function getById(id) {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).limit(1).maybeSingle();
    if (error) throw error;
    if (!data) return null;
    const user = mapUserRow(data);
    delete user.password;
    return user;
}

module.exports = { getByEmail, createUser, getById };
