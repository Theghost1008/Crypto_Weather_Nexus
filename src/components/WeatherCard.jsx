export default function WeatherCard({ data }) {
  const weatherInfo = data?.weather?.[0] || {};
  const mainInfo = data?.main || {};
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {data?.name || 'Unknown Location'}
          </h3>
          <p className="text-gray-600 capitalize">
            {weatherInfo.description || 'No description available'}
          </p>
          <p className="text-gray-500">Humidity: {mainInfo.humidity || 'N/A'}%</p>
        </div>
        
        {weatherInfo.icon && (
          <img 
            src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`} 
            alt={weatherInfo.description} 
            className="w-16 h-16"
          />
        )}
      </div>
      
      <p className="text-2xl font-bold text-blue-600 mt-2">
        {mainInfo.temp ? `${Math.round(mainInfo.temp)}°C` : 'N/A'}
      </p>
    </div>
  );
}