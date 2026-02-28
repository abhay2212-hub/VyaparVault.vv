const supabase = require('../utils/supabaseClient');

async function countDocuments(filter = {}) {
    const builder = supabase.from('products').select('id', { count: 'exact', head: false });
    if (filter.name) builder.ilike('name', `%${filter.name}%`);
    const { count, error } = await builder;
    if (error) throw error;
    return count || 0;
}

async function list({ keyword = '', page = 1, pageSize = 12 } = {}) {
    let q = supabase.from('products').select('*');
    if (keyword) q = q.ilike('name', `%${keyword}%`);
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await q.range(from, to);
    if (error) throw error;
    return data || [];
}

async function getById(id) {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data || null;
}

async function deleteById(id) {
    const { data, error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    return data;
}

async function createSample(userId) {
    const sample = {
        name: 'Sample name',
        price: 0,
        user_id: userId || null,
        images: ['/images/sample.jpg'],
        brand: 'Sample brand',
        category: 'Sample category',
        stock: 0,
        num_reviews: 0,
        description: 'Sample description',
        created_at: new Date().toISOString()
    };
    const { data, error } = await supabase.from('products').insert(sample).select().single();
    if (error) throw error;
    return data;
}

async function updateById(id, fields) {
    const { data, error } = await supabase.from('products').update(fields).eq('id', id).select().maybeSingle();
    if (error) throw error;
    return data;
}

module.exports = { countDocuments, list, getById, deleteById, createSample, updateById };
