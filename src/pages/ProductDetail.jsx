// File: src/pages/ProductDetail.jsx
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="text-center mt-20 text-gray-500">Loading product details...</p>;

  return (
    <div className="p-6 min-h-screen bg-white flex flex-col lg:flex-row gap-10 items-center justify-center">
      <motion.div
        className="max-w-sm w-full bg-white rounded-xl shadow-xl p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-60 mx-auto object-contain mb-4"
        />
      </motion.div>

      <motion.div
        className="max-w-xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold text-purple-700 mb-4">{product.title}</h2>
        <p className="text-gray-700 text-lg mb-6">{product.description}</p>
        <h3 className="text-2xl font-semibold text-green-600 mb-6">${product.price}</h3>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(product)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition"
        >
          Add to Cart 🛒
        </motion.button>
      </motion.div>
    </div>
  );
}
