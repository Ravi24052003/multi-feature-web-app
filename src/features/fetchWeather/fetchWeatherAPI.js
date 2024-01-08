import conf from "../../conf/conf";

const url = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?";

const options = {
method: "GET",
headers: {
  "X-RapidAPI-Key": conf.weatherApiKey,
  "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
},
};

const fetchWeatherAPI = (inputCity)=>{
       return fetch(`${url}city=${inputCity}`, options)
}

export default fetchWeatherAPI
