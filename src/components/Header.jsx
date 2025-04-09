// File: src/components/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ShoppingCart, LogOut } from 'lucide-react';

export default function Header() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-white shadow-md flex justify-between items-center px-6 py-4"
    >
      <div className="flex items-center gap-6 text-lg font-medium">
        <Link
          to="/home"
          className="hover:text-purple-600 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/cart"
          className="relative hover:text-purple-600 transition duration-300"
        >
          <ShoppingCart className="inline mr-1" />
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-purple-600 text-white text-xs rounded-full px-2">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
      >
        <LogOut size={16} /> Logout
      </motion.button>
    </motion.header>
  );
}
