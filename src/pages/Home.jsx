// File: src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    setProducts(res.data);
    setFiltered(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get('https://fakestoreapi.com/products/categories');
    setCategories(res.data);
  };

  const filterByCategory = async (cat) => {
    if (cat === 'all') {
      setFiltered(products);
    } else {
      const res = await axios.get(`https://fakestoreapi.com/products/category/${cat}`);
      setFiltered(res.data);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFiltered(
      products.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => filterByCategory('all')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => filterByCategory(cat)}
              className="bg-gray-200 hover:bg-purple-100 px-4 py-2 rounded-lg text-sm capitalize"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto object-contain mb-4"
            />
            <h4 className="text-lg font-semibold truncate mb-2">{product.title}</h4>
            <p className="text-purple-600 font-bold mb-3">${product.price}</p>
            <Link
              to={`/product/${product.id}`}
              className="inline-block bg-purple-600 text-white text-center px-4 py-2 rounded-lg w-full hover:bg-purple-700 transition"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}