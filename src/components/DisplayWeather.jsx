import React from 'react'
import { useSelector } from 'react-redux'

const DisplayWeather = () => {
    const weatherData = useSelector(state=>state.weather.weatherData)

    const weatherArr = useSelector(state=>state.weather.weatherArr)

    const delhiWeather = useSelector(state=> state.weather.delhiWeather)

  return (
    <div>
      <h1 className=' font-bold text-center my-5 md:text-2xl' >Weather For {weatherData?.cityName || "Delhi" }</h1>

      <div className=' flex flex-col items-center md:flex-row md:justify-around md:items-start'>

       <div className=' border border-blue-500 rounded mb-4 w-[95vw] h-[25vh] md:w-[25vw] md:h-auto'>
       <div className=' h-[25%] bg-blue-500'>
        <h1 className='text-white font-bold text-center'>Temperatures</h1>
       </div>
       <div className=' w-[98%]'>
        <h1 className=' font-bold text-center mb-3'>Temperature is {weatherData?.temp || delhiWeather?.temp}&deg; Celsius </h1>
        <p className=' text-center mb-3'>Maximum Temperature is {weatherData?.max_temp || delhiWeather?.max_temp}&deg; Celsius</p>
        <p className=' text-center'>Minimum Temperature is {weatherData?.min_temp || delhiWeather?.min_temp}&deg; Celsius</p>
       </div>
       </div>


       <div className=' border border-blue-500 rounded mb-4 w-[95vw] h-[23vh] md:w-[25vw] md:h-auto'>
       <div className=' h-[25%] bg-blue-500'>
        <h1 className='text-white font-bold text-center'>Humidity Information</h1>
       </div>
       <div className=' w-[98%]'>
        <h1 className=' font-bold text-center mb-3'>Humidity is {weatherData?.humidity || delhiWeather?.humidity}% </h1>
        <p className=' text-center mb-3'>Cloud PCT is {weatherData?.cloud_pct || delhiWeather?.cloud_pct}</p>
        <p className=' text-center'>Feels Like {weatherData?.feels_like || delhiWeather?.feels_like}&deg; Celsius</p>
       </div>
       </div>


       <div className=' border border-blue-500 rounded mb-4 w-[95vw] h-[20vh] md:w-[25vw] md:h-auto'>
       <div className=' h-[25%] bg-blue-500'>
        <h1 className='text-white font-bold text-center'>Wind Information</h1>
       </div>
       <div className=' w-[98%]'>
        <h1 className=' font-bold text-center mb-3'>Wind Speed is {weatherData?.finalSpeed || delhiWeather?.finalSpeed} Km/h </h1>
        <p className=' text-center'>Wind Degree is {weatherData?.wind_degrees || delhiWeather?.wind_degrees}&deg;</p>
       </div>
       </div>

      

      </div>
    </div>
  )
}

export default DisplayWeather
