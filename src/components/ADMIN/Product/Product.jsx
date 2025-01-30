import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, editProduct, handleProducts, hanldeNewProduct } from "../../Features/productSlice.js";
import { ToastContainer, toast } from "react-toastify";



const Product = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    weight: "",
    category: "",
    price: "",
  });
  const [editProducts, setEditProducts] = useState(null);
  const [addNew,setAddNew]=useState(false) //button
  const dispatch = useDispatch()

  const {products} =useSelector((state)=>state.products)
  
  useEffect(()=>{
 dispatch (handleProducts({limit:50,page:1,category:"all"}))
  },[])
  // console.log(products ,"prd");
  
  const handleDelete = (productId) => {    
      dispatch(deleteProduct(productId)).unwrap()
      .then(()=>{
        dispatch (handleProducts({limit:50,page:1,category:"all"}))

      toast.success(" Successfully deleted a product!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     })
     .catch((error)=>{
              toast.error(error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Error delete product:", error);

     })

  };

  const handleSubmit = (e) => {
    e.preventDefault();
  try {
      const form = new FormData();// Append the file
      form.append("name", formData.name);
      form.append("image", formData.image); 
      form.append("weight", formData.weight);
      form.append("category", formData.category);
      form.append("price", formData.price);

      if (isEditing) {
        dispatch(editProduct({ productId: editProducts._id, product: form }))
          .unwrap()
          .then(() => {
            dispatch(handleProducts({ limit: 50, page: 1, category: "all" }));
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully updated a product",
              showConfirmButton: false,
              timer: 2000,
            });
          })
          .catch((error) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: error,
              showConfirmButton: false,
              timer: 2000,
            });
          });
      } else {
        // console.log(formData);
        dispatch(hanldeNewProduct(form)).unwrap()
          .then(() => {
            window.scrollTo(0, document.body.scrollHeight);
            dispatch(handleProducts({ limit: 50, page: 1, category: "all" }));
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully updated a product",
              showConfirmButton: false,
              timer: 2000,
            });
          })
          .catch((error) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: error,
              showConfirmButton: false,
              timer: 3000,
            });
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
      setFormData({
              name: "",
              image: "",
              weight: "",
              category: "",
              price: "",
        });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleEdit = (product) => {
    console.log(product);
    setIsEditing(true)
    setAddNew(true)
    setEditProducts(product);    
    // dispatch(editProduct({productId:product._id,product}))
  };
  // console.log("===edit",editProducts);
  

  useEffect(() => {
    window.scrollTo(0,0)
    if (editProducts) {
      setFormData(editProducts);
    } else {
      setFormData({
        name: "",
        image: "",
        weight: "",
        category: "",
        price: "",
      });
    }
  }, [editProducts]);
 
  const handleAddButton=()=>{
    setAddNew(!addNew)
  }

  



  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <button
        onClick={handleAddButton}
        className="float-right  bg-green-600 text-white p-3 px-4  font-extrabold rounded-md"
      >
        {addNew === true ? "Close" : "Add+"}
      </button>
      {addNew && (
        <div className="mx-auto my-10 p-6 bg-white rounded-lg shadow-md px-14">
          <h1 className="text-lg font-bold mb-6">
            {editProducts ? "EDIT PRODUCT " : "ADD PRODUCTS"}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter product name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image URL:
              </label>
              <input
                type="file"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                name="image"
                onChange={(e) =>
                  setFormData((data) => ({ ...data, image: e.target.files[0] }))
                }
                // required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Weight:
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter product weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4 ">
              <label className="block text-sm font-medium text-gray-700">
                Category:
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2  "
                onChange={handleChange}
                value={formData.category}
                name="category"
                required
              >
                <option value="">select</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price:
              </label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter product price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {editProducts ? "Edit Products" : "Add Products"}
            </button>
          </form>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6">PRODUCT LIST</h1>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-[hsl(37,79%,80%)] text-gray-700">
            <th className="border border-gray-300 p-4">No.</th>
            <th className="border border-gray-300 p-4">Image</th>
            <th className="border border-gray-300 p-4">Name</th>
            <th className="border border-gray-300 p-4">Weight</th>
            <th className="border border-gray-300 p-4">Category</th>
            <th className="border border-gray-300 p-4">Price</th>
            <th className="border border-gray-300 p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products?.map((product, index) => (
              <tr
                key={product._id}
                className={`${
                  product.category === "cat" ? "bg-teal-50" : "bg-orange-50"
                } border-b `}
              >
                <td className="border border-gray-300 p-4">{index + 1}</td>
                <td className="border border-gray-300 p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </td>
                <td className="border border-gray-300 p-4">{product.name}</td>
                <td className="border border-gray-300 p-4">{product.weight}</td>
                <td className="border border-gray-300 p-4">
                  {product.category}
                </td>
                <td className="border border-gray-300 p-4">${product.price}</td>
                <td className="border border-gray-300 p-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 "
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
