// src/services/api.js
import { API_BASE_URL } from '../config'; // Adjust path based on the location of your config.js

// Example with Fetch
export const fetchDataWithFetch = async () => {
  const response = await fetch(`${API_BASE_URL}/api/endpoint/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

// Example with Axios
import axios from 'axios';

export const fetchDataWithAxios = () => {
  return axios.get(`${API_BASE_URL}/api/endpoint/`)
    .then(response => response.data)
    .catch(error => console.error(error));
};
