import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../store/newsSlice.js";
import NewsCard from "../components/NewsCard.jsx";

const NewsPage = () => {
  const dispatch = useDispatch();
  const { data:news = [], loading, error } = useSelector((state) => ({
    news: Array.isArray(state.news?.news) ? state.news.news : [],
    loading: state.news?.loading || false,
    error: state.news?.error || null
  }));

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Latest Crypto News</h1>
        <p>Loading news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Latest Crypto News</h1>
        <p className="text-red-500">Error fetching news: {error}</p>
        <button 
          onClick={() => dispatch(fetchNews())}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const safeNews = Array.isArray(news) ? news : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Latest Crypto News</h1>
      {safeNews.length === 0 ? (
        <p>No news articles available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {safeNews.map((article) => (
            <NewsCard 
              key={article.url || article.id || Math.random().toString(36).substring(2, 9)} 
              {...article} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;