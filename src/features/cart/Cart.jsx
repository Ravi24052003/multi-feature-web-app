import React, { useEffect, useState } from 'react'
import _ from "lodash";
import { useDispatch, useSelector } from 'react-redux'
import { deleteAsync, updateAsync, removeItemFromCart} from './cartSlice';

const Cart = () => {
const dispatch = useDispatch();
const reduxItems = useSelector(state => state.cart.items);

const [items, setItems] = useState([]);

useEffect(()=>{
  setItems(_.uniqBy(reduxItems, 'id'));
}, [reduxItems])


const handleChange = (e, id)=>{
      dispatch(updateAsync({id, change: {quantity: +e.target.value}}))
}

  return (
    <div>
    <div className=' flex flex-col items-center mt-2 md:flex md:flex-row md:justify-start md:flex-wrap md:mx-5 md:items-start'>

      { items && items?.map((item)=>
       <div key={item.id} className=' md:mb-5 mt-3 md:mx-5'>
        <img src={item.thumbnail} alt="" width={200}/>
        <div>
          <p className=' font-bold text-center mb-[6px]'>Model: {item.title}</p>
          <p className=' font-bold text-center mb-[6px]'>Brand: {item.brand}</p>
          <p className=' font-bold text-center mb-[6px]'>price: {item.price}$</p>
        </div>
        <div className=' flex flex-col items-center mb-[6px]'>
          <p className='font-bold mb-[6px]'>Quantity</p>
          <select className=' font-bold mb-[6px]' value={item.quantity} onChange={(e)=>handleChange(e, item.id)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div className=' flex justify-center mb-[20px]'>
          <button className=' bg-red-500 rounded px-4 py-2 text-white font-bold' onClick={()=>{
            dispatch(removeItemFromCart(item.id));
            dispatch(deleteAsync(item));
            }}>Remove</button>
        </div>
       </div>
      )}
    
    </div>
    <h1 className=' font-bold mb-5 text-center'>Total: {items.reduce((acc, item)=> (acc + Number(item.price)*Number(item.quantity)), 0) }$</h1>
    </div>
  )
}

export default Cart
