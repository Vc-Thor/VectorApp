import axios from 'axios';

export const axiosUser = axios.create({
  baseURL: 'http://localhost:5000/api/user/',
});
export const axiosAuth = axios.create({
  baseURL: 'http://localhost:5000/api/auth/',
});
export const axiosVector = axios.create({
  baseURL: 'http://localhost:5000/api/vector/',
});
export const axiosVectorValue = axios.create({
  baseURL: 'http://localhost:5000/api/valueVector/',
});
export const axiosAreaVector = axios.create({
  baseURL: 'http://localhost:5000/api/areaVector/',
});
