import { BASE_API_URL } from "../../config/api";
import axios from "axios";
axios.defaults.withCredentials = true;



export const createProduct = (data) => {
  return axios.post(`${BASE_API_URL}/products`, data);
};
export const updateProduct = (id,data) => {
  return axios.put(`${BASE_API_URL}/products/${id}`, data);
};
export const getProducts = () => {
  return axios.get(`${BASE_API_URL}/products`);
};
export const deleteProducts = (id) => {
  return axios.delete(`${BASE_API_URL}/products/${id}`);
};