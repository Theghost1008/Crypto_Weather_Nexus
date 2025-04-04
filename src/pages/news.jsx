import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../store/newsSlice.js";
import NewsCard from "../components/NewsCard.jsx";

const NewsPage = () => {
  const dispatch = useDispatch();
  const { news, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Latest Crypto News</h1>
      {loading && <p>Loading news...</p>}
      {error && <p className="text-red-500">Error fetching news: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((article) => (
          <NewsCard key={article.url} {...article} />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
