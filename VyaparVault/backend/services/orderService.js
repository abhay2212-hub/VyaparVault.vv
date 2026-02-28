const supabase = require('../utils/supabaseClient');
const userService = require('./userService');

async function createOrder(orderData) {
    const payload = { ...orderData, createdAt: new Date().toISOString() };
    const { data, error } = await supabase.from('orders').insert(payload).select().single();
    if (error) throw error;
    return data;
}

async function getById(id) {
    const { data, error } = await supabase.from('orders').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    if (!data) return null;
    // attach user info if present
    if (data.user) {
        const user = await userService.getById(data.user);
        data.userInfo = user;
    }
    return data;
}

async function updatePayment(id, paymentData) {
    const fields = {
        isPaid: true,
        paidAt: new Date().toISOString(),
        paymentResult: paymentData,
        razorpayPaymentId: paymentData.razorpayPaymentId || null
    };
    const { data, error } = await supabase.from('orders').update(fields).eq('id', id).select().maybeSingle();
    if (error) throw error;
    return data;
}

async function getByUser(userId) {
    const { data, error } = await supabase.from('orders').select('*').eq('user', userId).order('createdAt', { ascending: false });
    if (error) throw error;
    return data || [];
}

async function getAll() {
    const { data, error } = await supabase.from('orders').select('*').order('createdAt', { ascending: false });
    if (error) throw error;
    return data || [];
}

async function updateDeliver(id) {
    const fields = { isDelivered: true, deliveredAt: new Date().toISOString(), orderStatus: 'Delivered' };
    const { data, error } = await supabase.from('orders').update(fields).eq('id', id).select().maybeSingle();
    if (error) throw error;
    return data;
}

module.exports = { createOrder, getById, updatePayment, getByUser, getAll, updateDeliver };
