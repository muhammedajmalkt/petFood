import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { GrView } from "react-icons/gr";
import { SiAdblock } from "react-icons/si";
import { MdDeleteForever } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { handleAllUser, handleBlock } from "../../Features/adminSlice";
import View from "./View";
import { ImBlocked } from "react-icons/im";




const Users = () => {
  const [showView, setShowView] = useState(false)//pageShow
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(handleAllUser({page:1,limit:50}));
  }, []);

  const {allUser, message} = useSelector((state) => state.admin);
      // console.log(allUser ,"users");

  const userDetailes = (user) => {
    setSelectedUser(user);
    setShowView(true);
  };

//   const handleDelete = (user) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Logic to delete user (adjust API call as needed)
//         Swal.fire("Deleted!", "User has been deleted.", "success");
//       }
//     });
//   };

  const blockUser = (userId) => {
      dispatch(handleBlock(userId)).unwrap()
      .then((res) => {
        // console.log(res);
        // setSelectedUser(res.data)
        dispatch(handleAllUser({page:1,limit:50}));
        console.log(allUser);
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:res.message,
          showConfirmButton: false,
          timer: 3000,
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
        console.error("Error blocking user:", error);
      });
  };
  
  return (
    <>
      {showView ? (
        <View setShowView={setShowView} selectedUser={selectedUser} />
      ) : (
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">USERS</h1>
          <div className="bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allUser.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex flex-row gap-1 items-center">
                      <FaUserAlt />{user.name}
                    </td>
                      
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>

                    <td className="flex items-center">
                      <p className="px-4 py-2 my-2  whitespace-nowrap text-xl text-blue-600 hover:bg-blue-200"
                        title="View"
                        onClick={() => userDetailes(user)}><GrView /></p>

                        <p className="px-4 py-2 my-2 whitespace-nowrap text-2xl text-orange-400 hover:bg-orange-100"
                        title= {user.isBlocked === true ?"Unblock":"Block"}
                        onClick={() => blockUser(user._id)}
                      > { user.isBlocked === true ? <ImBlocked/>:<SiAdblock />}
                      </p>
                
                        {/* <p className="px-4 py-2 my-2 whitespace-nowrap text-3xl text-red-600 hover:bg-red-200"
                        title="Delete"
                        // onClick={() => handleDelete(user)}
                      ><MdDeleteForever />
                      </p> */}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
