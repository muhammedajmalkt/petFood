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

  useEffect(()=>{
    dispatch(fetchOrder(selectedUser?._id))
  },[dispatch])
  const {orderItem,orderDtls}=useSelector((state)=>state.order)
  // const order= orderItem.map((item)=>item.products).flat()
  console.log(orderItem,"item");
  
  // console.log( order.map((item)=>item),"orderItem");

 


  
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
            alt={item.productId.name} 
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
      <h1 className="text-2xl "> Cart not found.</h1>
    </div>
  )}
</div>



      
<div>
  <h1 className="text-xl font-bold mb-2">ORDER</h1>
  {orderItem?.length > 0 ? (
    <div className="grid grid-cols-1 gap-6">
      {orderItem.map((item) => (
        <div
          key={item._id}
          className="p-6 bg-white shadow-lg rounded-lg flex flex-col gap-6"
        >
          {/* Order Details */}
          <div className="bg-orange-50 p-4 rounded-lg w-full">
            <h1 className="font-semibold text-lg">Order ID: {item._id}</h1>
            <p className="text-gray-600">
              <span className="font-medium">Date:</span> {item.createdAt.slice(0, 10)}
            </p>
            <p className="text-green-600 font-medium">
              <span className="font-bold">Total:</span> ${item.totalAmount}
            </p>
          </div>

          {/* Ordered Products (In rows) */}
          <div className="w-full">
            {item.products.map((order) => (
              <div
                key={order.productId._id}
                className="p-4 bg-gray-100 rounded-lg  flex gap-6 shadow mb-4"
              >
                <img
                  src={order.productId.image}
                  alt={order.productId.name}
                  className="w-24 h-24 object-cover rounded mb-2"
                />
                <div className='flex flex-col'>
                <h1 className="text-sm font-semibold">{order.productId.name}</h1>
                <p className="text-gray-700 text-sm">Qty: {order.quantity}</p>
                <p className="text-green-600 font-medium">${order.productId.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center mt-16">
      <h1 className="text-2xl">Order not found.</h1>
    </div>
  )}
</div>

    </div>
  );
};

export default View;
