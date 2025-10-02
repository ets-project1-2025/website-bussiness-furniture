-- File: supabase-commands.sql
-- Kumpulan perintah SQL untuk menyiapkan sistem admin di Supabase

-- 1. Tambahkan kolom is_admin ke tabel profiles
-- Perintah ini akan menambahkan kolom is_admin dengan default FALSEFALSE
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- 2. Contoh cara menandai user tertentu sebagai admin
-- Ganti 'USER_ID_YANG_ANDA_SALIN' dengan User ID sebenarnya dari halaman Authentication > Users
-- Anda bisa menemukan User ID di halaman Authentication > Users di Supabase Dashboard
/*
UPDATE profiles 
SET is_admin = TRUE 
WHERE id = 'USER_ID_YANG_ANDA_SALIN';
*/

-- 3. Contoh cara menandai user berdasarkan email sebagai admin
-- Ganti 'email_anda@example.com' dengan email akun yang ingin Anda jadikan admin
/*
UPDATE profiles 
SET is_admin = TRUE 
WHERE id = (
  SELECT id 
  FROM auth.users 
  WHERE email = 'email_anda@example.com'
);
*/

-- 4. Contoh cara melihat semua user dengan status admin
-- SELECT p.id, u.email, p.full_name, p.is_admin
-- FROM profiles p
-- JOIN auth.users u ON p.id = u.id
-- WHERE p.is_admin = TRUE;

-- 5. Contoh cara melihat semua user dengan informasi apakah mereka admin
-- SELECT p.id, u.email, p.full_name, p.is_admin
-- FROM profiles p
-- JOIN auth.users u ON p.id = u.id;