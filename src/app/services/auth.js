import { BASE_API_URL } from "../../config/api";
import axios from "axios";
axios.defaults.withCredentials = true;
console.log(`${BASE_API_URL}/users/login`);


export const loginUser = (data) => {
  return axios.post(`${BASE_API_URL}/users/login`, data);
};
export const logoutUser = () => {
  return axios.post(`${BASE_API_URL}/users/logout`);
};
export const updateUser = (id,data) => {
  return axios.put(`${BASE_API_URL}/users/update/${id}`,data);
};
