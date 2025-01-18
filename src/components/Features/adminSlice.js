import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const handleAllUser=createAsyncThunk(
    "admin/alluser",
    async ({page,limit},{rejectWithValue})=>{
        try {
            const params={page,limit}
            const token = localStorage.getItem("accessToken")
            const res= await axios.get("http://localhost:8000/api/admin/users",
           {headers:{"Authorization":token}}, {params:params})
            
            // console.log(res .data);
            return res.data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error.response.data.message)          
        }
    }
)
//userById
export const handleUserById= createAsyncThunk(
    "admin/userById",
    async (userId,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("accessToken")
            const res= await axios.get(`http://localhost:8000/api/admin/user/${userId}`,
                {headers:{"Authorization":token}} )
                console.log(res.data,"userBy");
                
                return res.data
            
        } catch (error) {
            console.log( error.response);
            return rejectWithValue(error.response.data.message)
            
        }
    }
)
export const handleRevenue= createAsyncThunk(
    'admin/totalrevenue',
    async (_,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("accessToken")
            const res=await axios.get("http://localhost:8000/api/admin/income",
                {headers:{"Authorization":token}})
                // console.log(res.data);
                return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)
//allOrders
export  const fetchAllOrders= createAsyncThunk(
    "admin/allorders",
    async (_,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("accessToken")
            const res = await axios.get("http://localhost:8000/api/admin/orders",
                {headers:{"Authorization":token}} )
                console.log("check console" ,res.data.data);
                return res.data.data
        } catch (error) {
            console.log( error.response);
            return rejectWithValue ( error.response.data.message)  
        }
    }
)

//BlockUser
export const handleBlock= createAsyncThunk(
    "admin/block",
    async (userId,{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("accessToken")
            const res= await axios.patch(`http://localhost:8000/api/admin/user/${userId}`,
            {},{headers:{"Authorization": token}})

            console.log( res.data);
            return res.data
        } catch (error) {
            console.log(error.response);
            rejectWithValue(error.response.data.message)
        }
    }
)



const adminSlice= createSlice({
    name:"admin",
    initialState:{
        error:null,
        loading:false,
        allUser:[],
        totalUser:null,
        income:null,
        orders:[],
        orderDtl:null,
        message:"",
        user:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //allUser
        .addCase(handleAllUser.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(handleAllUser.fulfilled,(state,action)=>{
            state.loading = false
            state.totalUser = action.payload.data.totalUser
            state.allUser  = action.payload.data.users
        })
        .addCase(handleAllUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        //userById
        .addCase(handleUserById.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(handleUserById.fulfilled,(state,action)=>{
            state.loading = false
            state.user  = action.payload.data
        })
        .addCase(handleUserById.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })


        //income
        .addCase(handleRevenue.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(handleRevenue.fulfilled,(state,action)=>{
            state.loading = false
            state.income = action.payload.data 
        })
        .addCase(handleRevenue.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })

        //allOrders
        .addCase(fetchAllOrders.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.loading = false            
            state.orders = action.payload.map((item)=>item.products).flat()
            state .orderDtl = action.payload
        })
        .addCase(fetchAllOrders.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload

        })

        //block
        .addCase(handleBlock.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(handleBlock.fulfilled,(state,action)=>{
            state.loading = false            
            state .message = action.payload.message
            // state.allUser = action.payload.data
        })
        .addCase(handleBlock.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload

        })
    }
})
export default adminSlice.reducer

