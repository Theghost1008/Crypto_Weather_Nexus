import axios from "axios";


const API_KEY = process.env.NEXT_PUBLIC_NEWS_DATA_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_NEWS_DATA_API_URL;

export const fetchNewsData = async () => {
  try {
    const response = await axios.get(`${API_URL}?apikey=${API_KEY}&q=crypto&language=en`);
    return (response.data.results || []).slice(0, 5);
  } catch (error) {
    console.error("Error fetching news data:", error);
    return [];
  }
};

export const fetchNewsWithSearch = async (query = "crypto", limit = 6) => {
  try {
    const response = await axios.get(`${API_URL}?apikey=${API_KEY}`, {
      params: {
        q: query,
        language: "en",
        size: limit
      }
    });
    const results = response.data.results || []
    return results.map(article => ({
      ...article,
      id: article.article_id || Math.random().toString(36).substring(2, 9),
      date: article.pubDate ? new Date(article.pubDate) : new Date()
    }));
  } catch (error) {
    console.error("Error fetching news data:", error);
    return []
  }
};