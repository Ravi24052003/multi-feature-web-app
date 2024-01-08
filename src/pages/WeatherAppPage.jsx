import { useEffect, useState } from 'react'
import FetchWeather from '../features/fetchWeather/FetchWeather'
import DisplayWeather from '../components/DisplayWeather'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncArr, fetchAsyncDelhi } from '../features/fetchWeather/fetchWeatherSlice'
import DiffCitiesWeather from '../components/DiffCitiesWeather'

function App() {
  const dispatch = useDispatch()

  const status = useSelector(state=> state.weather.status);
  const delhiWeather = useSelector(state=> state.weather.delhiWeather);

  const cityNamesArr = ["Mumbai", "Chennai", "Kolkata", "Jaipur", "Chandigarh"]

  useEffect(()=>{
    cityNamesArr.map((elem)=>{
    dispatch(fetchAsyncArr(elem))
    })
  }, [])

  useEffect(()=>{
    dispatch(fetchAsyncDelhi("Delhi"))
  }, [])

  if(status === "loading"){
    return (
      <>
      <h1 className=' text-center font-bold mt-5'>Loading weather information...</h1>
      </>
    )
  }

  if(delhiWeather.message === "Too many requests"){
    return (
      <>
      <h1 className=' text-center font-bold mt-5'>Sorry unable to get weather information</h1>
      </>
    )
  }

  return (
    <>
    <h1 className=' font-bold text-center text-2xl mt-1 md:text-3xl mb-3'>Weather App</h1>
    <FetchWeather />
    <DisplayWeather />

    <DiffCitiesWeather />
    </>
  )
}

export default App
