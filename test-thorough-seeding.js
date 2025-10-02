// Skrip untuk pembersihan dan seeding dengan penanganan async/await yang lebih ketat
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

// Ambil konfigurasi dari environment
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Buat client Supabase dengan service role
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Data kategori furniture
const categories = [
  { id: '1', name: 'Ruang Tamu', slug: 'ruang-tamu' },
  { id: '2', name: 'Ruang Makan', slug: 'ruang-makan' },
  { id: '3', name: 'Ruang Tidur', slug: 'ruang-tidur' },
  { id: '4', name: 'Kantor', slug: 'kantor' },
  { id: '5', name: 'Outdoor', slug: 'outdoor' },
];

// Data produk furniture dummy
const products = [
  {
    name: 'Kursi Tamu Minimalis',
    description: 'Kursi tamu dengan desain minimalis yang elegan, terbuat dari kayu jati pilihan dengan finishing halus.',
    price: 2500000,
    category_id: '1',
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
    category_id: '1',
    dimensions: { length: 200, width: 80, height: 85 },
    materials: ['Kayu Mahoni', 'Busa Densitas Tinggi', 'Kulit Sintetis'],
    image_urls: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Meja Tamu Modern',
    description: 'Meja tamu dengan desain modern dan finishing yang halus, cocok untuk ruang tamu minimalis.',
    price: 1750000,
    category_id: '1',
    dimensions: { length: 120, width: 60, height: 45 },
    materials: ['Kayu Jati', 'Kaca Tempered'],
    image_urls: [
      'https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573865563450-7d3b07f031a2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596727147700-6a299aef4e6f?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Lemari Hias',
    description: 'Lemari hias dengan desain elegan untuk menyimpan koleksi barang berharga Anda.',
    price: 3200000,
    category_id: '1',
    dimensions: { length: 180, width: 40, height: 200 },
    materials: ['Kayu Jati', 'Kaca'],
    image_urls: [
      'https://images.unsplash.com/photo-1597206389588-8c0b7a0b7c5a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Rak Buku Minimalis',
    description: 'Rak buku dengan desain minimalis, efisien namun tetap fungsional.',
    price: 1200000,
    category_id: '1',
    dimensions: { length: 80, width: 30, height: 180 },
    materials: ['Kayu Pinus', 'Finishing Non-Toxic'],
    image_urls: [
      'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Meja Makan Bundar',
    description: 'Meja makan bundar dengan 4 kursi, terbuat dari kayu jati dengan finishing halus.',
    price: 3500000,
    category_id: '2',
    dimensions: { diameter: 120, height: 75 },
    materials: ['Kayu Jati', 'Kursi Kain Premium'],
    image_urls: [
      'https://images.unsplash.com/photo-1556228453-efd5cdc40efe?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Set Meja Makan 6 Kursi',
    description: 'Set meja makan mewah dengan 6 kursi, cocok untuk keluarga besar.',
    price: 6500000,
    category_id: '2',
    dimensions: { length: 180, width: 90, height: 75 },
    materials: ['Kayu Mahoni', 'Kursi Kulit Sintetis'],
    image_urls: [
      'https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573865563450-7d3b07f031a2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596727147700-6a299aef4e6f?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Kursi Makan Ergonomis',
    description: 'Kursi makan dengan desain ergonomis, memberikan kenyamanan maksimal saat makan.',
    price: 450000,
    category_id: '2',
    dimensions: { width: 45, depth: 50, height: 85 },
    materials: ['Kayu Jati', 'Busa Densitas Tinggi', 'Kain Premium'],
    image_urls: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Buffet Ruang Makan',
    description: 'Buffet ruang makan dengan penyimpanan luas untuk peralatan makan.',
    price: 2800000,
    category_id: '2',
    dimensions: { length: 160, width: 45, height: 90 },
    materials: ['Kayu Jati', 'Kaca'],
    image_urls: [
      'https://images.unsplash.com/photo-1597206389588-8c0b7a0b7c5a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Meja Makan Kaca',
    description: 'Meja makan modern dengan permukaan kaca tempered dan kaki kayu jati.',
    price: 4200000,
    category_id: '2',
    dimensions: { length: 160, width: 80, height: 75 },
    materials: ['Kaca Tempered', 'Kayu Jati'],
    image_urls: [
      'https://images.unsplash.com/photo-1556228453-efd5cdc40efe?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Tempat Tidur King Size',
    description: 'Tempat tidur ukuran king dengan desain elegan dan finishing halus.',
    price: 7500000,
    category_id: '3',
    dimensions: { length: 200, width: 180, height: 50 },
    materials: ['Kayu Mahoni', 'Busa Densitas Tinggi', 'Kain Premium'],
    image_urls: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Lemari Pakaian 3 Pintu',
    description: 'Lemari pakaian dengan 3 pintu geser dan ruang penyimpanan luas.',
    price: 4800000,
    category_id: '3',
    dimensions: { length: 200, width: 60, height: 220 },
    materials: ['Kayu Jati', 'Kaca', 'Rel Pintu'],
    image_urls: [
      'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Meja Rias Mewah',
    description: 'Meja rias mewah dengan cermin besar dan laci penyimpanan.',
    price: 2200000,
    category_id: '3',
    dimensions: { length: 100, width: 45, height: 75 },
    materials: ['Kayu Mahoni', 'Kaca', 'Kursi Jaring'],
    image_urls: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Kursi Malas',
    description: 'Kursi malas nyaman untuk bersantai di kamar tidur.',
    price: 1800000,
    category_id: '3',
    dimensions: { width: 80, depth: 80, height: 75 },
    materials: ['Kayu Jati', 'Busa Densitas Tinggi', 'Kain Premium'],
    image_urls: [
      'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Kasur Spring Bed',
    description: 'Kasur spring bed dengan kualitas premium untuk tidur nyenyak.',
    price: 5500000,
    category_id: '3',
    dimensions: { length: 200, width: 160, height: 30 },
    materials: ['Pegas Spiral', 'Busa Memory Foam', 'Kain Katun'],
    image_urls: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Meja Kerja Ergonomis',
    description: 'Meja kerja dengan desain ergonomis, mendukung postur tubuh sehat saat bekerja.',
    price: 1850000,
    category_id: '4',
    dimensions: { length: 120, width: 60, height: 75 },
    materials: ['Kayu Jati', 'Logam'],
    image_urls: [
      'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Kursi Kantor Executive',
    description: 'Kursi kantor executive dengan bahan kulit sintetis dan sandaran tangan.',
    price: 1200000,
    category_id: '4',
    dimensions: { width: 65, depth: 65, height: 110 },
    materials: ['Kulit Sintetis', 'Busa Densitas Tinggi', 'Roda PVC', 'Besi'],
    image_urls: [
      'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Lemari Arsip',
    description: 'Lemari arsip dengan kunci pengaman untuk menyimpan dokumen penting.',
    price: 2400000,
    category_id: '4',
    dimensions: { length: 80, width: 40, height: 140 },
    materials: ['Kayu Jati', 'Besi', 'Kunci Pengaman'],
    image_urls: [
      'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Meja Rapat',
    description: 'Meja rapat besar dengan desain profesional, cocok untuk ruang konferensi.',
    price: 5000000,
    category_id: '4',
    dimensions: { length: 200, width: 100, height: 75 },
    materials: ['Kayu Mahoni', 'Kaki Logam'],
    image_urls: [
      'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Rak Server',
    description: 'Rak server dengan ventilasi baik dan ruang kabel yang terorganisir.',
    price: 3200000,
    category_id: '4',
    dimensions: { length: 60, width: 60, height: 180 },
    materials: ['Besi', 'Kipas Ventilasi'],
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
    category_id: '5',
    dimensions: { meja: { length: 100, width: 60, height: 75 }, kursi: { width: 50, depth: 50, height: 80 } },
    materials: ['Kayu Akasia', 'Pelindung Cuaca'],
    image_urls: [
      'https://images.unsplash.com/photo-1513519245627-4a45d9fa1a7a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Gazebo Kecil',
    description: 'Gazebo kecil untuk area taman atau halaman belakang.',
    price: 8500000,
    category_id: '5',
    dimensions: { length: 200, width: 200, height: 250 },
    materials: ['Kayu Jati', 'Atap Genteng'],
    image_urls: [
      'https://images.unsplash.com/photo-1513519245627-4a45d9fa1a7a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Kursi Ayunan Taman',
    description: 'Kursi ayunan untuk bersantai di taman dengan bahan tahan cuaca.',
    price: 1600000,
    category_id: '5',
    dimensions: { width: 60, depth: 60, height: 100 },
    materials: ['Kayu Akasia', 'Tali', 'Bantalan'],
    image_urls: [
      'https://images.unsplash.com/photo-1513519245627-4a45d9fa1a7a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Payung Taman',
    description: 'Payung taman besar dengan bahan anti air dan UV.',
    price: 1200000,
    category_id: '5',
    dimensions: { diameter: 240, height: 220 },
    materials: ['Kain Parasit', 'Besi', 'Tusuk Kayu'],
    image_urls: [
      'https://images.unsplash.com/photo-1513519245627-4a45d9fa1a7a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Kursi Malas Outdoor',
    description: 'Kursi malas outdoor dengan bahan tahan air dan sinar UV.',
    price: 900000,
    category_id: '5',
    dimensions: { width: 60, depth: 60, height: 80 },
    materials: ['Rattan Sintetis', 'Kerangka Logam'],
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
    category_id: '1',
    dimensions: { width: 70, depth: 70, height: 80 },
    materials: ['Kayu Mahoni', 'Busa Densitas Tinggi', 'Kulit Asli'],
    image_urls: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Meja Sudut Minimalis',
    description: 'Meja sudut minimalis untuk ruang tamu kecil atau sudut ruangan.',
    price: 1200000,
    category_id: '1',
    dimensions: { panjang: 80, lebar: 80, tinggi: 45 },
    materials: ['Kayu Pinus', 'Kaca'],
    image_urls: [
      'https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1573865563450-7d3b07f031a2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596727147700-6a299aef4e6f?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Kursi Santai Rotan',
    description: 'Kursi santai dari bahan rotan alami, memberikan nuansa natural.',
    price: 1400000,
    category_id: '1',
    dimensions: { width: 60, depth: 60, height: 80 },
    materials: ['Rotan Alami', 'Busa Densitas Rendah'],
    image_urls: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Set Kursi Meja Makan 8 Kursi',
    description: 'Set meja makan lengkap dengan 8 kursi untuk keluarga besar.',
    price: 8500000,
    category_id: '2',
    dimensions: { meja: { length: 220, width: 100, height: 75 }, kursi: { width: 45, depth: 50, height: 85 } },
    materials: ['Kayu Jati', 'Kursi Kain Premium'],
    image_urls: [
      'https://images.unsplash.com/photo-1556228453-efd5cdc40efe?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Lemari Pajangan',
    description: 'Lemari pajangan dengan pintu kaca untuk menampilkan koleksi barang berharga.',
    price: 3600000,
    category_id: '2',
    dimensions: { length: 160, width: 40, height: 180 },
    materials: ['Kayu Jati', 'Kaca'],
    image_urls: [
      'https://images.unsplash.com/photo-1597206389588-8c0b7a0b7c5a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Kasur Single Bed',
    description: 'Kasur single bed dengan finishing halus untuk kamar tidur anak atau tamu.',
    price: 2800000,
    category_id: '3',
    dimensions: { length: 200, width: 100, height: 25 },
    materials: ['Pegas Per', 'Busa Densitas Tinggi', 'Kain Katun'],
    image_urls: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Lemari Baju Anak',
    description: 'Lemari baju anak dengan desain lucu dan aman untuk anak.',
    price: 1800000,
    category_id: '3',
    dimensions: { length: 100, width: 50, height: 160 },
    materials: ['Kayu Pinus', 'Cat Non-Toxic'],
    image_urls: [
      'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  },
  {
    name: 'Meja Belajar Anak',
    description: 'Meja belajar ergonomis untuk anak usia sekolah.',
    price: 850000,
    category_id: '3',
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
    category_id: '3',
    dimensions: { length: 80, width: 30, height: 100 },
    materials: ['Kayu Jati', 'Finishing Non-Toxic'],
    image_urls: [
      'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop'
    ]
  }
];

const runThoroughSeed = async () => {
  console.log('Memulai proses seeding menyeluruh dengan penanganan async/await yang ketat...');
  
  try {
    // Langkah 1: Hapus semua data terkait dalam urutan yang benar
    console.log('1. Menghapus data product_images (gambar produk)...');
    const { error: imageError } = await supabase.from('product_images').delete().match({});
    if (imageError) console.error('Error saat menghapus product_images:', imageError);
    else console.log('   Berhasil menghapus data product_images');

    console.log('2. Menghapus data products (produk)...');
    const { error: productError } = await supabase.from('products').delete().match({});
    if (productError) console.error('Error saat menghapus products:', productError);
    else console.log('   Berhasil menghapus data products');

    console.log('3. Menghapus data categories (kategori)...');
    const { error: categoryError } = await supabase.from('categories').delete().match({});
    if (categoryError) console.error('Error saat menghapus categories:', categoryError);
    else console.log('   Berhasil menghapus data categories');

    console.log('4. Semua data lama telah dihapus.');

    // Langkah 2: Tambahkan kategori baru dengan UUID
    console.log('5. Menambahkan kategori baru...');
    const categoryIds = {};
    for (const category of categories) {
      const categoryId = uuidv4();
      categoryIds[category.id] = categoryId; // Simpan mapping ID lama ke UUID
      
      const { error } = await supabase.from('categories').insert({
        id: categoryId,
        name: category.name,
        slug: category.slug
      });

      if (error) {
        console.error('Error inserting category:', error);
      } else {
        console.log(`   Berhasil menyisipkan kategori: ${category.name}`);
      }
    }

    // Langkah 3: Tambahkan produk baru
    console.log('6. Menambahkan produk dan gambar produk...');
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
          category_id: categoryIds[product.category_id]
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
            console.log(`      Berhasil menyisipkan gambar untuk produk: ${product.name} (${imageUrl})`);
          }
        }
      }
    }

    console.log('\n7. Proses seeding selesai!');

    // Langkah akhir: Cek jumlah data yang berhasil disisipkan
    const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
    const { count: imageCount } = await supabase.from('product_images').select('*', { count: 'exact', head: true });
    const { count: categoryCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
    
    console.log(`\n--- Ringkasan Setelah Seeding ---`);
    console.log(`- Jumlah kategori: ${categoryCount}`);
    console.log(`- Jumlah produk: ${productCount}`);
    console.log(`- Jumlah gambar produk: ${imageCount}`);
    
  } catch (error) {
    console.error('Error utama dalam proses seeding:', error);
  }
};

runThoroughSeed();