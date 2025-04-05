// components/Sidebar.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Weather", path: "/weatherDetails", icon: "🌦️" },
    { name: "Cryptocurrency", path: "/cryptoDetails", icon: "💰" },
    { name: "News", path: "/newsDetails", icon: "📰" },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>
      <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 fixed md:static w-64 min-h-screen bg-white shadow-md p-6 
        dark:bg-gray-800 z-40 transition-transform duration-300 ease-in-out`}>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          CryptoWeather
        </h2>
        <nav className="mt-6 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path} passHref>
              <div
                className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
                  ${
                    router.pathname === item.path
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900/80 dark:text-blue-100 shadow-inner"
                      : "text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/90 hover:shadow-sm"
                  }
                  hover:scale-[1.02] active:scale-[0.98]`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}