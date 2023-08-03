import axios from "axios";


const key = '5478dc86bc7419c60ba94ee3ce12edc0';
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${key}`

export const getWeather = async( query) =>{
    const {data} = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric'
        }
    });

    return data;
}