// src/lib/supabase-server.js
import { createServerClient } from '@supabase/ssr';
import { parse, serialize } from 'cookie';

// Fungsi untuk membuat Supabase Server Client
// Membaca session dari cookie request
export const createSupabaseServerClient = (Astro) => {
  const request = Astro.request;

  // Log untuk debugging: apakah env vars tersedia?
  console.log("PUBLIC_SUPABASE_URL di supabase-server:", process.env.PUBLIC_SUPABASE_URL ? "TERSERAH" : "KOSONG");
  console.log("NEXT_PUBLIC_SUPABASE_URL di supabase-server:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "TERSERAH" : "KOSONG");
  console.log("PUBLIC_SUPABASE_ANON_KEY di supabase-server:", process.env.PUBLIC_SUPABASE_ANON_KEY ? "TERSERAH" : "KOSONG");
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY di supabase-server:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "TERSERAH" : "KOSONG");

  const supabaseUrl = process.env.PUBLIC_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("URL atau KEY Supabase tidak ditemukan di server-side!");
    return null; // Kembalikan null jika hilang
  }

  // Parse cookies dari request
  const cookies = parse(request.headers.get('Cookie') ?? '');
  console.log("Cookies dari request:", cookies); // Log cookies yang diterima

  // Konfigurasi Supabase Client untuk Server
  // Dengan konfigurasi cookies yang benar
  const client = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      global: {
        headers: {
          'User-Agent': `Astro`,
        },
      },
      cookies: {
        // Fungsi untuk membaca cookie dari request
        get: (key) => {
            const value = cookies[key];
            console.log(`Membaca cookie '${key}':`, value ? "TERSERAH" : "KOSONG");
            return value;
        },

        // Fungsi untuk menulis cookie ke response (diperlukan untuk SSR)
        // Ini penting agar session bisa dikembalikan ke browser jika berubah
        set: (key, value, options) => {
          console.log(`Mengatur cookie '${key}' untuk response`);
          // Gunakan serialize dari pustaka cookie
          const serializedCookie = serialize(key, value, { ...options, path: '/' }); // contoh path
          // Tambahkan ke header Set-Cookie di response
          // Kita kembalikan cookie ini sebagai string, nanti Astro yang menangani response
          return serializedCookie;
        },

        // Fungsi untuk menghapus cookie dari response (jika perlu)
        remove: (key, options) => {
          console.log(`Menghapus cookie '${key}' dari response`);
          const serializedCookie = serialize(key, '', { ...options, path: '/', maxAge: 0 });
          return serializedCookie;
        },
      },
    }
  );

  if (!client) {
      console.error("Gagal membuat Supabase server client!");
  } else {
      console.log("Berhasil membuat Supabase server client.");
  }

  return client;
};