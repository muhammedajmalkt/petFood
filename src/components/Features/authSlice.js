import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

 export const handleSignup=createAsyncThunk(
    "auth/signup",
    async (data,{rejectWithValue})=>{
        try {
            const res= await axios.post("http://localhost:8000/api/users/signup", data)
            // console.log(res.data);
            return res.data
            
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
 )
  export const handleLogin=createAsyncThunk(
    "auth/login",
    async (data,{rejectWithValue})=>{
        try {
            const res=await axios.post("http://localhost:8000/api/users/login",data)
            // console.log("yyyy",res.data);

            return res.data
            
        } catch (error) {
            console.log(error.response.data.message);
             return rejectWithValue(error.response.data.message)
        }      
    }
  )

  export const handleLogedUser=createAsyncThunk(
    "auth/logeduser",
    async (_,{rejectWithValue} )=>{
        try {
            const token =localStorage.getItem("accessToken")
            const res = await axios.get("http://localhost:8000/api/users/userin",
                {headers:{"Authorization":token}})
                
                console.log(res.data);
            return res.data
        } catch (error) {
            console.log(error.response)
            
            return rejectWithValue(error.response.data.message)
        }
    }
  )

const authSlice=createSlice({
    name:"auth",
    initialState:{
        accessToken:localStorage.getItem("accesToken") || null,
        signError:null,
        logError:null,
        loading:false,
        user:null,
        isAdminLogin:localStorage.getItem("isAdminLogin") || null,
    },
    reducers:{
        clearError:(state)=>{
            state.signError = null
            state.logError = null
        }
    },
    extraReducers:(builder)=>{
        builder
        //signup
        .addCase(handleSignup.pending,(state,action)=>{
         state.loading = true
        })
        .addCase(handleSignup.fulfilled,(state,action)=>{
            state.loading = false
            state.user= action.payload.data
        })
        .addCase(handleSignup.rejected,(state,action)=>{
            state.loading = false
            state.signError= action.payload
        })

        //login
        .addCase(handleLogin.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(handleLogin.fulfilled,(state,action)=>{            
            state.loading = false
            if(action.payload.data.role ==="admin"){
                state.isAdminLogin = true
             localStorage.setItem("isAdminLogin",true)
            }else if(action.payload.data.role ==="user"){
                state.user = action.payload.data
            }
            
            state.accessToken = action.payload.accessToken            
            localStorage.setItem("accessToken",action.payload.accessToken)

        })
        .addCase(handleLogin.rejected,(state,action)=>{
            state.loading = false
            state.logError = action.payload
        })

        //loged user
        .addCase(handleLogedUser.pending,(state,action)=>{
            state.loading = true
           })
           .addCase(handleLogedUser.fulfilled,(state,action)=>{
               state.loading = false
               state.user= action.payload.data
           })
           .addCase(handleLogedUser.rejected,(state,action)=>{
               state.loading = false
           })
    }
})
export const {clearError}=authSlice.actions
export default authSlice.reducer

