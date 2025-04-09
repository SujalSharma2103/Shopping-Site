// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

export const login = (credentials) =>
  axios.post(`${BASE_URL}/auth/login`, credentials);

export const getAllProducts = () =>
  axios.get(`${BASE_URL}/products`);

export const getProductById = (id) =>
  axios.get(`${BASE_URL}/products/${id}`);

export const getCategories = () =>
  axios.get(`${BASE_URL}/products/categories`);

export const getProductsByCategory = (category) =>
  axios.get(`${BASE_URL}/products/category/${category}`);
