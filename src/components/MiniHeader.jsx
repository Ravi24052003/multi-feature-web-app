import React, { useEffect, useState } from 'react'
import CartLogo from "../assets/cart.svg"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const MiniHeader = () => {
    const reduxItems = useSelector(state=> state.cart.items);

    const [items, setItems] = useState([]);


useEffect(()=>{
  setItems(_.uniqBy(reduxItems, 'id'));
}, [reduxItems])

  return (
    <div>
      <ul className=' flex justify-end mr-4 mb-2'>
        <li className='flex-col items-center justify-center'>
           <p className=' font-bold  text-center'>{items.length}</p>
            <NavLink to= '/cart'
             className={({ isActive }) =>
             `duration-200 ${
               isActive ? "text-orange-700" : "text-gray-700"
             } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
           }
            >
           <img src={CartLogo} alt="cart" />
            </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default MiniHeader
