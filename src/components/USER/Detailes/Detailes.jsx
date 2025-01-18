import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../Features/cartSlice";
import { ToastContainer, toast } from "react-toastify";


const Detailes = () => {
  const navigate = useNavigate();


  const {products} =useSelector((state)=>state.products)
  const { id } = useParams();
  const dtls = products.find((val) => val?._id === id);

 const dispatch= useDispatch()
 const {user}=useSelector((state)=>state.auth)
 
  const handleCart=()=>{
    if(user){
      dispatch(addProductToCart({userId:user._id,productId:dtls._id,quantity:1})) 
      .then(()=>{
        toast.success("Product added to cart!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      })
    })
    .catch((error) => {
      toast.error("Failed to add product to cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error adding to cart:", error);
    });
} else {
  toast.info("Please log in to add items to your cart.", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
}



  // const handleQuantityChange = (e) => {
  //   const value = Number(e.target.value);
  //   if (value >= 1) {
  //     setQuantity(value);
  //   }
  // }
  //  const handleCart = () => {
  //   const checkCart = cartItems.find((item) => item.id === dtls.id);
  //   if (isLogin) {
  //     if (!checkCart) {
  //       setCartItems((prevItems) => [...prevItems, { ...dtls, quantity: 1 }]);
  //       Swal.fire("Product added to cart");
  //     } else {
  //       Swal.fire("This item is already in the cart!");
  //     }
  //   } else {
  //     Swal.fire("Please login!");
  //     navigate("/login");
  //   }
  // };

  return (
    <div className="flex flex-col md:flex-row items-center p-10 md:h-[600px] md:w-[1500px] mx-auto bg-[#faf5ec] shadow-xl  md:my-52">
          <ToastContainer />

      <div className="flex-1">
        <img
          src={dtls?.image}
          className="w-full h-96 object-scale-down rounded-lg mb-4"
        />
      </div>

      <div className="flex-1 flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-2">{dtls?.name}</h1>
        <h4 className="text-lg text-gray-900 mb-2">Weight: {dtls?.description}</h4>
        <h4 className="text-lg text-gray-500 mb-2">Weight: {dtls?.weight}</h4>
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Price: ${dtls?.price}
        </h2>

        {/* <div className="flex items-center mb-4 ">
          <label className="mr-2">Quantity:</label>

          <input
            type="number"
            id="quantity"
            value={quantity}
            min="1"
            onChange={handleQuantityChange}
            className="border border-gray-300 rounded-lg w-20 text-3xl text-center  h-12"
          />
        </div> */}

        <button
          className="mt-auto px-6 py-2 bg-[#F1C782] text-white  hover:bg-[#ddad5f] transition duration-300"
          onClick={handleCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Detailes;
