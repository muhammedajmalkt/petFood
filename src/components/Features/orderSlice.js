import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const createOrder=createAsyncThunk(
    "order/addorder",
    async({userId,address},{rejectWithValue})=>{
        console.log("address",address);
      try {        
        const token =localStorage.getItem("accessToken")
        const res= await axios.post(`${process.env.REACT_APP_API_URL}/users/order/${userId}`,
           {address},{headers:{"Authorization":token}}
        )
        // console.log(address);
        
        console.log(res.data);
        return res.data
        
      } catch (error) {
        console.log(error.response);
        return rejectWithValue(error.response.data.message)
        
      }
    }
)
export  const fetchOrder=createAsyncThunk(
    "order/fetchorder",
    async (userId,{rejectWithValue})=>{
        try {            
            const token =localStorage.getItem("accessToken")
            const res = await axios.get( `${process.env.REACT_APP_API_URL}/users/order/${userId}`,
                {headers:{"Authorization":token}} )
            // console.log(res.data.data,"hhhhhorders");
            
            return res.data.data
        } catch (error) {
            console.log( error.response ,"odd")
        return  rejectWithValue(error.response.data.message)   
        }
    }
)

const orderSlice=createSlice({
    name:"order",
    initialState:{
        error:null,
        loading:false,
        orderItem :[],
        orderDtls:null,
        allOrder:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //addtoorders
        .addCase(createOrder.pending,(state,action)=>{
            state.loading = true 
        })
        .addCase(createOrder.fulfilled,(state,action)=>{
            state.loading = false
            state.orderItem = action.payload
        })
        .addCase(createOrder.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })

        //fetch
        .addCase(fetchOrder.pending,(state,action)=>{
            state.loading = true 
        })
        .addCase(fetchOrder.fulfilled,(state,action)=>{
            state.loading = false
            state.orderItem = action.payload
            state.orderDtls =action.payload
        })
        .addCase(fetchOrder.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })

    }         
})

export default orderSlice.reducer