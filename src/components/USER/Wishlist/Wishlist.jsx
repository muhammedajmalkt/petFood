import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist, removeWishlist } from '../../Features/wishlistSlice';
import { ToastContainer, toast } from "react-toastify";
import { addProductToCart } from '../../Features/cartSlice';


const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  console.log(wishlist, "============wish");

  useEffect(() => {
    dispatch(getWishlist(user._id));
  }, [dispatch, user._id]);

const handleRemove=(productId)=>{
    dispatch(removeWishlist({userId:user._id,productId})).unwrap()
    .then(() => {
         dispatch(getWishlist(user._id));
          toast.success("Product removed from  wishlist!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((error) => {
          toast.error("Failed to remove product from wishlist!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          console.error("Error adding to wishlist:", error);
        });
}

 const addToCart=(productId)=>{
  if(user){
    dispatch(addProductToCart({userId: user._id,productId,quantity:1}))  
    .then(() => {
      toast.success("Product added to cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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


  return (
      <div className="min-h-screen bg-gray-100 p-6">
        <ToastContainer/>
      <h1 className="text-2xl font-bold mb-6  mt-20 ">WISHLIST</h1>
      {wishlist?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.productId._id}
              className="bg-white  shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={item.productId.image}
                alt={item.productId.name}
                className="w-36 h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {item.productId.name}
              </h2>
              <p className="text-sm text-gray-600">
                Category: {item.productId.category}
              </p>
              <p className="text-sm text-gray-600">Weight: {item.productId.weight}g</p>
              <p className="text-lg font-bold text-green-600 mt-2">
                ${item.productId.price}
              </p>
              <div >
              <button className="mt-4 bg-[#F1C782] w-32 mr-4 text-white py-2 px-4  hover:bg-[#eab55f]"
              onClick={()=>addToCart(item.productId._id)}>
                Add to Cart
              </button>
              <button className="mt-4 bg-red-600 w-32 text-white py-2 px-4  hover:bg-blue-700"
              onClick={()=>handleRemove(item.productId._id)}>
                remove
              </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl text-gray-500 mt-12">
            Your wishlist is empty!
          </h2>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
