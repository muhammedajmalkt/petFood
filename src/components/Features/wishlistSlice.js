import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToWishlist =createAsyncThunk(
    "wishlist/add",
    async ({userId,productId},{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("accessToken")
            const res = await axios.post (`${process.env.REACT_APP_API_URL}/users/wishlist/${userId}`,
                        {productId},{headers:{"Authorization":token}})                        
                        return res.data  
        } catch (error) {
            // console.log(error.response);
            return rejectWithValue(error.response.data.message)
        }
    }
)
export const getWishlist =createAsyncThunk(
    "wishlist/get",
    async (userId,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("accessToken")
            // console.log(token);
            const res = await axios.get (`${process.env.REACT_APP_API_URL}/users/wishlist/${userId}`,
                {headers:{"Authorization":token}})
                 console.log(res.data);
                        
               return res.data  
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response.data.message)
        }
    }
)
export const removeWishlist =createAsyncThunk(
    "wishlist/remove",
    async ({userId,productId},{rejectWithValue})=>{
        try {
            
            const token = localStorage.getItem("accessToken")
            const res = await axios.patch (`${process.env.REACT_APP_API_URL}/users/wishlist/${userId}`,
                {productId},{headers:{"Authorization":token}})
                 console.log(res.data);
                        
               return res.data  
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response.data.message)
        }
    }
)

const wishlistSlice=createSlice({
    name:"wishlist",
    initialState:{
        wishlist:[],
        error:null,
        loading:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addToWishlist.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(addToWishlist.fulfilled,(state,action)=>{
            state.loading = false
            state.wishlist = action.payload.data
        })
        .addCase(addToWishlist.rejected,(state,action)=>{
            state.loading = false
            console.log(action.payload);
            
            state.error = action.payload
        })
        //get
        .addCase(getWishlist.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(getWishlist.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload.data);
            
            state.wishlist = action.payload.data.products
        })
        .addCase(getWishlist.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })

        //remove
        .addCase(removeWishlist.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(removeWishlist.fulfilled,(state,action)=>{
            state.loading = false
            // state.wishlist = action.payload.data
        })
        .addCase(removeWishlist.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
    
    
})

export  default wishlistSlice.reducer