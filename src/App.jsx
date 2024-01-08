import { useEffect, useState } from "react"
import Cart from "./features/cart/Cart"
import Products from "./features/products/Products"
import { useDispatch } from "react-redux";
import { fetchAsync } from './features/cart/cartSlice';
import { fetchAsync as productFetchAsync } from "./features/products/productsSlice";
import { Outlet } from "react-router-dom";
import MainHeader from "./components/MainHeader";

function App() {
   const dispatch = useDispatch();

  useEffect(()=>{
  dispatch(productFetchAsync())
  }, [])

  useEffect(()=>{
    dispatch(fetchAsync())
  }, [])

  return (
    <>
    <MainHeader />
    <Outlet />
    </>
  )
}

export default App
