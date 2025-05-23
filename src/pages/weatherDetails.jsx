import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchDetailedWeather } from "@/store/weatherSlice";
import WeatherDetailCard from "@/components/WeatherDetailCard";
import Sidebar from "@/components/Sidebar";

export default function weatherPage(){
    const [city,setCity]= useState("");
    const dispatch = useDispatch();
    const {data:some,detailedData:weather,loading:weatherLoading,error:weatherError} = useSelector((state)=>state.weather);
    const handleSearch=()=>{
        if(city.trim()!="")
            dispatch(fetchDetailedWeather(city));
    }

    return (
        <div className="flex">
            <Sidebar/>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to bg-purple-600 text-white p-6 flex-1" >
                <h1 className="text-4xl font-bold mb-6 tracking-wide drop-shadow-md">What's the weather in your city</h1>
                <div className="flex items-center space-x-4 bg-white p-2 rounded-lg shadow-lg">
                    <input
                        type="text"
                        value={city}
                        placeholder="Enter city name"
                        onChange={(e)=>{setCity(e.target.value)}}
                        className="p-3 text-lg text-gray-800 rounded-md w-80 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button onClick={handleSearch} className="px-5 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition transform hover:scale-105">
                    🔍 Search
                    </button>
                </div>
                {weatherLoading && <p className="mt-6">Loading...</p>}
                {weatherError && <p className="mt-6 text-red-400">{error}</p>}
                {weather && weather.main && <WeatherDetailCard weather={weather} />}
            </div>
        </div>
    )
}
