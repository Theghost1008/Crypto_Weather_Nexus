import Link from "next/link";
import Sidebar from "../components/Sidebar.jsx";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-10">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to <span className="text-blue-600">CryptoWeather Nexus</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          All-in-one dashboard for weather updates, cryptocurrency tracking, and the latest news.
        </p>
        <Link href="/dashboard">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            Go to Dashboard
          </button>
        </Link>

        {/* Features */}
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

const FeatureCard = ({ title, description, icon }) => (
  <div className="p-6 bg-white rounded-lg shadow-md text-center">
    <div className="text-4xl">{icon}</div>
    <h3 className="mt-4 text-xl font-semibold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);
