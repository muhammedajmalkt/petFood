import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../Features/orderSlice";

const Order = () => {
  const { user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchOrder(user?._id))    
  },[])

  const {orderItem,orderDtls }=useSelector((state)=> state.order)
console.log(orderItem,"orderItem=====");


  return (
    <div className="container mx-auto mt-16 p-6 min-h-[100vh]">
    <h1 className="text-2xl font-bold mt-10 bg-"> ORDERS</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="bg-white shadow-lg  p-6  border-gray-200"
        >
          <h2 className="text-lg font-bold mb-4">Order ID: {orderDtls?._id}</h2>
          <h3 className="text-md text-gray-700 mb-2">
            Order Date: {new Date(orderDtls?.createdAt).toLocaleDateString()}
          </h3>
          <h3 className="text-md text-gray-700 mb-4">
            Total Amount: <span className="font-bold">${orderDtls?.totalAmount}.00</span>
          </h3>
          <div className="border-t pt-4">
            <h4 className="font-bold mb-2">Shipping Address:</h4>
            <p className="text-sm text-gray-700">
              {orderDtls?.address?.houseName}, {orderDtls?.address?.city}, {orderDtls?.address?.state},{" "}
              {orderDtls?.address?.pin}, {orderDtls?.address?.contact}
            </p>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-bold mb-2">Products:</h4>
            <ul>
              {orderItem?.map((item) => (
                <li
                  key={item?.productId._id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center">
                    <img
                      src={item?.productId.image}
                      alt={item?.productId.name}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <p className="font-bold">{item.productId.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ${item.productId.price * item.quantity}.00
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      
    </div>
  </div>
  

  );
};

export default Order;
