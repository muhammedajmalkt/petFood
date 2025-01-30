import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart=createAsyncThunk(
    "cart/fetchcart",
    async (userId,{rejectWithValue})=>{
        try {
            // console.log(userId,"id");
            const token= localStorage.getItem("accessToken")
            const res =await  axios.get(`${process.env.REACT_APP_API_URL}/users/cart/${userId}`, 
            {headers:{ 'Authorization': token }})            
            return res.data  
        } catch (error) {
            console.log(error.response,"======error");
            
            return rejectWithValue(error.response.data.message )   
        }
    }
)

export const addProductToCart= createAsyncThunk(
    "cart/add",
    async ({userId,productId,quantity},{rejectWithValue})=>{
        try {
            const token= localStorage.getItem("accessToken")
            const res=await axios.post (`${process.env.REACT_APP_API_URL}/users/cart/${userId}`,
                { productId,quantity},{headers:{"Authorization":token}})

            console.log( res.data);
            return res.data
        } catch (error) {            
         return  rejectWithValue(error.response.data.message)
        }
    }            
)
export const removeProduct=createAsyncThunk(
    "cart/removeproduct",
    async ({userId,productId},{rejectWithValue})=>{
        try {            
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/users/cart/${userId}`,{data: {productId}})
            console.log(res.data.data);
            return res.data
            
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response.data.message)
        }
    }
)
export const quantityIncrease=createAsyncThunk (
    "cart/increase",
    async ({userId,productId},{rejectWithValue})=>{
        console.log(productId);
        
        try {
            // const token= localStorage.getItem("accessToken")
            const res = await axios.patch(`${process.env.REACT_APP_API_URL}/users/cart/increase/${userId}`,{productId})
            console.log(res.data);
            return res.data    
        } catch (error) {
            console.log(error.response.data);
             return rejectWithValue(error.response.data.message)
        }
    }
)
export const quantityDecrease =createAsyncThunk(
    "cart/decrease",
    async ({userId,productId},{rejectWithValue})=>{
        try {
            const res = await axios.patch(`${process.env.REACT_APP_API_URL}/users/cart/decrease/${userId}`,{productId} )
            return res.data
            
        } catch (error) {
            console.log(error.response.data);
            rejectWithValue(error.response.data.message)  
        }
    }
)

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cartItem:[],
        loading:false,
        error:null,
        totalAmount:0

    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //fetch
        .addCase(fetchCart.pending,(state,action)=>{
          state.loading = true
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.loading = false
            state.cartItem = action.payload.data.cart.items
            state.totalAmount=action.payload.data.totalAmount
        })
        .addCase (fetchCart.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
             
        })

        //addproduct
        .addCase(addProductToCart.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(addProductToCart.fulfilled,(state,action)=>{
            state.loading = false
            state.cartItem = action.payload.data.items
        })
        .addCase(addProductToCart.rejected,(state,action)=>{
            state.loading = action.payload
        })

        //removeproduct
        .addCase(removeProduct.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(removeProduct.fulfilled,(state,action)=>{
            state.loading = false
            state.cartItem = action.payload.data.items
        })
        .addCase(removeProduct.rejected,(state,action)=>{
            state.loading = action.payload
        })

        //increasequantity
        .addCase(quantityIncrease.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(quantityIncrease.fulfilled,(state,action)=>{
            state.loading= false
            // state.cartItem = action.payload.data.items
        })
        .addCase(quantityIncrease.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })

        //decrease
        .addCase(quantityDecrease.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(quantityDecrease.fulfilled,(state,action)=>{
            state.loading = false 
            // state.cartItem = action.payload.data.items
        })
        .addCase(quantityDecrease.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    
    }
})
export default cartSlice.reducer