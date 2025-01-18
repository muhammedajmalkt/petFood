import React, { useContext, useEffect } from "react";
import { Mycontext } from "../../context/context";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, quantityDecrease, quantityIncrease, removeProduct } from "../../Features/cartSlice";
import { ToastContainer, toast } from "react-toastify";


const Cart = () => {
  const dispatch =useDispatch()
const {cartItem,totalAmount,loading}=useSelector((state)=>state.cart)
const {user}=useSelector((state)=>state.auth)

useEffect(() => {  
  dispatch(fetchCart(user?._id))
}, [])

const removeFromCart =(productId)=>{
  
  dispatch(removeProduct({userId:user._id,productId})).unwrap()
  .then(() => {
    console.log("done");
    
    dispatch(fetchCart(user._id))
    toast.info("Product removed from cart!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  })
  .catch((error) => {
    toast.error("Failed to removed from cart !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    console.error("Error adding to cart:", error);
  });
}
// console.log(cartItem);


// const totalPrice = cartItems.reduce((acc, item) => {
//   return acc + (item.price * item.quantity);
// }, 0);

  // const removeFromCart = (id) => {
  //   const filteredCart = cartItems.filter((item) => item.id !== id);
  //   setCartItems(filteredCart);
  //   axios.patch(`http://localhost:4000/users/${userid}`, { cart: filteredCart });

  // };

  
  //   const updateQuantity=(id,action)=>{
  //   const incrementQuentity=cartItems.map((item)=>{
  //     if(item.id===id){
  //       const quentityChange = action==="increment"?item.quantity +1:item.quantity -1
  //       return {...item,quantity:quentityChange}
  //     }
  //     // console.log(item,"===");
  //      return item 
  //   })
  //   setCartItems(incrementQuentity);
  //   axios.patch(`http://localhost:4000/users/${userid}`, { cart: incrementQuentity });

  // }

  const increase = (productId)=>{    
    dispatch(quantityIncrease({userId:user._id,productId})).unwrap()
   .then(() => {
         dispatch(fetchCart(user._id))
         toast.success( "Quantity increased!", {
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
         console.error("Error increasing to quantity:", error);
       });
  } 
  const decrease = (productId)=>{
    dispatch(quantityDecrease({userId:user._id,productId})).unwrap()
    .then(() => {
      dispatch(fetchCart(user._id))
      toast.success( "Quantity decreased!", {
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
      console.error("Error increasing to quantity:", error);
    });


  }
  
   
  return (
    <div className="container mx-auto mt-32 p-6 min-h-[100vh]">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 ">CART</h1>
      {cartItem && cartItem?.length === 0 ? (
        <div className="text-center text-gray-500 p-6">Your cart is empty.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItem &&
            cartItem?.map((item) => (
              <div
                key={item.productId._id}
                className="flex items-center justify-between bg-white shadow-lg  p-4"
              >
                <img
                  src={item.productId.image}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />

                <div className="flex-grow">
                  <h1 className="text-xl font-bold text-gray-800">
                    {" "}
                    {item.productId.name}
                  </h1>
                  <h4 className="text-gray-600">{item.productId.weight}</h4>
                </div>
                <div className="flex items-center w-[300px]">
                  <button
                    className="bg-gray-200 px-2 py-1 rounded-l hover:bg-gray-300"
                    onClick={() => decrease(item.productId._id)}
                    disabled={item.quantity === 1}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span className="px-4">{item.quantity}</span>

                  <button
                    className="bg-gray-200 px-2 py-1 rounded-r hover:bg-gray-300"
                    onClick={() => increase(item.productId._id)}
                  >
                    {" "}
                    +
                  </button>

                  <h2 className="text-lg font-semibold text-green-600 ml-4">
                    ${item.productId.price * item.quantity}
                  </h2>
                  <button
                    className="text-red-500 ml-4"
                    onClick={() => removeFromCart(item.productId._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 p-6 bg-gray-50 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-green-700 bg-green-100 py-3 px-6 rounded-md">
              Total Price:{" "}
              <span className="text-green-800">${totalAmount}.00</span>
            </h2>
            <Link to="/checkout" className="mt-4 md:mt-0">
              <button className="bg-[#F1C782] text-xl font-semibold text-white px-12 py-4  rounded-md shadow hover:bg-[#eab561] transition-transform transform hover:scale-105">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
