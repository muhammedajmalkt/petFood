import React from "react";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
import { TbUsersGroup } from "react-icons/tb";
import { BsBagCheck } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const Sidebar = ({setPage,page}) => {
 
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.clear()
    Swal.fire({
      title: "Logout",
      text: "I will close in 3 seconds.",
      timer: 3000
    });
    navigate("/login")
  }
  return (
    <div className="flex fixed">
      {/* Sidebar */}
      <div className="w-64 bg-[#F1C782] text-white min-h-screen p-5">
        <div className="flex items-center mb-10">
          <img
            src="petlogo.png"
            alt="Logo"
            className="w-12 h-12 mr-2 rounded-full"
          />
          <h1 className="text-2xl font-bold ">Admin Panel</h1>
        </div>
        <nav className="flex flex-col space-y-4">
          <div className="flex  flex-col gap-[480px]">
            <div>

              <div className={`flex items-center  ${page === "dashboard" ? 'bg-[#f9f1e4] text-black' : ''}  hover:text-black text-xl  p-2  rounded`}
              onClick={()=>setPage("dashboard")}>
                <RiDashboardHorizontalLine className="mr-2" />
                <h1>Dashboard</h1>
              </div>

              <div className={` flex items-center  ${page ==="product" ? 'bg-[#f9f1e4] text-black' : ''}  hover:text-black text-xl p-2 rounded `}
              onClick={()=>setPage("product")}>
                <GiShoppingBag className="mr-2" />
                <h1>Products</h1>
              </div>

              <div className={`flex items-center ${page ==="users" ?'bg-[#f9f1e4] text-black' : ''} hover:text-black text-xl p-2 rounded` }
              onClick={()=>setPage("users")}>
                <TbUsersGroup className="mr-2" />
                <h1>Users</h1>
              </div>

              <div className={`flex items-center ${page ==="orders" ?'bg-[#f9f1e4] text-black' : ''} hover:text-black text-xl p-2 rounded` }
              onClick={()=>setPage("orders")}>
                <BsBagCheck className="mr-2" />
                <h1>Orders</h1>
              </div>
            </div>
            <div>
             
              <div className="flex items-center hover:bg-red-600 text-xl  p-2 rounded" 
              onClick={handleLogout}>
                <IoLogOutOutline className="mr-2" />
                <h1>Logout</h1>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
