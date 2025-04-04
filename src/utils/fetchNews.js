import axios from "axios";


const API_KEY = process.env.NEXT_PUBLIC_NEWS_DATA_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_NEWS_DATA_API_URL;

export const fetchNewsData = async () => {
  try {
    const response = await axios.get(`${API_URL}?apikey=${API_KEY}&q=crypto&language=en`);
    return response.data.results.slice(0, 3);
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};
