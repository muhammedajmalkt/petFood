import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const handleProducts= createAsyncThunk(
    "products/fetchproduct",
    async ({page,limit,category,name},{rejectWithValue})=>{
        const params= {page,limit,category,name}
        try {
            const res = await axios.get("http://localhost:8000/api/products",{params:params})
            // console.log(res.data)
             return res.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)    
        }
    }
)
//admin
//deleteproduct
export const deleteProduct= createAsyncThunk(
    "products/delete",
    async (productId,{rejectWithValue})=>{
        try{
            const token = localStorage.getItem("accessToken")
            const res = await  axios.patch(`http://localhost:8000/api/products/${productId}`,
                {},{headers:{"Authorization": token}} )
                console.log(res.data);
                return res.data
            }
            catch(error){
                // console.log( error.response);
                return rejectWithValue(error.response. data.message)
            }
    }
)

//edit
export const editProduct = createAsyncThunk (
    "products/edit",
   async ({productId,product},{rejectWithValue})=>{
    try {        
        const token = localStorage.getItem("accessToken")
        const res = await axios.put(`http://localhost:8000/api/products/${productId}`, 
            product,{headers:{"Authorization":token}}
        )
        console.log(res.data,"edit");
        return res.data
    } catch (error) {
        console.log(error.response);
        return rejectWithValue(error.response.data.message)  
    }
   }
)

//createNewproduct
export const hanldeNewProduct = createAsyncThunk(
  "products/newproduct",
  async (product, { rejectWithValue }) => {
    // console.log("slice",product);
    
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post( "http://localhost:8000/api/products",
        product, { headers: { "Authorization": token ,'Content-Type':"multipart/form-data" } })

        console.log(res.data,"newPro");
       return res.data
    } catch (error) {
        console.log(error.response);
        return rejectWithValue(error.response.data.message)
    }
  }
);
const productSlice=createSlice({
    name:"product",
    initialState:{
        error:null,
        products:[],
        searchValue:"",
        totalProducts:null,
        singleProduct:null,
        loading:false,
        


    },
    reducers:{
        setSearchValue:(state,action)=>{
            state.searchValue = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
     //products
        .addCase(handleProducts.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(handleProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.products = action.payload.data            
            state.totalProducts = action.payload.pagination.total

        })
        .addCase(handleProducts.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })

     //delete
        .addCase(deleteProduct.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.loading = false
            console.log(action.payload)
            // state.products = action.payload.data
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.loading = false
            state.error  = action.payload
        })
    //edit
        .addCase(editProduct.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(editProduct.fulfilled,(state,action)=>{
            state.loading = false
            // state.products = action.payload.data
        })
        .addCase(editProduct.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })

        //createNew
        .addCase(hanldeNewProduct.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(hanldeNewProduct.fulfilled,(state,action)=>{
            state.loading = false
            // state.products = action.payload.data
        })
        .addCase(hanldeNewProduct.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })

    }
})
export  const { setSearchValue} = productSlice.actions
export default productSlice.reducer