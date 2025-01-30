import React, { useContext, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { handleLogin } from "../../Features/authSlice";
import Swal from "sweetalert2";


const initialvalue = {
  email: "",
  password: "",
};

const Validation = Yup.object({
  email: Yup.string().email("Enter a valid e-mail").required("E-mail is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logError ,user } = useSelector((state) => state.auth);
    console.log("rrr",logError);
    
  // useEffect(()=>{
  //   if(logError){
  //     Swal.fire({
  //       position: "top-end",
  //       icon: "error",
  //       title: logError,
  //       showConfirmButton: false,
  //       timer: 3000
  //     });
  //   }
  // },[logError])

  const handleSubmit = async (values) => {
    try {
      const result = await dispatch(handleLogin(values)).unwrap()
      console.log(result,"=result");

      const { role } = result.data;
      if (role === "user") {
        Swal.fire({
          position: "top-end",
          title: "Successfully loged",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/");
      } else if (role === "admin") {
        Swal.fire({
          position: "top-end",
          title: "Admin loged",
          showConfirmButton: false,
          timer: 1500
        })
        navigate("/admin");
      } 
    } catch (err) {
            Swal.fire({
        position: "top-end",
        icon: "error",
        title: logError,
        showConfirmButton: false,
        timer: 3000
      });
      console.error("Error during login:", err);
    } 
  };

  return (
    <div className="px-[20px]">
    <Formik
      initialValues={initialvalue}
      validationSchema={Validation}
      onSubmit={handleSubmit}
    >
      {({ errors,touched }) => (
        <Form className="max-w-md mx-auto p-6 bg-orange-50 rounded-lg shadow-lg mt-40">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail:
            </label>
            <Field
              type="email"
              placeholder="Enter e-mail"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              name="email"
            />
            {errors.email && touched.email && (
              <small className="text-red-600">{errors.email}</small>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password:
            </label>
            <Field
              type="password"
              placeholder="Enter Password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              name="password"
            />
            {errors.password && touched.password &&(
              <small className="text-red-600">{errors.password}</small>
            )}
          </div>
          {/* { logError && (
              <div className="text-red-600 text-center mb-4">
                {logError}
              </div>
            )} */}

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
            Log in
          </button>
          <br />
          <p className="mt-4 text-center text-gray-600">
            New to petfood ?
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200" >
              {" "}
              Signup
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  </div>
);
};

export default Login;
    