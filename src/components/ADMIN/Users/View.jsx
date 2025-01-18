import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiArrowUturnLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../Features/cartSlice';
import { fetchOrder } from '../../Features/orderSlice';
import { handleAllUser } from '../../Features/adminSlice';


const View = ({ setShowView, selectedUser }) => {
  // console.log(selectedUser);
  // console.log(selectedUser);
  
 const dispatch =useDispatch()

  useEffect(()=>{
   dispatch(fetchCart(selectedUser._id))
  },[])
  const {cartItem} =useSelector((state)=> state.cart)
  console.log( cartItem);

  useEffect(()=>{
    dispatch(fetchOrder(selectedUser?._id))
  },[dispatch])
  const {orderItem,orderDtls}=useSelector((state)=>state.order)
  console.log( orderItem,"orderItem");

 


  
  return (
    <div className="p-6 bg-gray-100 mt-10">
      <button onClick={() => setShowView(false)}
        className="absolute right-12 top-12 flex flex-row items-center gap-2 bg-red-700 text-white p-1 rounded-md">
        <HiArrowUturnLeft /> Close </button>
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-2">PROFILE</h1>
        <h2 className="text-md font-semibold">User Id:
          <span className="text-gray-500 font-medium">{selectedUser._id}</span>
         </h2>

        <h2 className="text-md font-semibold"> Name: <span className="text-gray-500 font-medium">{selectedUser.name} </span> </h2>
          
        <h2 className="text-md font-semibold">Email:  <span className="text-gray-500 font-medium"> {selectedUser.email} </span></h2>
        <h2 className="text-md font-semibold">Status:  <span className="text-gray-500 font-medium"> {selectedUser.isBlocked === true ? "Blocked" :  "Active"     } </span></h2>

        <h2 className="text-md font-semibold">  Date:  <span className="text-gray-500 font-medium">  {selectedUser?.createdAt?.slice(0, 10)}</span></h2>
      </div>

      <div>
  <h1 className="text-xl font-bold mb-4 mt-10">CART</h1>

  {cartItem.length > 0 ? (
    cartItem.map((item) => (
      
      <div key={item.productId._id}
        className="mb-4 p-4 bg-white shadow rounded-lg flex flex-row gap-10" >
      
        <div>
          <img
            src={item.productId.image}
            alt={item.productId.name} // Added alt attribute
            className="w-24 h-24 object-cover mb-2"/>
        </div>
        <div>
          <h1 className="font-extrabold">
            Product ID: {item.productId._id}
          </h1>
          <h1 className="text-gray-600 font-medium">
            Quantity: {item.quantity}
          </h1>
          <h1 className="text-gray-600 font-medium">
            Price: ${item.productId.price}
          </h1>
        </div>
      </div>
    ))
  ) : (
    <div className="container mx-auto mt-16 text-center">
      <h1 className="text-2xl ">No cart found.</h1>
    </div>
  )}
</div>



      
  <div>
  <h1 className="text-xl font-bold mb-4 mt-10">ORDER</h1>
  {orderItem.length > 0 ? (
    <div>
      {/* Order Details */}
      <div className="mb-4 p-4 bg-orange-50 shadow rounded-lg flex flex-row gap-10">
        <div>
          <h1 className="font-medium">Order ID: {orderDtls?._id}</h1>
          <h1 className="text-gray-600 font-medium">
            <span className="font-bold">Date:</span> {orderDtls?.createdAt.slice(0, 10)}
          </h1>
          <h1 className="text-gray-600 font-medium">
            <span className="text-green-600 font-bold">Total:</span> ${orderDtls?.totalAmount}
          </h1>
        </div>
      </div>

      {orderItem.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orderItem.map((order) => (
            <div
              key={order._id}
              className="mb-4 p-4 bg-white shadow rounded-lg flex flex-col items-center"
            >
              <img
                src={order.productId.image}
                alt={order.productId.name} 
                className="w-24 h-24 object-cover rounded mb-4"
              />
              <div>
              <h1 className=" text-sm">Name: {order.productId.name}</h1>

                <h1 className=" text-sm">Qty: {order.quantity}</h1>
                <h1 className="text-gray-700">Price: ${order.productId.price}</h1>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-8">
          <h1 className="text-2xl font-bold text-gray-600">No items in this order.</h1>
        </div>
      )}
    </div>
  ) : (
    <div className="text-center mt-16">
      <h1 className="text-2xl">Order  not found.</h1>
    </div>
  )}
</div>


    </div>
  );
};

export default View;
