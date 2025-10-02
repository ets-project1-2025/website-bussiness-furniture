// Skrip untuk membersihkan tabel dan membuat 10 data dummy produk furniture (versi perbaikan dengan penghapusan data yang benar)
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

// Ambil konfigurasi dari environment
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Buat client Supabase dengan service role
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Data produk furniture dummy (hanya 10)
const products = [
  {
    name: 'Kursi Tamu Minimalis',
    description: 'Kursi tamu dengan desain minimalis yang elegan, terbuat dari kayu jati pilihan dengan finishing halus.',
    price: 2500000,
    category_name: 'Ruang Tamu',
    category_slug: 'ruang-tamu',
    dimensions: { length: 120, width: 60, height: 80 },
    materials: ['Kayu Jati', 'Busa Densitas Tinggi', 'Kain Premium'],
    image_urls: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Sofa 3 Dudukan',
    description: 'Sofa nyaman dengan 3 dudukan, dilengkapi sandaran tangan dan finishing berkualitas.',
    price: 4500000,
    category_name: 'Ruang Tamu',
    category_slug: 'ruang-tamu',
    dimensions: { length: 200, width: 80, height: 85 },
    materials: ['Kayu Mahoni', 'Busa Densitas Tinggi', 'Kulit Sintetis'],
    image_urls: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Meja Makan Bundar',
    description: 'Meja makan bundar dengan 4 kursi, terbuat dari kayu jati dengan finishing halus.',
    price: 3500000,
    category_name: 'Ruang Makan',
    category_slug: 'ruang-makan',
    dimensions: { diameter: 120, height: 75 },
    materials: ['Kayu Jati', 'Kursi Kain Premium'],
    image_urls: [
      'https://images.unsplash.com/photo-1556228453-efd5cdc40efe?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Lemari Pakaian 3 Pintu',
    description: 'Lemari pakaian dengan 3 pintu geser dan ruang penyimpanan luas.',
    price: 4800000,
    category_name: 'Ruang Tidur',
    category_slug: 'ruang-tidur',
    dimensions: { length: 200, width: 60, height: 220 },
    materials: ['Kayu Jati', 'Kaca', 'Rel Pintu'],
    image_urls: [
      'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Meja Kerja Ergonomis',
    description: 'Meja kerja dengan desain ergonomis, mendukung postur tubuh sehat saat bekerja.',
    price: 1850000,
    category_name: 'Kantor',
    category_slug: 'kantor',
    dimensions: { length: 120, width: 60, height: 75 },
    materials: ['Kayu Jati', 'Logam'],
    image_urls: [
      'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Set Meja Kursi Taman',
    description: 'Set meja dan kursi taman dengan bahan tahan cuaca untuk penggunaan outdoor.',
    price: 2800000,
    category_name: 'Outdoor',
    category_slug: 'outdoor',
    dimensions: { meja: { length: 100, width: 60, height: 75 }, kursi: { width: 50, depth: 50, height: 80 } },
    materials: ['Kayu Akasia', 'Pelindung Cuaca'],
    image_urls: [
      'https://images.unsplash.com/photo-1513519245627-4a45d9fa1a7a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Kursi Tamu Elegan',
    description: 'Kursi tamu dengan desain elegan, dilengkapi meja samping.',
    price: 3200000,
    category_name: 'Ruang Tamu',
    category_slug: 'ruang-tamu',
    dimensions: { width: 70, depth: 70, height: 80 },
    materials: ['Kayu Mahoni', 'Busa Densitas Tinggi', 'Kulit Asli'],
    image_urls: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Set Kursi Meja Makan 8 Kursi',
    description: 'Set meja makan lengkap dengan 8 kursi untuk keluarga besar.',
    price: 8500000,
    category_name: 'Ruang Makan',
    category_slug: 'ruang-makan',
    dimensions: { meja: { length: 220, width: 100, height: 75 }, kursi: { width: 45, depth: 50, height: 85 } },
    materials: ['Kayu Jati', 'Kursi Kain Premium'],
    image_urls: [
      'https://images.unsplash.com/photo-1556228453-efd5cdc40efe?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Meja Belajar Anak',
    description: 'Meja belajar ergonomis untuk anak usia sekolah.',
    price: 850000,
    category_name: 'Ruang Tidur',
    category_slug: 'ruang-tidur',
    dimensions: { length: 80, width: 50, height: 75 },
    materials: ['Kayu Pinus', 'Cat Non-Toxic'],
    image_urls: [
      'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Rak Sepatu',
    description: 'Rak sepatu dengan kapasitas besar untuk menyimpan berbagai pasang sepatu.',
    price: 1200000,
    category_name: 'Ruang Tidur',
    category_slug: 'ruang-tidur',
    dimensions: { length: 80, width: 30, height: 100 },
    materials: ['Kayu Jati', 'Finishing Non-Toxic'],
    image_urls: [
      'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  }
];

const cleanAndCreateDummyDataV3 = async () => {
  console.log('Membersihkan tabel produk dan gambar produk...');
  
  try {
    // Hapus semua data dari tabel terkait dalam urutan yang benar
    console.log('1. Menghapus semua data dari tabel product_images...');
    const { error: imageError } = await supabase.from('product_images').delete().neq('id', '');
    if (imageError) {
      console.error('Error menghapus product_images:', imageError);
      // Jika neq tidak bekerja, coba dengan filter lain
      await supabase.from('product_images').delete().gt('id', '00000000-0000-0000-0000-000000000000');
    } else {
      console.log('   Berhasil menghapus product_images');
    }

    console.log('2. Menghapus semua data dari tabel products...');
    const { error: productError } = await supabase.from('products').delete().neq('id', '');
    if (productError) {
      console.error('Error menghapus products:', productError);
      await supabase.from('products').delete().gt('id', '00000000-0000-0000-0000-000000000000');
    } else {
      console.log('   Berhasil menghapus products');
    }

    console.log('3. Menghapus semua data dari tabel categories...');
    const { error: categoryError } = await supabase.from('categories').delete().neq('id', '');
    if (categoryError) {
      console.error('Error menghapus categories:', categoryError);
      await supabase.from('categories').delete().gt('id', '00000000-0000-0000-0000-000000000000');
    } else {
      console.log('   Berhasil menghapus categories');
    }

    // Tunggu beberapa saat untuk memastikan penghapusan selesai
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Buat kategori unik dari produk
    const categoryMap = new Map();
    products.forEach(product => {
      if (!categoryMap.has(product.category_slug)) {
        categoryMap.set(product.category_slug, {
          name: product.category_name,
          slug: product.category_slug
        });
      }
    });

    console.log('4. Menambahkan kategori baru...');
    const categoryIds = {};
    for (const [slug, catInfo] of categoryMap) {
      const categoryId = uuidv4();
      categoryIds[slug] = categoryId;
      
      const { error } = await supabase.from('categories').insert({
        id: categoryId,
        name: catInfo.name,
        slug: catInfo.slug
      });

      if (error) {
        console.error('Error inserting category:', error);
      } else {
        console.log(`   Berhasil menyisipkan kategori: ${catInfo.name}`);
      }
    }

    console.log('5. Menambahkan 10 produk furniture dummy dan gambar produk...');
    for (const product of products) {
      // Buat produk
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          description: product.description,
          price: product.price,
          dimensions: product.dimensions,
          materials: product.materials,
          category_id: categoryIds[product.category_slug]
        })
        .select();

      if (error) {
        console.error('Error inserting product:', error);
      } else if (data && data.length > 0) {
        const productId = data[0].id;
        console.log(`   Berhasil menyisipkan produk: ${product.name} (ID: ${productId})`);

        // Tambahkan gambar-gambar produk
        for (let i = 0; i < product.image_urls.length; i++) {
          const imageUrl = product.image_urls[i];
          const { error: imageError } = await supabase
            .from('product_images')
            .insert({
              product_id: productId,
              image_url: imageUrl,
              is_primary: i === 0
            });

          if (imageError) {
            console.error('Error inserting product image:', imageError);
          } else {
            console.log(`      Berhasil menyisipkan gambar untuk produk: ${product.name}`);
          }
        }
      }
    }

    console.log('\n6. Proses pembuatan data dummy selesai!');
    
    // Cek jumlah data yang berhasil disisipkan
    const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
    const { count: imageCount } = await supabase.from('product_images').select('*', { count: 'exact', head: true });
    const { count: categoryCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
    
    console.log(`\n--- Ringkasan ---`);
    console.log(`- Jumlah kategori: ${categoryCount}`);
    console.log(`- Jumlah produk: ${productCount}`);
    console.log(`- Jumlah gambar produk: ${imageCount}`);
    
  } catch (error) {
    console.error('Error dalam proses pembersihan dan pembuatan data dummy:', error);
  }
};

cleanAndCreateDummyDataV3();