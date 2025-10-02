// src/lib/supabase-server.js
import { createServerClient } from '@supabase/ssr';
import { parse, serialize } from 'cookie';

// Fungsi untuk membuat Supabase Server Client
// Membaca session dari cookie request dan menulis ulang ke cookie response
export const createSupabaseServerClient = (Astro) => {
  const request = Astro.request;

  // Parse cookies dari request
  const cookies = parse(request.headers.get('Cookie') ?? '');

  // Konfigurasi Supabase Client untuk Server
  const client = createServerClient(
    process.env.PUBLIC_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      // Fungsi untuk membaca session dari cookie
      global: {
        headers: {
          'User-Agent': `Astro`,
        },
      },
      cookies: {
        // Mendapatkan nilai cookie berdasarkan nama
        get: (key) => cookies[key],
      },
    }
  );

  // Fungsi untuk menangani response (misalnya, untuk menulis ulang cookie session baru)
  const updateResponseWithNewSession = async (response) => {
    // Periksa apakah ada cookie baru yang dihasilkan oleh Supabase Client
    const updatedCookies = await client.auth.cookie();
    if (updatedCookies) {
      // Set cookie baru ke header response
      response.headers.set('Set-Cookie', serialize(updatedCookies.name, updatedCookies.value, updatedCookies.options));
    }
    return response;
  };

  return { client, updateResponseWithNewSession };
};