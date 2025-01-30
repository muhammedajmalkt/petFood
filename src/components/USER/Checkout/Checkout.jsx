
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { BsBank2 } from "react-icons/bs";
import { createOrder } from "../../Features/orderSlice";
import { fetchCart } from "../../Features/cartSlice";



const Checkout = () => {
  const navigate = useNavigate();
  const { cartItem, totalAmount } = useSelector((state) => state.cart);
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  
  const [paymentOp,setPaymentOp]=useState("cod")
  const [address, setAddress] = useState({
    houseName: "",  
    contact: "",
    state: "",
    city: "",
    pin: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  }

  const handlePayment=(e)=>{
    e.preventDefault()
    console.log(address);
    
    try {
        dispatch(createOrder({userId:user._id,address:address})).unwrap()
            .then(() => {              
              Swal.fire({
                title: "Order created successfully",
                width: 600,
                padding: "3em",
                icon: "success",
                color: "#716add",
                background: "#fff url(/images/trees.png)",
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("/images/nyan-cat.gif")
                  left top
                  no-repeat
                `
              });
              dispatch(fetchCart(user._id))
                 navigate("/")
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error
              });
              console.error("Error increasing to quantity:", error);
            });
        
            setAddress({
              houseName: "",
              contact: "",
              state: "",
              city: "",
              pin: "",
            })
            setPaymentOp("")

    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <div className="container mx-auto mt-16 p-6 min-h-[100vh]">
      <h1 className="text-2xl font-bold mb-6 ">CHECKOUT</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column */}
        <div className="bg-white shadow-lg  p-6">
          <h2 className="text-md font-bold mb-4">DELIVERY ADDRESS</h2>

          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label className="block text-gray-700">House Name</label>
              <input
                type="text"
                name="houseName"
                value={address.houseName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="number"
                name="contact"
                value={address.contact}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Pin Code</label>
                <input
                  type="number"
                  name="pin"
                  value={address.pin}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

          {/* Payment Options */}
          <div className="mt-6">
            <h2 className="text-md font-bold mb-4">PAYMENT OPTIONS</h2>

            <div className="mb-4">
              
              <button  type="button" onClick={()=>setPaymentOp("cod")}className={`${paymentOp === "cod" ? "text-green-600" :"" } border border-gray-300 rounded-md p-2 `}>
              <label className="flex items-center gap-3">
              <HiOutlineBanknotes/> Cash on Delivery (COD)</label>

              </button>
            </div>

            <div className="mb-4">
              <button type="button"  disabled onClick={()=>setPaymentOp("upi")} className={`${paymentOp === "upi" ? "" :"" } border border-gray-300 rounded-md p-2 `}>
             <del>
              <span className="flex  gap-3 items-center">
              <BsBank2/>Net Banking / UPI </span>
             </del>
              
              </button>
            </div>

          </div>
          <button
            className="w-full bg-[#F1C782] text-white py-2 rounded-md hover:bg-[#edb863] transition mt-6"
            // onClick={handlePayment} 
            >
            Place Order
          </button>

          </form>
        </div>


        <div className="bg-white shadow-lg  p-6">
          <h2 className="text-md font-bold mb-4">ORDER SUMMERY</h2>
          <ul className="bg-gray-100 shadow-sm  p-4">
            {cartItem.map((val) => (
              <li
                key={val._id}
                className="flex items-center justify-between py-4 border-b last:border-b-0"
              >
                <img
                  src={val.productId.image}
                  alt={val.productId.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div className="flex-grow">
                  <span className="block font-bold">{val.productId.name}</span>
                  <span className="block text-sm text-gray-600">
                    Quantity: {val.quantity}
                  </span>
                </div>
                <span className="font-semibold">
                  ${val.productId.price * val.quantity}.00
                </span>
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-bold mt-6 text-right">
            Total Price: ${totalAmount}.00
          </h2>
        </div>
      </div>

      <div className="mt-6 text-center">
        Back to shop{" "}
        <Link to="/products" className="text-blue-600 hover:underline font-semibold transition">
          more
        </Link>
      </div>
    </div>
  );
};

export default Checkout;

