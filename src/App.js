import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL } from './api';
import { WEATHER_API_KEY } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';

function App() {

  //hooks
  const [currentWeather, setCurrentWeather] =  useState(null);
  const [forecast, setForcast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat,lon] = searchData.value.split(" ");
    console.log(lat, lon)

    const currentWeatherFetch = fetch(`${ WEATHER_API_URL }/weather?lat=${lat}&lon=${lon}&appid=${ WEATHER_API_KEY }&units=metric`);
    const forcastFetch = fetch(`${ WEATHER_API_URL }/forecast?lat=${lat}&lon=${lon}&appid=${ WEATHER_API_KEY }&units=metric`);

    Promise.all([currentWeatherFetch, forcastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForcast({ city: searchData.lable, ...forcastResponse });
      }) 
      .catch((err) => console.log(err));
  }

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      < Search onSearchChange={handleOnSearchChange}/>
      { currentWeather && < CurrentWeather data= {currentWeather} />}
      { forecast && <Forecast data={forecast} /> }
    </div>
  );
}

export default App;
