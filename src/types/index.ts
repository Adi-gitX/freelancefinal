export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'customer' | 'admin' | 'engraver';
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id?: string;
  order_number: string;
  status: 'cart' | 'pending_payment' | 'paid' | 'processing' | 'engraving' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  total_amount: number;
  currency: string;
  created_at: string;
  updated_at: string;
  payment_intent_id?: string;
  plaques?: Plaque[];
}

export interface Plaque {
  id: string;
  order_id: string;
  material: 'brass' | 'steel' | 'stone' | 'slate' | 'marble_black' | 'marble_white' | 'plastic_gold' | 'plastic_silver' | 'plastic_black';
  size: 'qr_only_5x5' | 'qr_name_6x6' | 'qr_name_words_6x7';
  shape: 'square' | 'rectangle' | 'rounded';
  qr_color: 'gold' | 'silver' | 'black' | 'white';
  text_color: 'gold' | 'silver' | 'black' | 'white';
  text_lines: string[];
  font_choice: string;
  preview_svg_url?: string;
  approved: boolean;
  created_at: string;
  memorial_page?: MemorialPage;
}

export interface MemorialPage {
  id: string;
  slug: string;
  full_name: string;
  nick_name?: string;
  birth_month_year?: string;
  death_month_year?: string;
  few_words?: string;
  photo_main_url?: string;
  about_text?: string;
  gallery?: string[];
  videos?: string[];
  privacy: 'public' | 'private' | 'password_protected';
  created_at: string;
  updated_at: string;
  visits_count: number;
  qr_records?: QRRecord[];
}

export interface QRRecord {
  id: string;
  memorial_page_id: string;
  qr_value: string;
  svg_qr_url: string;
  png_qr_url: string;
  created_at: string;
}

export interface Material {
  id: string;
  name: string;
  type: Plaque['material'];
  description: string;
  image_url: string;
  price_base: number;
  lead_time_days: number;
  engraving_depth: string;
  features: string[];
}

export interface OrderFormData {
  material: Plaque['material'];
  size: Plaque['size'];
  shape: Plaque['shape'];
  qr_color: Plaque['qr_color'];
  text_color: Plaque['text_color'];
  font_choice: string;
  text_lines: string[];
  full_name: string;
  nick_name?: string;
  birth_month_year?: string;
  death_month_year?: string;
  few_words?: string;
  photo_main_url?: string;
  privacy: MemorialPage['privacy'];
}