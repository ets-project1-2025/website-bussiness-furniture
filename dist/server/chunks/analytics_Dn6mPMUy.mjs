import { g as getAllProducts } from './products_DowiKeHc.mjs';
import { i as getAllOrders } from './admin-api_DFNxy3BB.mjs';

// src/lib/analytics.js
// Fungsi-fungsi untuk analisis dan pelaporan


// Fungsi untuk mendapatkan ringkasan penjualan
const getSalesSummary = async () => {
  try {
    const orders = await getAllOrders();
    
    // Filter pesanan yang sudah dibayar
    const paidOrders = orders.filter(order => 
      order.status === 'confirmed' || 
      order.status === 'shipped' || 
      order.status === 'delivered'
    );
    
    // Hitung total pendapatan
    const totalRevenue = paidOrders.reduce((sum, order) => sum + Number(order.total_amount), 0);
    
    // Hitung jumlah pesanan
    const totalOrders = paidOrders.length;
    
    // Hitung rata-rata nilai pesanan
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Hitung jumlah produk terjual (berdasarkan item pesanan)
    let totalProductsSold = 0;
    paidOrders.forEach(order => {
      if (order.order_items) {
        order.order_items.forEach(item => {
          totalProductsSold += item.quantity;
        });
      }
    });
    
    // Hitung rata-rata rating produk (dalam implementasi nyata, ini akan dari tabel reviews)
    const averageProductRating = 4.2; // Nilai rata-rata rating produk
    
    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      totalProductsSold,
      averageProductRating,
      ordersByStatus: {
        pending: orders.filter(o => o.status === 'pending').length,
        confirmed: orders.filter(o => o.status === 'confirmed').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length
      }
    };
  } catch (error) {
    console.error('Error getting sales summary:', error);
    return {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      totalProductsSold: 0,
      ordersByStatus: {
        pending: 0,
        confirmed: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0
      }
    };
  }
};

// Fungsi untuk mendapatkan produk terlaris
const getTopSellingProducts = async (limit = 5) => {
  try {
    const orders = await getAllOrders();
    
    // Filter pesanan yang sudah dibayar
    const paidOrders = orders.filter(order => 
      order.status === 'confirmed' || 
      order.status === 'shipped' || 
      order.status === 'delivered'
    );
    
    // Hitung jumlah penjualan per produk
    const productSales = {};
    
    paidOrders.forEach(order => {
      if (order.order_items) {
        order.order_items.forEach(item => {
          if (productSales[item.product_id]) {
            productSales[item.product_id] += item.quantity;
          } else {
            productSales[item.product_id] = item.quantity;
          }
        });
      }
    });
    
    // Ambil semua produk
    const allProducts = await getAllProducts();
    
    // Gabungkan data penjualan dengan informasi produk
    const productsWithSales = allProducts.map(product => ({
      ...product,
      salesCount: productSales[product.id] || 0,
      avgRating: parseFloat((Math.random() * 4 + 1).toFixed(1)), // Rating acak antara 1-5
      reviewCount: Math.floor(Math.random() * 50) // Jumlah ulasan acak
    }));
    
    // Urutkan berdasarkan jumlah penjualan dan ambil sebanyak limit
    return productsWithSales
      .sort((a, b) => b.salesCount - a.salesCount)
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting top selling products:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan produk dengan rating tertinggi
const getTopRatedProducts = async (limit = 5) => {
  try {
    const allProducts = await getAllProducts();
    
    // Dalam implementasi nyata, kita akan menghitung rata-rata rating dari tabel reviews
    // Untuk simulasi, kita berikan rating acak dan jumlah ulasan
    const productsWithRatings = allProducts.map(product => ({
      ...product,
      avgRating: parseFloat((Math.random() * 4 + 1).toFixed(1)), // Rating acak antara 1-5
      reviewCount: Math.floor(Math.random() * 50) // Jumlah ulasan acak
    }));
    
    // Urutkan berdasarkan rating dan ambil sebanyak limit
    return productsWithRatings
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting top rated products:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan statistik pengguna
const getUserStats = async () => {
  try {
    // Dalam implementasi nyata, ini akan mengambil data dari tabel profiles atau auth
    // Untuk simulasi, kita kembalikan data dummy
    
    // Kita bisa menghitung jumlah pengguna dari pesanan
    const orders = await getAllOrders();
    const uniqueUserIds = [...new Set(orders.map(order => order.user_id))];
    
    return {
      totalUsers: uniqueUserIds.length, // Jumlah unik pengguna yang pernah memesan
      activeUsers: Math.floor(uniqueUserIds.length * 0.7), // Simulasi pengguna aktif
      newUsersThisMonth: Math.floor(uniqueUserIds.length * 0.1), // Simulasi pengguna baru bulan ini
      returningUsersRate: 65 // Tingkat pengguna kembali dalam persen
    };
  } catch (error) {
    console.error('Error getting user stats:', error);
    return {
      totalUsers: 0,
      activeUsers: 0,
      newUsersThisMonth: 0,
      returningUsersRate: 0
    };
  }
};

// Fungsi untuk mendapatkan data bulanan
const getMonthlyData = async (monthsBack = 6) => {
  try {
    const orders = await getAllOrders();
    
    // Filter pesanan yang sudah dibayar
    const paidOrders = orders.filter(order => 
      order.status === 'confirmed' || 
      order.status === 'shipped' || 
      order.status === 'delivered'
    );
    
    // Dapatkan tanggal hari ini dan tanggal yang dibutuhkan
    const now = new Date();
    const monthsData = [];
    
    for (let i = monthsBack - 1; i >= 0; i--) {
      const targetMonth = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      
      // Filter pesanan dalam bulan tersebut
      const ordersInMonth = paidOrders.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate >= targetMonth && orderDate < nextMonth;
      });
      
      // Hitung total pendapatan dan jumlah pesanan
      const revenueInMonth = ordersInMonth.reduce((sum, order) => sum + Number(order.total_amount), 0);
      const ordersCount = ordersInMonth.length;
      
      monthsData.push({
        month: targetMonth.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }),
        revenue: revenueInMonth,
        orders: ordersCount,
        date: targetMonth
      });
    }
    
    return monthsData;
  } catch (error) {
    console.error('Error getting monthly data:', error);
    return [];
  }
};

export { getUserStats as a, getMonthlyData as b, getTopSellingProducts as c, getTopRatedProducts as d, getSalesSummary as g };
