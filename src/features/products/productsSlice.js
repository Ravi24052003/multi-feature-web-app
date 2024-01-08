import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginProducts } from "./productsAPI";
import conf from "../../conf/conf";

const initialState = {
    products: [],
    status: 'idle',
}

export const fetchAsync = createAsyncThunk(
    'products/fetchProduct',
    async () => {
      const token =await loginProducts(conf.realmLoginProductsEmail, conf.realmLoginProductsPass);

        var config = {
            method: 'post',
            url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-gztgq/endpoint/data/v1/action/find',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            data: JSON.stringify({
                "collection": "products",
                "database": "shop",
                "dataSource": "Cluster0",
            })
        };

        const response = await axios(config);
        return response.data.documents;
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsync.pending, (state) => {
                state.status = 'loading';
        })
        .addCase(fetchAsync.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.products = action.payload;
        })
        .addCase(fetchAsync.rejected, (state)=>{
             state.status = 'error';
        })
    }
})

// export const {} = productsSlice.actions
const productsReducer = productsSlice.reducer

export default productsReducer