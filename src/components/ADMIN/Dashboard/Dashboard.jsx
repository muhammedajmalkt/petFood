import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Mycontext } from "../../context/context";
import { useDispatch, useSelector } from "react-redux";
import { handleAllUser, handleRevenue } from "../../Features/adminSlice";
import { handleProducts } from "../../Features/productSlice.js";

const Dashboard = () => {
 
const dispatch =useDispatch()
useEffect(()=>{
  dispatch (handleAllUser({page:1,limit:50}))
},[])
const {totalUser}=useSelector((state)=>state.admin)
    // console.log(totalUser ,"users");
    
    useEffect(()=>{
      dispatch(handleProducts({page:1,limit:12,category:""}))
    },[])
    const {totalProducts} =useSelector((state)=>state.products)
    // console.log(totalProduct s ,"totalProducts");
    
    useEffect (()=>{
      dispatch(handleRevenue())
    },[])
    const {income} = useSelector((state)=>state.admin) 

    
  return (
    <div>
      {/* Main Content */}
      <div className="flex-grow p-10 w-[80%] ">
        <h2 className="text-2xl font-bold mb-5">DASHBOARD</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Placeholder for cards or main content */}
          <div className="bg-green-300 shadow-md rounded-lg p-5">
            <h3 className="font-semibold">Total Sales</h3>
            <p className="text-xl">{income}</p>
          </div>
          <div className="bg-yellow-200 shadow-md rounded-lg p-5">
            <h3 className="font-semibold">Total Users</h3>
            <p className="text-xl">{totalUser}</p>
          </div>
          <div className="bg-blue-300 shadow-md rounded-lg p-5">
            <h3 className="font-semibold">Total Products</h3>
            <p className="text-xl">{totalProducts}</p>
          </div>
        </div>
      </div>
    </div>
    
  )
};

export default Dashboard;
