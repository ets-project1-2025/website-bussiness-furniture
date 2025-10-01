-- File: supabase/update_phase3_schema.sql
-- Perintah SQL untuk memperbarui skema database sesuai kebutuhan Fase 3

-- Tambahkan tabel cart_items
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id) -- Seorang user hanya bisa memiliki satu entry per produk di keranjang
);

-- Tambahkan trigger untuk memperbarui waktu saat data diubah
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Menambahkan trigger ke tabel cart_items untuk mengupdate waktu
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Aktifkan RLS untuk tabel cart_items
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS untuk cart_items: pengguna hanya bisa mengakses item keranjang mereka sendiri
CREATE POLICY "Cart items are viewable by owner." ON cart_items
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items." ON cart_items
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items." ON cart_items
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items." ON cart_items
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Konfirmasi bahwa pembaruan telah selesai
SELECT 'Schema update for Phase 3 completed successfully' AS status;