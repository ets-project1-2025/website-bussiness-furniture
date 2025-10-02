import Link from "lib/nextjs-shim/link";

const d = new Date();

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6 px-4 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">FurnitureKami</h3>
            <p className="text-gray-300">
              Menyediakan furnitur berkualitas tinggi dengan desain yang indah dan fungsional untuk rumah dan kantor Anda.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/"><a className="text-gray-300 hover:text-white">Beranda</a></Link>
              </li>
              <li>
                <Link href="/produk"><a className="text-gray-300 hover:text-white">Produk</a></Link>
              </li>
              <li>
                <Link href="/tentang-kami"><a className="text-gray-300 hover:text-white">Tentang Kami</a></Link>
              </li>
              <li>
                <Link href="/kontak"><a className="text-gray-300 hover:text-white">Kontak</a></Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Kategori Produk</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Kursi</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Meja</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Lemari</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Sofa</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Rak</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Jl. Furniture Indah No. 123, Jakarta Selatan</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+62 21 1234 5678</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@furniturekami.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {d.getFullYear()} FurnitureKami. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
