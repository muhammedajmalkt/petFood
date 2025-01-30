import React, { useContext, useEffect, useState } from "react";
import { Mycontext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { handleProducts } from "../../Features/productSlice.js";
import { addProductToCart } from "../../Features/cartSlice.js";
import { ToastContainer, toast } from "react-toastify";
import { addToWishlist, getWishlist } from "../../Features/wishlistSlice.js";




const Products = () => {
 const [category,setCategory]=useState("all")
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const {products,searchValue} = useSelector((state)=>state.products)
  const {wishlist} = useSelector((state)=>state.wishlist)
  // console.log(products,"products");
  const {user} =useSelector((state)=>state.auth)
  
  useEffect(()=>{
    dispatch(handleProducts({page:1,limit:50,category:category , name :searchValue}))
  },[category ,searchValue])
    
  const handleCategoryChange=(value)=>{
    setCategory(value)
  }
  
  const productClick = (id) => {
    navigate(`/products/${id}`);
  };
  
  const addToCart=(productId)=>{
  if(user){
    dispatch(addProductToCart({userId: user._id,productId,quantity:1}))  
    .then(() => {
      toast.success("Product added to cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    })
    .catch((error) => {
      toast.error("Failed to add product to cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error adding to cart:", error);
    });
} else {
  toast.info("Please log in to add items to your cart.", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
}


console.log(wishlist,"=========");
 useEffect(() => {
    dispatch(getWishlist(user?._id));
  }, [dispatch, user?._id]);

  //for style
const isInWishlist= (productId)=>{
      return wishlist.length > 0 && wishlist.find(item=>item.productId?._id === productId)
}


  const  handleWishlist =(productId)=>{
      if(user){
        dispatch(addToWishlist({userId:user._id,productId})).unwrap()
        .then(() => {
          dispatch(getWishlist(user._id));

          toast.success("Product added to wishlist", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((error) => {
          toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          console.error("Error adding to wishlist:", error);
        });
      }else{
        toast.info("Please log in to add items to your wishlist.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

      }
  }


  return (
    <>
    <ToastContainer />

     <div className="flex justify-center gap-10 mt-16 pt-5 text-2xl bg-[#f8f2e6]   font-bold">

     <button onClick={() => handleCategoryChange("all")} className={`focus:bg-[#F1C782] px-2 rounded-md `} >All</button>
     <button onClick={() => handleCategoryChange("cat")} className="focus:bg-[#F1C782] px-2 rounded-md" >Cat</button>
     <button onClick={() => handleCategoryChange("dog")} className="focus:bg-[#F1C782] px-2 rounded-md" >Dog</button>
     </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[100vh] lg:grid-cols-4 gap-12 px-4 md:px-[77px] py-4  bg-[#fcf3e5] pb-32">



      {products.length > 0 ? (
        products.map((val, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 bg-white shadow-lg  p-4 max-w-sm h-fit" >
            <div onClick={() => productClick(val._id)}>
              <img
              src={val.image}
              alt={val.name}
                className="w-full h-48 object-scale-down rounded-md mb-4"/>

              <h1 className="text-md font-bold text-gray-800 mb-2 h-16">
                {val.name}
              </h1>
              <h4 className="text-gray-600 mb-2">{val.weight}</h4>
              <h1 className="text-lg font-semibold text-green-600">
                ${val.price}/-
              </h1>
            </div>
         
         <div className="flex flex-row items-center justify-center text-center mt-3"> 
            <button onClick={()=>handleWishlist(val?._id)} >
            <span className={`${isInWishlist(val._id) ? "text-red-600":"text-gray-400"}   "flex   items-center text-2xl    hover:text-rose-600 rounded-full h-7 w-7  p-1"` }> 

              <MdFavorite/> </span>
            </button>
            <button
              onClick={() => addToCart(val._id)}
              className=" bg-[#F1C782] text-white px-4 py-2  hover:bg-rose-600 transition w-80 ml-4">
              Add to Cart
            </button>
          </div>
          </div>
        ))
      ) : (
        <p className="text-center w-full">No item found!</p>
      )}
    </div>
    </>
  );
};

export default Products;
