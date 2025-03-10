import { BASE_API_URL } from "../../config/api";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getAllContact = () => {
  return axios.get(`${BASE_API_URL}/contact`);
};

export const deleteContact = (id) => {
  return axios.delete(`${BASE_API_URL}/contact/${id}`);
};
