import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/weatherSlice";
import { fetchCrypto } from "../store/cryptoSlice.js";
import Sidebar from "../components/Sidebar";
import WeatherCard from "../components/WeatherCard";
import CryptoCard from "../components/CryptoCard";
import NewsCard from "../components/NewsCard";
import { fetchNews } from "@/store/newsSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { data:weather, loading: weatherLoading, error: weatherError } = useSelector((state) => state.weather);
  const { data:crypto, loading: cryptoLoading, error: cryptoError } = useSelector((state) => state.crypto);
  const { data: news, loading:newsLoading, error:newsError} = useSelector((state)=>state.news)

  useEffect(() => {
    dispatch(fetchWeather("Mumbai"));
    dispatch(fetchCrypto());
    dispatch(fetchNews())
  }, [dispatch]);


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>

        {(weatherLoading || cryptoLoading || newsLoading) && <p className="text-gray-600">Loading data...</p>}
        {(weatherError || cryptoError || newsError) && <p className="text-red-500">Error loading data.</p>}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Weather</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weather ? (
              <WeatherCard data={weather} />
            ) : (
              <p className="text-gray-500">No weather data available</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Cryptocurrency</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {crypto.map((data, index) => (
              <CryptoCard key={index} data={data} />
            ))}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Crypto News</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsLoading?(
              <p>Loadin news...</p>
            ):(newsError?(
              <p className="text-red-500">Error loading news fakk</p>
            ):(
              news?.map((item, index)=>(
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
