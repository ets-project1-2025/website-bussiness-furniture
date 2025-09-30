import Link from "next/link";
import Cart from "./Cart/Cart";
import { useContext, useState } from "react";
import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import { CartProduct } from "lib/interfaces";
import { MdShoppingCart, MdMenu, MdClose } from "react-icons/md";

const Header = () => {
  const { cart } = useContext(CartItemsContext);
  const { toggleCartVisibility } = useContext(CartVisibilityContext);
  const cartLength = cart.reduce(
    (count: number, item: CartProduct) =>
      (count += item.quantity ? item.quantity : 1),
    0
  );
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Cart />
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="w-full mx-auto max-w-7xl px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="text-2xl font-bold text-blue-600">
              <Link href="/">
                <a>FurnitureKami</a>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/">
                <a className="text-gray-700 hover:text-blue-600 font-medium">Beranda</a>
              </Link>
              <Link href="/produk">
                <a className="text-gray-700 hover:text-blue-600 font-medium">Produk</a>
              </Link>
              <Link href="/tentang-kami">
                <a className="text-gray-700 hover:text-blue-600 font-medium">Tentang Kami</a>
              </Link>
              <Link href="/kontak">
                <a className="text-gray-700 hover:text-blue-600 font-medium">Kontak</a>
              </Link>
            </nav>
            
            {/* Cart and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button className="relative z-50 border-0 bg-transparent outline-0" onClick={toggleCartVisibility}>
                <MdShoppingCart
                  color="gray"
                  size={28}
                />
                {cartLength > 0 && (
                  <span className="absolute w-5 h-5 text-white text-xs rounded-full flex justify-center items-center -top-1 -right-2 bg-red-500">
                    {cartLength}
                  </span>
                )}
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden z-50 border-0 bg-transparent outline-0 text-gray-700"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link href="/">
                  <a className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Beranda</a>
                </Link>
                <Link href="/produk">
                  <a className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Produk</a>
                </Link>
                <Link href="/tentang-kami">
                  <a className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Tentang Kami</a>
                </Link>
                <Link href="/kontak">
                  <a className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Kontak</a>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
