import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_COIN_CAP_BASE_URL;
const api_key = process.env.NEXT_PUBLIC_COIN_CAP_API_KEY;

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(`${API_URL}/assets?apiKey=${api_key}`);
    return response.data.data.slice(0, 3);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};

export const fetchCryptoDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/assets/${id}?apiKey=${api_key}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching crypto details:", error);
    throw error;
  }
};

export const fetchCryptoHistory = async (id, interval = 'd1') => {
  try {
    const response = await axios.get(`${API_URL}/assets/${id}/history?interval=${interval}&apiKey=${api_key}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching crypto history:", error);
    throw error;
  }
};
