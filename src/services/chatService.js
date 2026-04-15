import { supabase } from './supabaseClient';

export const fetchSessions = async (userId) => {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('id, title, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const fetchSessionMessages = async (sessionId) => {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('messages')
    .eq('id', sessionId)
    .single();

  if (error) throw error;
  return data.messages;
};

export const saveSession = async (userId, title, messages) => {
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert([
      { user_id: userId, title, messages }
    ])
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
};

export const updateSessionMessages = async (sessionId, messages) => {
  const { error } = await supabase
    .from('chat_sessions')
    .update({ messages })
    .eq('id', sessionId);

  if (error) throw error;
};

export const deleteSession = async (sessionId) => {
  const { error } = await supabase
    .from('chat_sessions')
    .delete()
    .eq('id', sessionId);

  if (error) throw error;
};
