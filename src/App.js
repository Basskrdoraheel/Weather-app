
import { useState } from 'react';
import './App.css';
import CurrentWeather from './Components/Current-weather/CurrentWeather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './Components/api';
import Search from './Components/search/Search';
import Forecast from './Components/forecast/Forecast';

function App() {

  const [currentWeather, setWeather] = useState(null);
const [forecast, setForecast] = useState(null);

const handleOnSearchChange = async (searchData) => {
  try {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherResponse = await fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const currentWeatherData = await currentWeatherResponse.json();

    const currentForecastResponse = await fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const currentForecastData = await currentForecastResponse.json();

    setWeather({ city: searchData.label, ...currentWeatherData });
    setForecast({ city: searchData.label, ...currentForecastData });
  } catch (error) {
    console.error(error);
  }
};

  console.log(currentWeather)
  console.log(forecast)
  return (
    <div className="container">
     <Search onSearchChange={handleOnSearchChange}/>
     {currentWeather && <CurrentWeather data={currentWeather}/>}
     {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
