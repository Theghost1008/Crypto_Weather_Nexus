import Link from "next/link";
import Sidebar from "../components/Sidebar.jsx";
import FeatureCard from "@/components/FeatureCard.jsx";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
              Welcome to <span className="text-blue-600 dark:text-blue-400">CryptoWeather Nexus</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-100">
              All-in-one dashboard for weather updates, cryptocurrency tracking, and the latest news.
            </p>
          </div>
        </div>
        <Link href="/dashboard">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
            Go to Dashboard
          </button>
        </Link>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Weather Updates"
            description="Check temperature, humidity, and forecasts for cities worldwide."
            icon="🌦️"
          />
          <FeatureCard
            title="Crypto Tracking"
            description="Monitor cryptocurrency prices, market caps, and historical performance in real-time."
            icon="💰"
          />
          <FeatureCard
            title="Latest News"
            description="Stay informed with the latest crypto-related headlines and market news."
            icon="📰"
          />
        </div>
      </main>
    </div>
  );
}


