import { BASE_API_URL } from "../../config/api";
import axios from "axios";
axios.defaults.withCredentials = true;



export const createProduct = (data) => {
  return axios.post(`${BASE_API_URL}/products`, data);
};
export const getProducts = () => {
  return axios.get(`${BASE_API_URL}/products`);
};