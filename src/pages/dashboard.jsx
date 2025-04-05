import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/weatherSlice.js";
import { fetchCrypto } from "../store/cryptoSlice.js";
import Sidebar from "../components/Sidebar.jsx";
import WeatherCard from "../components/WeatherCard.jsx";
import CryptoCard from "../components/CryptoCard.jsx";
import NewsCard from "../components/NewsCard.jsx";
import { fetchNews } from "@/store/newsSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  
  const { data: weather, loading: weatherLoading, error: weatherError } = useSelector((state) => state.weather);
  const { data: crypto, loading: cryptoLoading, error: cryptoError } = useSelector((state) => state.crypto);
  const { data: news, loading: newsLoading, error: newsError } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchWeather("Sangli"));
    dispatch(fetchWeather("Pune"));
    dispatch(fetchWeather("Nagpur"));
    dispatch(fetchCrypto());
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-blue-400 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Real-time weather, cryptocurrency, and news updates
          </p>
        </div>

        {(weatherLoading || cryptoLoading || newsLoading) && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
            <p className="text-blue-600 dark:text-blue-300">Loading data...</p>
          </div>
        )}
        
        {(weatherError || cryptoError || newsError) && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-6">
            <p className="text-red-600 dark:text-red-300">
              Error: {weatherError || cryptoError || newsError}
            </p>
          </div>
        )}

        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Weather Updates
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {weatherLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              ))
            ) : weatherError ? (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow col-span-3">
                <p className="text-red-500 dark:text-red-400">Failed to load weather data</p>
              </div>
            ) : weather?.length > 0 ? (
              weather.map((cityWeather, index) => (
                <WeatherCard key={index} data={cityWeather} />
              ))
            ) : (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-gray-500 dark:text-gray-400">No weather data available</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Cryptocurrency Market
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {crypto.length > 0 ? (
              crypto.map((data, index) => (
                <CryptoCard key={index} data={data} />
              ))
            ) : (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow col-span-3">
                <p className="text-gray-500 dark:text-gray-400">No cryptocurrency data available</p>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Latest Crypto News
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              ))
            ) : newsError ? (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow col-span-3">
                <p className="text-red-500 dark:text-red-400">Failed to load news</p>
              </div>
            ) : news?.length > 0 ? (
              news.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  url={item.link}
                  source={item.source_url}
                  author={item.creator}
                  publishedAt={item.pubDate}
                />
              ))
            ) : (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow col-span-3">
                <p className="text-gray-500 dark:text-gray-400">No news articles found</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}