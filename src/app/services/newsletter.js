import { BASE_API_URL } from "../../config/api";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getAllNewsletter = () => {
  return axios.get(`${BASE_API_URL}/newsletter`);
};

export const deleteNewsletter = (id) => {
  return axios.delete(`${BASE_API_URL}/newsletter/${id}`);
};
