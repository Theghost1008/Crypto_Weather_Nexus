function WeatherDetailCard({weather}){
    return (<div className="mt-8 p-6 bg-white text-gray-900 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold">{weather.name},{weather.sys.country}</h2>
        <p className="text-lg text-gray-700">{weather.weather[0].main},{weather.weather[0].description}</p>
        <div className="mt-4">
            <p className="text-xl font-semibold">🌡 Temperature: {weather.main.temp}°C</p>
            <p>{weather.main.temp_max}°C/{weather.main.temp_min}°C</p>
            <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🎚 Pressure: {weather.main.pressure} hPa</p>
      </div>
    </div>)
}
export default WeatherDetailCard