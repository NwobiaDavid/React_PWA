import { useState } from 'react';
import './App.css';
import { getWeather } from './api/WeatherData';
import bg_img from './assets/background.webp';
import Loader from './assets/loading (2).gif';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    if (e.key === 'Enter') {
      if (query.trim() !== '') {
        setLoading(true);
        const data = await getWeather(query);
        setWeather(data);
        setQuery('');
        setLoading(false);
      }
    }
  };

  return (
    <>
     
        <div className='h-screen w-screen flex justify-center items-center' style={{backgroundImage: `url(${bg_img})`, backgroundSize: 'cover' }}>
          <div className='flex flex-col items-center mb-[20%] justify-center'>
          <p className='font-semibold md:text-lg text-md text-center  lowercase'>check the weather of your hometown</p>
            <div className='bg-white shadow-md mt-2 shadow-black rounded-lg flex flex-col justify-center items-center h-[6rem] w-[17rem] lg:w-[30rem]'>
           
              <input
                type="text"
                className="px-3 google-mono py-2 outline-none border-2 focus:w-[15rem] lg:focus:w-[25rem] duration-300 scroll-smooth focus:shadow-md text-lg md:text-md rounded-full input-field"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={search}
              />
            </div>

            
            {loading ? (
            <div className='backdrop-blur-sm h-[100px] w-[100px] '>
              <img src={Loader}  alt='Loading...' />
            </div>
          ) : weather.main ? (
            <div className='bg-white mt-3 shadow-md shadow-black rounded-lg py-5 w-full flex justify-center items-center'>
              <div className='flex flex-col justify-center items-center'>
                <h2 className='google-mono'>
                  <span>{weather.name}</span>{' '}
                  <sup className='bg-black text-white p-[2px] px-[10px] rounded-full'>
                    {weather.sys.country}
                  </sup>
                </h2>

                <div className=''>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    className=''
                    alt={weather.weather[0].description}
                  />
                </div>
                <div className='text-4xl flex justify-center items-center'>
                  {Math.round(weather.main.temp)}
                  <sup className='text-sm'>&deg;C</sup>
                </div>
                <p className='google-mono mt-2 bg-black text-white p-[3px] px-2 rounded-full'>
                  {weather.weather[0].description}
                </p>
              </div>
            </div>
          ) : null}
            </div>
         
        </div>
      
    
    </>
  );
}

export default App;
