import { Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Validation } from "./Validation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearError, handleSignup } from "../../Features/authSlice";
import { useEffect } from "react";


const initialvalue = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  cart: [], 
};

const Signup = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const {signError}=useSelector((state)=> state.auth)
  // console.log(error);
  

  const handleSubmit = async (values) => {
    try {
      const res = await dispatch(handleSignup(values)).unwrap();
      console.log(res);
      if (res.success) {
        navigate("/login");
      } else{
        alert("error")
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
if(signError){
  setTimeout(()=>{
    dispatch(clearError())

  },5000)
}
  },[signError])

  return (
    <div className="px-[20px] ">
      <Formik
        initialValues={initialvalue}
        validationSchema={Validation}
        onSubmit={handleSubmit}
      >
        {({ errors,touched }) => (
          <Form className="signup max-w-md mx-auto p-6 bg-orange-50 rounded-lg shadow-lg mt-36">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Create an account
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <Field
                type="text"
                placeholder="Enter your name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                name="name"
              />
              {errors.name && touched.name && <small className="text-red-600">{errors.name}</small>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                E-mail:
              </label>
              <Field
                type="email"
                placeholder="Enter e-mail"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                name="email"
              />
              {errors.email &&  touched.email && <small className="text-red-600">{errors.email}</small>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <Field
                type="password"
                placeholder="Enter Password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                name="password"
              />
              {errors.password && touched.password &&  <small className="text-red-600">{errors.password}</small>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password:
              </label>
              <Field
                type="password"
                placeholder="Confirm password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                name="cpassword"
              />
              {errors.cpassword && touched.cpassword &&  <small className="text-red-600">{errors.cpassword}</small>}
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
            {signError &&
            <p className="text-red-600 my-5 mx-32">{signError}</p> }

            <p className="mt-4 text-center text-gray-600">
              Do you have an account?
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200">
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
