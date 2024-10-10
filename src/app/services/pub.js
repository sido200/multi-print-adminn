import { BASE_API_URL } from "../../config/api";
import axios from "axios";
axios.defaults.withCredentials = true;

export const createPub = (data) => {
  return axios.post(`${BASE_API_URL}/pub`, data);
};
export const updatePub = (id, data) => {
  return axios.put(`${BASE_API_URL}/pub/${id}`, data);
};
export const getpub = () => {
  return axios.get(`${BASE_API_URL}/pub`);
};
export const deletePubs = (id) => {
  return axios.delete(`${BASE_API_URL}/pub/${id}`);
};
