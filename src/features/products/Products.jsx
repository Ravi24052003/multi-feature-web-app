import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { addAsync, updateAsync, productsInCartAction } from "../cart/cartSlice";
import MiniHeader from "../../components/MiniHeader";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector(state=> state.products.status);
  const productsInCart = useSelector(state => state.cart.productsInCart);
  const reduxItems = useSelector(state => state.cart.items);
  const [quanVal, SetQuanVal] = useState(1);
  const [productInCart, setProductInCart] = useState(false);
  const [keyVal, setKeyVal] = useState(null);
  let count = 1;

  const [items, setItems] = useState([]);

  useEffect(()=>{
     setItems(_.uniqBy(reduxItems, 'id'));
  }, [reduxItems])


  
if(status === "loading"){
  return (
   <>
   <h1 className=' text-center font-bold mt-5'>Loading....</h1>
   </>
  );
}

if(status === 'error'){
  return (
    <>
    <h1 className=" text-center font-bold mt-5">Sorry unable to get data from the server</h1>
    </>
  )
}
  

  return (
    <div>
      <div>
       <MiniHeader />
        {products.map((product) => {
          count = 1;
          return (
          <div key={product.id} className=" mb-[50px] w-[95%] flex flex-col mx-auto items-center">
            <img src={product.thumbnail} alt={product.brand} key={product.id} />
            <h1 className=" mb-[8px] font-bold">{product.brand}</h1>
            <h1 className=" mb-[8px] font-bold">{product.title}</h1>
            <p className=" mb-[8px] font-bold">Price {product.price}$</p>
            <p className=" mb-[8px] font-bold">{product.description}</p>
            <span className=" font-bold">Quantity</span>
            { (items.length === 0)?   (
                        <div>
                        <select className=" font-bold" value={(keyVal === product.id)?  quanVal : 1} onChange={(e)=>{
                          setKeyVal(product.id);
                          return SetQuanVal(+e.target.value);
                          }}>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                        <p>
                          <button
                            className=" font-bold text-white bg-black px-3 py-1"
                            onClick={() =>{
                              setProductInCart(!productInCart);
                              dispatch(productsInCartAction(product.id))
                              dispatch(addAsync({product, quantity: (keyVal === product.id)? quanVal : 1}))
                            }}
                          >
                            Add to Cart
                          </button>
                        </p>
                      </div>
                      )    :
              items.map((item) => {
                if (item.id === product.id) {

                  return (
                    <select className=" font-bold" key={item.id} value={item.quantity} onChange={(e)=> {
                      dispatch(productsInCartAction(item.id))
                     dispatch(updateAsync({id: item.id, change: {quantity: +e.target.value}}))
                    } }>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  );
                }
                   else{
                    if(count<=1 && !productsInCart.includes(product.id)){
                      count++;
                      return (
                        <div key={item.id}>
                        <select className=" font-bold" value={(keyVal === product.id)? quanVal : 1} onChange={(e)=>{
                          setKeyVal(product.id);
                         return SetQuanVal(+e.target.value); 
                         }}>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                        <p>
                          <button
                            className=" font-bold text-white bg-black px-3 py-1"
                            onClick={() =>{
                              setProductInCart(!productInCart);
                              dispatch(productsInCartAction(product.id))
                              dispatch(addAsync({product, quantity: (keyVal === product.id)? quanVal : 1}))
                              }}
                          >
                            Add to Cart
                          </button>
                        </p>
                      </div>
                      ) 
                    }
                    
                   }
                   
              })
            }
           
            
          </div>
        )})}
      </div>
    </div>
  );
};

export default Products;
