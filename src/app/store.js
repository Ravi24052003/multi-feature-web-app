import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import todoFormReducer from '../features/todoForm/todoFormSlice';
import weatherReducer from '../features/fetchWeather/fetchWeatherSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        todoForm: todoFormReducer,
        weather: weatherReducer
    }
})