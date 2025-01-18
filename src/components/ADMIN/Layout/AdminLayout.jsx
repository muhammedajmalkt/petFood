import React, { useContext, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import Product from "../Product/Product";
import Users from "../Users/Users";
import Orders from "../Orders/Orders";
import { Mycontext } from "../../context/context";

const AdminLayout = () => {
  const [page, setPage] = useState("dashboard");
  return (
    
    <div className="flex justify-between">
        
      <div className="w-[300px]">
        <Sidebar page={page} setPage={setPage} />
      </div>
      <div className="w-[80%] pr-10"> 
        {page === "dashboard" && <Dashboard />}
        {page === "product" && <Product/>}
        {page === "users" && <Users/> }
        {page ==="orders" && <Orders/>}
        
      </div>

    </div>
  
  );
};

export default AdminLayout;
