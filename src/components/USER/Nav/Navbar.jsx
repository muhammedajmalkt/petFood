import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mycontext } from "../../context/context";
import { FaUserCheck } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineFavorite } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { PiShoppingCartSimple } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../Features/cartSlice";
import { handleLogedUser, handleSignup } from "../../Features/authSlice";
import { handleProducts, setSearchValue } from "../../Features/productSlice.js";






const Navbar = () => {


  const[showprofile,setShowprofile]=useState(false)

  const dispatch=useDispatch()
  const {user,accessToken,loading} = useSelector((state)=>state.auth)
  const {cartItem}=useSelector((state)=>state.cart)
  const { searchValue}=useSelector((state)=>state.products)
  const navigate=useNavigate()

  useEffect(() => { 
    if(user){
      dispatch(fetchCart(user?._id))
    } 
  }, [user?._id])

  useEffect(() => {
    if (accessToken !=="") {
      
      dispatch(handleLogedUser());
    }
  }, [dispatch]);

   const handleSearchChange=(e)=>{
    navigate("/products")
    dispatch(setSearchValue(e.target.value))
   }
  
  const handleLogout=()=>{
    localStorage.clear()
    navigate("/")
    setShowprofile(false)
    window.location.reload()
  }
  

  return (
    <>
      <div className="font-bold bg-[#F1C782] shadow-sm fixed top-0 w-full z-10 pr-3">
        <div className="flex justify-between pr-2 items-center pt-2">
          <Link to="/">
            <img src="/petlogo.png"
              className="w-28 h-16 object-cover"
              alt="Logo"
            />
          </Link>
          <input
           className="w-[800px] border border-black px-4 py-2 rounded-md"
            type="text"
            placeholder="Search Products..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          

          <div className="flex items-center gap-5">
          <Link to="/cart">
              <div className="flex gap-1 ">
                <span className="text-2xl ">
                  <PiShoppingCartSimple />{" "}
                </span>
                <span className=" absolute ml-6 top-4  text-sm">
                  {cartItem.length !== 0 && cartItem.length}
                </span>
              </div>
            </Link>

            { user && user?.role === "user" ? (
              <div
                onClick={() => setShowprofile(!showprofile)}
                className="flex flex-col items-center border-1 border-gray-800  p-1"
              >
                <FaUserCheck />
                <p className="text-sm">{user?.name}</p>
              </div>
            ) : (
              <>
                <Link to="/signup">
                  <button className="border border-black rounded-full px-4 py-2 hover:drop-shadow-x focus:bg-slate-50">
                    Sign up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="border border-black rounded-full px-4 py-2 focus:bg-slate-50">
                    Login
                  </button>
                </Link>
              </>
            )}
            
          </div>
        </div>

        {/* {shouldbutton && <div className="flex justify-center gap-10 pb-1 ">
           {categories.map((val, index) => (
          <button key={index} onClick={() => handleCategoryChange(val)} className="focus:bg-slate-100 px-2 rounded-md" >
            {val}
          </button>
          ))}
          </div>
      } */}
      </div>
      {showprofile  && (
        <div className="absolute flex flex-col justify-center items-end text-center  right-6 top-20 shadow-lg ">
            <Link to ="/wishlist">
            <button className=" flex gap-3 px-8  py-2 items-center  w-40 bg-[#F1C782]  text-white font-semibold prounded-lg shadow-lg hover:bg-[#dda854] transition duration-200">
            <MdOutlineFavorite/>Wishlist</button>
            </Link>

            <Link to="/order">
            <div className=" flex  gap-3 px-8 py-2 items-center w-40 bg-[#F1C782] text-white font-semibold   shadow-lg hover:bg-[#dda854] transition duration-200">
           < BsCartCheck/>Orders </div>
            </Link>

          <button onClick={handleLogout} className=" flex gap-3 px-8 py-2 w-40  items-center bg-red-500 text-white font-semibold    shadow-lg hover:bg-red-600 transition duration-200">
            <IoIosLogOut /> Logout </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
