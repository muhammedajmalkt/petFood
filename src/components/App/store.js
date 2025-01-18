import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice"
import productReducer from "../Features/productSlice.js"
import cartReducer from "../Features/cartSlice.js"
import orderReducer from "../Features/orderSlice.js"
import adminReducer from "../Features/adminSlice.js"
import wishlistReducer from "../Features/wishlistSlice.js"
const store=configureStore({
    reducer:{
        auth:authReducer,
        products:productReducer,
        cart:cartReducer,
        order:orderReducer,
        admin:adminReducer,
        wishlist:wishlistReducer,


    }
})
export default store