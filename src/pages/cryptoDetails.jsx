import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchCryptoDetail, 
  fetchCryptoHistorical,
  clearDetails 
} from '@/store/cryptoSlice';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import Sidebar from '@/components/Sidebar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const timeIntervals = [
  { label: '1 Day', value: 'h1' },
  { label: '1 Week', value: 'd1' },
  { label: '1 Month', value: 'm1' }
];

const popularCryptos = [
  { id: 'bitcoin', name: 'Bitcoin' },
  { id: 'ethereum', name: 'Ethereum' },
  { id: 'cardano', name: 'Cardano' },
  { id: 'solana', name: 'Solana' }
];

export default function CryptoDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { details, history, loading, error } = useSelector((state) => state.crypto);
  const [interval, setInterval] = useState('d1');
  const [searchInput, setSearchInput] = useState('');
  const [activeCryptoId, setActiveCryptoId] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (router.query.id) {
      const cryptoId = popularCryptos.some(c => c.id === router.query.id) 
        ? router.query.id 
        : '';
      setActiveCryptoId(cryptoId);
      setSearchInput(cryptoId);
    }
    return () => setMounted(false);
  }, [router.query.id]);

  useEffect(() => {
    if (mounted && activeCryptoId) {
      dispatch(fetchCryptoDetail(activeCryptoId));
      dispatch(fetchCryptoHistorical({ id: activeCryptoId, interval }));
    }
  }, [activeCryptoId, interval, dispatch, mounted]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedInput = searchInput.trim().toLowerCase();
    
    if (trimmedInput && trimmedInput !== activeCryptoId) {
      setActiveCryptoId(trimmedInput);
      router.push(`/cryptoDetails?id=${trimmedInput}`, undefined, { shallow: true });
    }
  };

  const handlePopularCryptoClick = (cryptoId) => {
    if (cryptoId !== activeCryptoId) {
      setSearchInput(cryptoId);
      setActiveCryptoId(cryptoId);
      router.push(`/cryptoDetails?id=${cryptoId}`, undefined, { shallow: true });
    }
  };

  const chartData = {
    labels: history?.map((item) => new Date(item.time)) || [],
    datasets: [
      {
        label: 'Price (USD)',
        data: history?.map((item) => parseFloat(item.priceUsd)) || [],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.1,
        fill: true
      }
    ]
  };

  if (!mounted) return null;

  return (
    <div className='flex'>
      <Sidebar/>
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Cryptocurrency Search</h1>
          
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
                placeholder="Enter crypto ID (e.g. bitcoin)"
                className="flex-1 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-4 py-2"
                required
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                disabled={!searchInput.trim()}
              >
                Search
              </button>
            </div>
          </form>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2 dark:text-gray-200">Popular Cryptocurrencies:</h3>
            <div className="flex flex-wrap gap-2">
              {popularCryptos.map((crypto) => (
                <button
                  key={crypto.id}
                  onClick={() => handlePopularCryptoClick(crypto.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeCryptoId === crypto.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {crypto.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading && <div className="text-center py-8">Loading...</div>}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
            {error.includes('404') 
              ? 'Cryptocurrency not found. Please try a valid ID.' 
              : error}
          </div>
        )}

        {details && !error && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold dark:text-white">
                  {details.name} ({details.symbol})
                </h1>
                <span className="ml-4 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm dark:text-gray-200">
                  Rank #{details.rank}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-semibold dark:text-white">
                    ${parseFloat(details.priceUsd).toFixed(2)}
                  </p>
                  <p className={`text-lg ${
                    parseFloat(details.changePercent24Hr) >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {parseFloat(details.changePercent24Hr).toFixed(2)}%
                  </p>
                </div>
                
                <select
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-3 py-1"
                >
                  {timeIntervals.map((int) => (
                    <option key={int.value} value={int.value}>
                      {int.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="h-96 mb-6">
              <Line 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      type: 'time',
                      time: {
                        unit: interval === 'h1' ? 'hour' : 'day'
                      }
                    },
                    y: {
                      ticks: {
                        callback: (value) => `$${value}`
                      }
                    }
                  },
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (context) => `$${context.parsed.y.toFixed(2)}`
                      }
                    }
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-gray-500 dark:text-gray-300 mb-2">Market Cap</h3>
                <p className="text-xl font-semibold dark:text-white">
                  ${parseFloat(details.marketCapUsd).toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-gray-500 dark:text-gray-300 mb-2">Volume (24h)</h3>
                <p className="text-xl font-semibold dark:text-white">
                  ${parseFloat(details.volumeUsd24Hr).toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-gray-500 dark:text-gray-300 mb-2">Supply</h3>
                <p className="text-xl font-semibold dark:text-white">
                  {parseFloat(details.supply).toLocaleString()} {details.symbol}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}