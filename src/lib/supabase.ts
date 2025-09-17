import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database service functions
export const orderService = {
  async createOrder(orderData: Partial<Order>) {
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getOrder(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        plaques (
          *,
          memorial_page:memorial_pages (*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateOrderStatus(id: string, status: Order['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export const memorialService = {
  async createMemorialPage(pageData: Partial<MemorialPage>) {
    const { data, error } = await supabase
      .from('memorial_pages')
      .insert(pageData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getMemorialPage(slug: string) {
    const { data, error } = await supabase
      .from('memorial_pages')
      .select(`
        *,
        qr_records (*)
      `)
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateMemorialPage(id: string, updates: Partial<MemorialPage>) {
    const { data, error } = await supabase
      .from('memorial_pages')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async incrementVisitCount(id: string) {
    const { error } = await supabase.rpc('increment_memorial_visits', { memorial_id: id });
    if (error) throw error;
  }
};