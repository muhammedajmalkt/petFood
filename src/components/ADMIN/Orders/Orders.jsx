import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../Features/adminSlice';

const Orders = () => {
  const [order, setOrder] = useState([]);
  const dispatch=useDispatch()
  

  useEffect(() => {
   dispatch(fetchAllOrders())
  }, []);
const {orders,orderDtl}= useSelector((state)=>state .admin)
// console.log( orderDtl,"ordrrrr====");



  return (
    <div className="p-6 bg-gray-100 mt-3">
       <h1 className="text-2xl font-bold mb-6">ORDERS</h1>

      {orderDtl?.map((item,index) => (
        <div key={item._id} className="mb-6 p-4 bg-white shadow rounded-lg">
          <h1 className="text-lg font-bold">ORDER ID: {item._id}</h1>
          <h1 className="text-gray-600">Date: {item.createdAt.slice(0, 10)}</h1>
          <h1 className=" font-semibold text-gray-600 ">Total Amount: ${item.totalAmount}.00</h1>

          <div className="mt-4">
            {item.products?.map((orderItem,index) => (
              <div key={index} className="flex items-center mb-4 p-2 bg-gray-100 rounded shadow">
                <img
                  src={orderItem.productId.image}
                  alt={orderItem.productId.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div className="flex flex-col">
                  <h1 className="font-semibold">{orderItem.productId.name}</h1>
                  <h1 className="">{orderItem.productId.category}</h1>

                  <h1 className="text-gray-700">${orderItem.productId.price}.00</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
