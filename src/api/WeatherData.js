
import axios from "axios";


const key = import.meta.env.VITE_APP_KEY;
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${key}`;

export const getWeather = async( query) =>{
    const {data} = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric'
        }
    });

    return data;
}