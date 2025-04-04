import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  const menuItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Weather", path: "/weather", icon: "🌦️" },
    { name: "Cryptocurrency", path: "/crypto", icon: "💰" },
    { name: "News", path: "/news", icon: "📰" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800">CryptoWeather</h2>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={`flex items-center px-4 py-3 rounded-lg cursor-pointer 
                ${router.pathname === item.path ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
