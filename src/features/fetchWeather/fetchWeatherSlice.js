import { createSlice } from '@reduxjs/toolkit'
import fetchWeatherAPI from './fetchWeatherAPI';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  weatherData: {},
  weatherArr: [],
  delhiWeather: {},
  status: 'idle'
}

export const fetchAsync = createAsyncThunk(
    'weather/fetchWeather',
    async (inputCity) => {
        const response = await fetchWeatherAPI(inputCity);
        const result = await response.json();
        const windSpeedKmH = result.wind_speed*(18/5);

      const finalSpeed = Number(windSpeedKmH.toFixed(2));

      return {...result, cityName: inputCity, finalSpeed};
    }
)


export const fetchAsyncArr = createAsyncThunk(
  'weather/fetchWeatherArr',
  async (inputCity) => {
      const response = await fetchWeatherAPI(inputCity);
      const result = await response.json();
      const windSpeedKmH = result.wind_speed*(18/5);

      const finalSpeed = Number(windSpeedKmH.toFixed(2));

      return {...result, cityName: inputCity, finalSpeed};
  }
)

export const fetchAsyncDelhi = createAsyncThunk(
  'weather/fetchDelhiWeather',
  async (inputCity) => {
      const response = await fetchWeatherAPI(inputCity);
      const result = await response.json();
      const windSpeedKmH = result.wind_speed*(18/5);

      const finalSpeed = Number(windSpeedKmH.toFixed(2));

      return {...result, cityName: inputCity, finalSpeed};
  }
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {

  },

  extraReducers: (builder)=>{
    builder
    .addCase(fetchAsync.pending, (state) => {
        state.status = "idle";

})
.addCase(fetchAsync.fulfilled, (state, action)=>{
        state.status = "idle";
        state.weatherData = action.payload;
})
.addCase(fetchAsync.rejected, (state, action)=>{
    state.status = "error";
})
.addCase(fetchAsyncArr.pending, (state)=>{
  state.status = "loading";
})
.addCase(fetchAsyncArr.fulfilled, (state, action)=>{
  state.status = "idle";
  
  for(let  i = 0; i< 5; i++ ){
    if(state.weatherArr[i]?.cityName === action.payload.cityName){
      state.weatherArr.splice(i, 1)
    }
  }

  if(state.weatherArr.length < 5){
    state.weatherArr.push(action.payload)
  }

})

.addCase(fetchAsyncArr.rejected, (state, action)=>{
  state.status  = "error";
})
.addCase(fetchAsyncDelhi.pending, (state)=>{
state.status = "loading";
})
.addCase(fetchAsyncDelhi.fulfilled, (state, action)=>{
state.status = "idle";
state.delhiWeather = action.payload;
})
.addCase(fetchAsyncDelhi.rejected, (state, action)=>{
  state.status = "error";
})
  }
})


const weatherReducer = weatherSlice.reducer

export default weatherReducer