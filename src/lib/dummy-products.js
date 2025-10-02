// src/lib/dummy-products.js

// Data kategori furniture
export const dummyCategories = [
  { id: '1', name: 'Ruang Tamu', slug: 'ruang-tamu' },
  { id: '2', name: 'Ruang Makan', slug: 'ruang-makan' },
  { id: '3', name: 'Ruang Tidur', slug: 'ruang-tidur' },
  { id: '4', name: 'Kantor', slug: 'kantor' },
  { id: '5', name: 'Outdoor', slug: 'outdoor' },
];

// Data produk furniture dummy
export const dummyProducts = [
  {
    id: '1',
    name: 'Kursi Tamu Minimalis',
    description: 'Kursi tamu dengan desain minimalis yang elegan, terbuat dari kayu jati pilihan dengan finishing halus.',
    price: 2500000,
    category_id: '1',
    dimensions: { length: 120, width: 60, height: 80 },
    materials: ['Kayu Jati', 'Busa Densitas Tinggi', 'Kain Premium'],
    product_images: [
      { id: '1', image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop', is_primary: true },
      { id: '2', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '3', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '2',
    name: 'Sofa 3 Dudukan',
    description: 'Sofa nyaman dengan 3 dudukan, dilengkapi sandaran tangan dan finishing berkualitas.',
    price: 4500000,
    category_id: '1',
    dimensions: { length: 200, width: 80, height: 85 },
    materials: ['Kayu Mahoni', 'Busa Densitas Tinggi', 'Kulit Sintetis'],
    product_images: [
      { id: '4', image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop', is_primary: true },
      { id: '5', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '6', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '3',
    name: 'Meja Tamu Modern',
    description: 'Meja tamu dengan desain modern dan finishing yang halus, cocok untuk ruang tamu minimalis.',
    price: 1750000,
    category_id: '1',
    dimensions: { length: 120, width: 60, height: 45 },
    materials: ['Kayu Jati', 'Kaca Tempered'],
    product_images: [
      { id: '7', image_url: 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=800&h=600&fit=crop', is_primary: true },
      { id: '8', image_url: 'https://images.unsplash.com/photo-1573865563450-7d3b07f031a2?w=800&h=600&fit=crop', is_primary: false },
      { id: '9', image_url: 'https://images.unsplash.com/photo-1596727147700-6a299aef4e6f?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '4',
    name: 'Lemari Hias',
    description: 'Lemari hias dengan desain elegan untuk menyimpan koleksi barang berharga Anda.',
    price: 3200000,
    category_id: '1',
    dimensions: { length: 180, width: 40, height: 200 },
    materials: ['Kayu Jati', 'Kaca'],
    product_images: [
      { id: '10', image_url: 'https://images.unsplash.com/photo-1597206389588-8c0b7a0b7c5a?w=800&h=600&fit=crop', is_primary: true },
      { id: '11', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '12', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '5',
    name: 'Rak Buku Minimalis',
    description: 'Rak buku dengan desain minimalis, efisien namun tetap fungsional.',
    price: 1200000,
    category_id: '1',
    dimensions: { length: 80, width: 30, height: 180 },
    materials: ['Kayu Pinus', 'Finishing Non-Toxic'],
    product_images: [
      { id: '13', image_url: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&h=600&fit=crop', is_primary: true },
      { id: '14', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '15', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '6',
    name: 'Meja Makan Bundar',
    description: 'Meja makan bundar dengan 4 kursi, terbuat dari kayu jati dengan finishing halus.',
    price: 3500000,
    category_id: '2',
    dimensions: { diameter: 120, height: 75 },
    materials: ['Kayu Jati', 'Kursi Kain Premium'],
    product_images: [
      { id: '16', image_url: 'https://images.unsplash.com/photo-1556228453-efd5cdc40efe?w=800&h=600&fit=crop', is_primary: true },
      { id: '17', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '18', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '7',
    name: 'Set Meja Makan 6 Kursi',
    description: 'Set meja makan mewah dengan 6 kursi, cocok untuk keluarga besar.',
    price: 6500000,
    category_id: '2',
    dimensions: { length: 180, width: 90, height: 75 },
    materials: ['Kayu Mahoni', 'Kursi Kulit Sintetis'],
    product_images: [
      { id: '19', image_url: 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=800&h=600&fit=crop', is_primary: true },
      { id: '20', image_url: 'https://images.unsplash.com/photo-1573865563450-7d3b07f031a2?w=800&h=600&fit=crop', is_primary: false },
      { id: '21', image_url: 'https://images.unsplash.com/photo-1596727147700-6a299aef4e6f?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '8',
    name: 'Kursi Makan Ergonomis',
    description: 'Kursi makan dengan desain ergonomis, memberikan kenyamanan maksimal saat makan.',
    price: 450000,
    category_id: '2',
    dimensions: { width: 45, depth: 50, height: 85 },
    materials: ['Kayu Jati', 'Busa Densitas Tinggi', 'Kain Premium'],
    product_images: [
      { id: '22', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: true },
      { id: '23', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false },
      { id: '24', image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '9',
    name: 'Buffet Ruang Makan',
    description: 'Buffet ruang makan dengan penyimpanan luas untuk peralatan makan.',
    price: 2800000,
    category_id: '2',
    dimensions: { length: 160, width: 45, height: 90 },
    materials: ['Kayu Jati', 'Kaca'],
    product_images: [
      { id: '25', image_url: 'https://images.unsplash.com/photo-1597206389588-8c0b7a0b7c5a?w=800&h=600&fit=crop', is_primary: true },
      { id: '26', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '27', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '10',
    name: 'Meja Makan Kaca',
    description: 'Meja makan modern dengan permukaan kaca tempered dan kaki kayu jati.',
    price: 4200000,
    category_id: '2',
    dimensions: { length: 160, width: 80, height: 75 },
    materials: ['Kaca Tempered', 'Kayu Jati'],
    product_images: [
      { id: '28', image_url: 'https://images.unsplash.com/photo-1556228453-efd5cdc40efe?w=800&h=600&fit=crop', is_primary: true },
      { id: '29', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '30', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '11',
    name: 'Tempat Tidur King Size',
    description: 'Tempat tidur ukuran king dengan desain elegan dan finishing halus.',
    price: 7500000,
    category_id: '3',
    dimensions: { length: 200, width: 180, height: 50 },
    materials: ['Kayu Mahoni', 'Busa Densitas Tinggi', 'Kain Premium'],
    product_images: [
      { id: '31', image_url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop', is_primary: true },
      { id: '32', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '33', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '12',
    name: 'Lemari Pakaian 3 Pintu',
    description: 'Lemari pakaian dengan 3 pintu geser dan ruang penyimpanan luas.',
    price: 4800000,
    category_id: '3',
    dimensions: { length: 200, width: 60, height: 220 },
    materials: ['Kayu Jati', 'Kaca', 'Rel Pintu'],
    product_images: [
      { id: '34', image_url: 'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop', is_primary: true },
      { id: '35', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '36', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '13',
    name: 'Meja Rias Mewah',
    description: 'Meja rias mewah dengan cermin besar dan laci penyimpanan.',
    price: 2200000,
    category_id: '3',
    dimensions: { length: 100, width: 45, height: 75 },
    materials: ['Kayu Mahoni', 'Kaca', 'Kursi Jaring'],
    product_images: [
      { id: '37', image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=600&fit=crop', is_primary: true },
      { id: '38', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '39', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '14',
    name: 'Kursi Malas',
    description: 'Kursi malas nyaman untuk bersantai di kamar tidur.',
    price: 1800000,
    category_id: '3',
    dimensions: { width: 80, depth: 80, height: 75 },
    materials: ['Kayu Jati', 'Busa Densitas Tinggi', 'Kain Premium'],
    product_images: [
      { id: '40', image_url: 'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop', is_primary: true },
      { id: '41', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '42', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '15',
    name: 'Kasur Spring Bed',
    description: 'Kasur spring bed dengan kualitas premium untuk tidur nyenyak.',
    price: 5500000,
    category_id: '3',
    dimensions: { length: 200, width: 160, height: 30 },
    materials: ['Pegas Spiral', 'Busa Memory Foam', 'Kain Katun'],
    product_images: [
      { id: '43', image_url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop', is_primary: true },
      { id: '44', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '45', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '16',
    name: 'Meja Kerja Ergonomis',
    description: 'Meja kerja dengan desain ergonomis, mendukung postur tubuh sehat saat bekerja.',
    price: 1850000,
    category_id: '4',
    dimensions: { length: 120, width: 60, height: 75 },
    materials: ['Kayu Jati', 'Logam'],
    product_images: [
      { id: '46', image_url: 'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop', is_primary: true },
      { id: '47', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '48', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '17',
    name: 'Kursi Kantor Executive',
    description: 'Kursi kantor executive dengan bahan kulit sintetis dan sandaran tangan.',
    price: 1200000,
    category_id: '4',
    dimensions: { width: 65, depth: 65, height: 110 },
    materials: ['Kulit Sintetis', 'Busa Densitas Tinggi', 'Roda PVC', 'Besi'],
    product_images: [
      { id: '49', image_url: 'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop', is_primary: true },
      { id: '50', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '51', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '18',
    name: 'Lemari Arsip',
    description: 'Lemari arsip dengan kunci pengaman untuk menyimpan dokumen penting.',
    price: 2400000,
    category_id: '4',
    dimensions: { length: 80, width: 40, height: 140 },
    materials: ['Kayu Jati', 'Besi', 'Kunci Pengaman'],
    product_images: [
      { id: '52', image_url: 'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop', is_primary: true },
      { id: '53', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '54', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '19',
    name: 'Meja Rapat',
    description: 'Meja rapat besar dengan desain profesional, cocok untuk ruang konferensi.',
    price: 5000000,
    category_id: '4',
    dimensions: { length: 200, width: 100, height: 75 },
    materials: ['Kayu Mahoni', 'Kaki Logam'],
    product_images: [
      { id: '55', image_url: 'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop', is_primary: true },
      { id: '56', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '57', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '20',
    name: 'Rak Server',
    description: 'Rak server dengan ventilasi baik dan ruang kabel yang terorganisir.',
    price: 3200000,
    category_id: '4',
    dimensions: { length: 60, width: 60, height: 180 },
    materials: ['Besi', 'Kipas Ventilasi'],
    product_images: [
      { id: '58', image_url: 'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop', is_primary: true },
      { id: '59', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '60', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '21',
    name: 'Set Meja Kursi Taman',
    description: 'Set meja dan kursi taman dengan bahan tahan cuaca untuk penggunaan outdoor.',
    price: 2800000,
    category_id: '5',
    dimensions: { meja: { length: 100, width: 60, height: 75 }, kursi: { width: 50, depth: 50, height: 80 } },
    materials: ['Kayu Akasia', 'Pelindung Cuaca'],
    product_images: [
      { id: '61', image_url: 'https://images.unsplash.com/photo-1513519245627-4a45d9fa1a7a?w=800&h=600&fit=crop', is_primary: true },
      { id: '62', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '63', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '22',
    name: 'Gazebo Kecil',
    description: 'Gazebo kecil untuk area taman atau halaman belakang.',
    price: 8500000,
    category_id: '5',
    dimensions: { length: 200, width: 200, height: 250 },
    materials: ['Kayu Jati', 'Atap Genteng'],
    product_images: [
      { id: '64', image_url: 'https://images.unsplash.com/photo-1513519245627-4a45d9fa1a7a?w=800&h=600&fit=crop', is_primary: true },
      { id: '65', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '66', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '23',
    name: 'Kursi Ayunan Taman',
    description: 'Kursi ayunan untuk bersantai di taman dengan bahan tahan cuaca.',
    price: 1600000,
    category_id: '5',
    dimensions: { width: 60, depth: 60, height: 100 },
    materials: ['Kayu Akasia', 'Tali', 'Bantalan'],
    product_images: [
      { id: '67', image_url: 'https://images.unsplash.com/photo-1513519245627-4a45d9fa1a7a?w=800&h=600&fit=crop', is_primary: true },
      { id: '68', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '69', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '24',
    name: 'Payung Taman',
    description: 'Payung taman besar dengan bahan anti air dan UV.',
    price: 1200000,
    category_id: '5',
    dimensions: { diameter: 240, height: 220 },
    materials: ['Kain Parasit', 'Besi', 'Tusuk Kayu'],
    product_images: [
      { id: '70', image_url: 'https://images.unsplash.com/photo-1513519245627-4a45d9fa1a7a?w=800&h=600&fit=crop', is_primary: true },
      { id: '71', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '72', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '25',
    name: 'Kursi Malas Outdoor',
    description: 'Kursi malas outdoor dengan bahan tahan air dan sinar UV.',
    price: 900000,
    category_id: '5',
    dimensions: { width: 60, depth: 60, height: 80 },
    materials: ['Rattan Sintetis', 'Kerangka Logam'],
    product_images: [
      { id: '73', image_url: 'https://images.unsplash.com/photo-1513519245627-4a45d9fa1a7a?w=800&h=600&fit=crop', is_primary: true },
      { id: '74', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '75', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '26',
    name: 'Kursi Tamu Elegan',
    description: 'Kursi tamu dengan desain elegan, dilengkapi meja samping.',
    price: 3200000,
    category_id: '1',
    dimensions: { width: 70, depth: 70, height: 80 },
    materials: ['Kayu Mahoni', 'Busa Densitas Tinggi', 'Kulit Asli'],
    product_images: [
      { id: '76', image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop', is_primary: true },
      { id: '77', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '78', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '27',
    name: 'Meja Sudut Minimalis',
    description: 'Meja sudut minimalis untuk ruang tamu kecil atau sudut ruangan.',
    price: 1200000,
    category_id: '1',
    dimensions: { panjang: 80, lebar: 80, tinggi: 45 },
    materials: ['Kayu Pinus', 'Kaca'],
    product_images: [
      { id: '79', image_url: 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=800&h=600&fit=crop', is_primary: true },
      { id: '80', image_url: 'https://images.unsplash.com/photo-1573865563450-7d3b07f031a2?w=800&h=600&fit=crop', is_primary: false },
      { id: '81', image_url: 'https://images.unsplash.com/photo-1596727147700-6a299aef4e6f?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '28',
    name: 'Kursi Santai Rotan',
    description: 'Kursi santai dari bahan rotan alami, memberikan nuansa natural.',
    price: 1400000,
    category_id: '1',
    dimensions: { width: 60, depth: 60, height: 80 },
    materials: ['Rotan Alami', 'Busa Densitas Rendah'],
    product_images: [
      { id: '82', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: true },
      { id: '83', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false },
      { id: '84', image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '29',
    name: 'Set Kursi Meja Makan 8 Kursi',
    description: 'Set meja makan lengkap dengan 8 kursi untuk keluarga besar.',
    price: 8500000,
    category_id: '2',
    dimensions: { meja: { length: 220, width: 100, height: 75 }, kursi: { width: 45, depth: 50, height: 85 } },
    materials: ['Kayu Jati', 'Kursi Kain Premium'],
    product_images: [
      { id: '85', image_url: 'https://images.unsplash.com/photo-1556228453-efd5cdc40efe?w=800&h=600&fit=crop', is_primary: true },
      { id: '86', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '87', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '30',
    name: 'Lemari Pajangan',
    description: 'Lemari pajangan dengan pintu kaca untuk menampilkan koleksi barang berharga.',
    price: 3600000,
    category_id: '2',
    dimensions: { length: 160, width: 40, height: 180 },
    materials: ['Kayu Jati', 'Kaca'],
    product_images: [
      { id: '88', image_url: 'https://images.unsplash.com/photo-1597206389588-8c0b7a0b7c5a?w=800&h=600&fit=crop', is_primary: true },
      { id: '89', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '90', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '31',
    name: 'Kasur Single Bed',
    description: 'Kasur single bed dengan finishing halus untuk kamar tidur anak atau tamu.',
    price: 2800000,
    category_id: '3',
    dimensions: { length: 200, width: 100, height: 25 },
    materials: ['Pegas Per', 'Busa Densitas Tinggi', 'Kain Katun'],
    product_images: [
      { id: '91', image_url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop', is_primary: true },
      { id: '92', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '93', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '32',
    name: 'Lemari Baju Anak',
    description: 'Lemari baju anak dengan desain lucu dan aman untuk anak.',
    price: 1800000,
    category_id: '3',
    dimensions: { length: 100, width: 50, height: 160 },
    materials: ['Kayu Pinus', 'Cat Non-Toxic'],
    product_images: [
      { id: '94', image_url: 'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop', is_primary: true },
      { id: '95', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '96', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  },
  {
    id: '33',
    name: 'Meja Belajar Anak',
    description: 'Meja belajar ergonomis untuk anak usia sekolah.',
    price: 850000,
    category_id: '3',
    dimensions: { length: 80, width: 50, height: 75 },
    materials: ['Kayu Pinus', 'Cat Non-Toxic'],
    product_images: [
      { id: '97', image_url: 'https://images.unsplash.com/photo-1505842381624-c6b1a1f43507?w=800&h=600&fit=crop', is_primary: true },
      { id: '98', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', is_primary: false },
      { id: '99', image_url: 'https://images.unsplash.com/photo-1524758631624-e68477d9a286?w=800&h=600&fit=crop', is_primary: false }
    ]
  }
];

// Fungsi untuk mendapatkan semua produk dummy
export const getAllDummyProducts = () => {
  return dummyProducts;
};

// Fungsi untuk mendapatkan produk dummy berdasarkan ID
export const getDummyProductById = (id) => {
  return dummyProducts.find(product => product.id === id);
};

// Fungsi untuk mendapatkan produk dummy berdasarkan kategori
export const getDummyProductsByCategory = (categoryId) => {
  return dummyProducts.filter(product => product.category_id === categoryId);
};

// Fungsi untuk mendapatkan kategori dummy
export const getDummyCategories = () => {
  return dummyCategories;
};