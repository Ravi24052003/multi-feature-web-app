import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import loginCart from "./cartAPI";
import conf from "../../conf/conf";


const initialState = {
    items: [],
    status: 'idle',
    productsInCart: []
}

export const fetchAsync = createAsyncThunk(
    'cart/fetchItem',
    async () => {
       const token = await loginCart(conf.realmLoginCartEmail, conf.realmLoginCartPass);
        var config = {
            method: 'post',
            url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-gztgq/endpoint/data/v1/action/find',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            data: JSON.stringify({
                "collection": "carts",
                "database": "shop",
                "dataSource": "Cluster0"
            })
        };

        const response = await axios(config);

        return response.data.documents;
    }
)

export const addAsync = createAsyncThunk(
    'cart/addItem',
    async ({product, quantity = 1}) => {
        const {title, id, brand, price, thumbnail} = product;


        const token = await loginCart('cart@cart.com', 'cart@12345');

        var config = {
            method: 'post',
            url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-gztgq/endpoint/data/v1/action/insertOne',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            data: JSON.stringify({
                "collection": "carts",
                "database": "shop",
                "dataSource": "Cluster0",
                "document": {
                    "brand":brand,
                    "id":id,
                    "price":price,
                    "quantity": quantity,
                    "thumbnail":thumbnail,
                    "title":title 
                }
            })
        };

         await axios(config);


    var config2 = {
        method: 'post',
        url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-gztgq/endpoint/data/v1/action/findOne',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify({
            "collection": "carts",
            "database": "shop",
            "dataSource": "Cluster0",
            "filter": {
                "id": id
            }
        })
    };


    const response2 = await axios(config2);


        return response2.data.document;
    }
)

export const deleteAsync = createAsyncThunk(
    'cart/deleteItem',
    async (item) => {

        const {id, title} = item;

        const token = await loginCart('cart@cart.com', 'cart@12345');

        var config = {
            method: 'post',
            url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-gztgq/endpoint/data/v1/action/deleteOne',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            data: JSON.stringify({
                "collection": "carts",
                "database": "shop",
                "dataSource": "Cluster0",
                "filter": {
                    "id": id,
                    "title": title
                }
            })
        };

 await axios(config);

        return id;
    }
)

export const updateAsync = createAsyncThunk(
    'cart/updateItem',
    async ({id, change}) => {


         const token = await loginCart('cart@cart.com', 'cart@12345');

         var config = {
             method: 'post',
             url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-gztgq/endpoint/data/v1/action/updateOne',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
             },
             data: JSON.stringify({
                 "collection": "carts",
                 "database": "shop",
                 "dataSource": "Cluster0",
                 "filter": {
                     "id": id
                 },
                 "update": {
                    "$set": change
                 }
             })
         };

         await axios(config)

         
         var config2 = {
            method: 'post',
            url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-gztgq/endpoint/data/v1/action/findOne',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            data: JSON.stringify({
                "collection": "carts",
                "database": "shop",
                "dataSource": "Cluster0",
                "filter": {
                    "id": id
                }
            })
        };
    
    
        const response2 = await axios(config2);


        return response2.data.document;
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
       productsInCartAction: (state, action)=>{
        if(state.productsInCart.includes(action.payload)){
            state.productsInCart = state.productsInCart
        }
        else{
            state.productsInCart.push(action.payload)
        }
       },

       removeItemFromCart: (state, action)=>{
        const itemIndx = state.productsInCart.indexOf(action.payload);
        state.productsInCart.splice(itemIndx, 1);
       }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsync.pending, (state) => {
                state.status = 'loading';
        })
        .addCase(fetchAsync.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.items = action.payload;
            
                   action.payload.map((elem)=>{
                    if(state.productsInCart.includes(elem.id)){
                       state.productsInCart = state.productsInCart
                    }
                    else{
                       state.productsInCart.push(elem.id)
                    }
                } )

              
                
        })
        .addCase(addAsync.fulfilled, (state, action)=>{
            state.status = 'idle';

            state.items.push(action.payload);
            
    })
    .addCase(deleteAsync.fulfilled, (state, action)=>{
        state.status = 'idle';
        state.items = state.items.filter(item=> item.id !== action.payload);
})
.addCase(updateAsync.fulfilled, (state, action)=>{
    state.status = 'idle';
    const index = state.items.findIndex(item=> item.id === action.payload.id)
    state.items.splice(index, 1, action.payload)
})
    }
})

export const {productsInCartAction, removeItemFromCart} = cartSlice.actions
const cartReducer = cartSlice.reducer

export default cartReducer