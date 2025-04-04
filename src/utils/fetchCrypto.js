import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_COIN_CAP_BASE_URL;
const api_key = process.env.NEXT_PUBLIC_COIN_CAP_API_KEY;

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(`${API_URL}/assets?apiKey=${api_key}`);
    console.log(response.data.data[0]);
    return response.data.data.slice(0, 6);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};
