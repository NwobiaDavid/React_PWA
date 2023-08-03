import { useState } from 'react';
import { getWeather } from './api/WeatherData';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await getWeather(query);

      setWeather(data);
      setQuery('');
    }
  };

  return (
    <>
      <input
        type="text"
        className=" "
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={search}
      />

      {weather.main && (
        <div className=" ">
          <h2 className=" ">
            <span>{weather.name}</span> <sup>{weather.sys.country}</sup>
          </h2>
          <div className=' '>
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className=' '>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} className=' ' alt={weather.weather[0].description} />
          <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
