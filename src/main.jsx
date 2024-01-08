import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import  {store} from './app/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Products from './features/products/Products.jsx'
import Cart from './features/cart/Cart.jsx'
import TodoListPage from './pages/TodoListPage.jsx'
import WeatherAppPage from './pages/WeatherAppPage.jsx'
import ErrorPage from './ErrorPage.jsx'
import AIBuddy from './pages/AIBuddy.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element= {<App />} errorElement={<ErrorPage />}>
    <Route path='' element = {<TodoListPage />} />
    <Route path='weather' element={<WeatherAppPage />} />
    <Route path='products' element = {<Products />} />
    <Route path='cart' element = {<Cart />} />
    <Route path='aiBuddy' element={<AIBuddy />} />
    <Route />
    </Route>
  )
)




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
