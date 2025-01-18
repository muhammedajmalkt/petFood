import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
    <div className="flex items-center bg-white justify-between pt-[70px] pb-[100px]">
      <div className="pb-24">

       <Link to="/products" >
       <button className="bg-white  absolute shadow-black shadow-md left-[380px] mt-20 px-28 py-4 text-orange-700 font-bold  rounded-full hover:bg-green-50 transition duration-300 ">
          SHOP NOW
        </button>
        </Link>
      </div>

      <div className="flex ">
      <img src="hero.png"
          className="object-cover w-[5000px] "
          alt="A happy dog " />
      </div>
    </div>
    </>
  );
};

export default Home;
