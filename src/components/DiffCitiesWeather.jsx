import React from 'react'
import { useSelector } from 'react-redux'

const DiffCitiesWeather = () => {
    const weatherArr = useSelector(state=>state.weather.weatherArr)

  return (
    <>
 <h1 className=' text-center mt-4 font-bold text-2xl'>Weather of some cities</h1>

<div className=' md:flex md:justify-around md:flex-wrap'>
{

weatherArr.map((elem)=> 

<div key={elem.cityName} className=' border border-orange-500 rounded mb-4 w-[95vw] mx-auto my-4 md:w-[350px]'>
       <div className='bg-orange-500'>
        <h1 className='text-white font-bold text-center'>{elem?.cityName}</h1>
       </div>

      <div className=' bg-orange-100'>
      <div className=' w-[98%] mx-auto'>
        <h1 className=' font-bold text-center'>Temperature is {elem?.temp }&deg; Celsius </h1>
        <p className=' text-center'>Maximum Temperature is {elem?.max_temp }&deg; Celsius</p>
        <p className=' text-center'>Minimum Temperature is {elem?.min_temp }&deg; Celsius</p>
       </div>
      </div>

      <div className=' bg-blue-100'>
      <div className=' w-[98%] mx-auto'>
        <h1 className=' font-bold text-center'>Humidity is {elem?.humidity} %</h1>
        <p className=' text-center'>Cloud PCT is {elem?.cloud_pct} </p>
        <p className=' text-center'>Feels Like {elem?.feels_like}&deg; Celsius</p>
       </div>
      </div>

      <div className=' bg-gray-100'>
      <div className=' w-[98%] mx-auto'>
        <h1 className=' font-bold text-center'>Wind Speed is {elem?.finalSpeed} Km/h </h1>
        <p className=' text-center'>Wind Degree is {elem?.wind_degrees}&deg;</p>
       </div>
      </div>

       </div>
)

}

</div>

    </>
  )
}

export default DiffCitiesWeather
