export default function CryptoCard({ data }) {
  const name = data?.name || 'Unknown';
  const symbol = data?.symbol || '';
  const price = data?.priceUsd ? `$${parseFloat(data.priceUsd).toFixed(2)}` : 'N/A';
  const change = data?.changePercent24Hr || '0%';
  const marketCap = data?.marketCapUsd ? `$${formatMarketCap(data.marketCapUsd)}` : 'N/A';

  function formatMarketCap(cap) {
    return parseFloat(cap).toLocaleString('en-US', {
      maximumFractionDigits: 0
    });
  }
  const isNegative = typeof change === 'string' && change.includes('-');

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">
        {name} {symbol && `(${symbol.toUpperCase()})`}
      </h3>
      <p className="text-2xl text-blue-500 font-bold">{price}</p>
      <p className={`text-sm ${isNegative ? "text-red-600" : "text-green-600"}`}>
        {change} (24h)
      </p>
      <p className="text-gray-500">Market Cap: {marketCap}</p>
    </div>
  );
}