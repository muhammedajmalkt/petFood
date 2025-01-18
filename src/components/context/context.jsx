import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';

export const Mycontext = createContext();

const Context = ({ children }) => {
    const [item, setitem] = useState([]);
    const [isLogin,setIsLogin]=useState(()=> {
        return localStorage.getItem("isLogin") === "true"})  

    const [filteredItems, setFilteredItems] = useState([]);
    const [searchProduct,setSearchproducts]=useState([])
    const [cartItems, setCartItems] = useState(()=>{
        const storeCart=localStorage.getItem("cartItems")
        return storeCart ? JSON.parse(storeCart) : []
    });

    const[userid,setUserid]=useState(()=> {
        return localStorage.getItem("userid")|| "" })
    const[username,setUsername]=useState(()=>{
        return localStorage.getItem("username")|| ""})
     const [searchvalues, setSearchvalues] = useState("");
    
        const[adminLoged,setAdminLoged]=useState(null)

    

    useEffect(() => {
        axios.get("http://localhost:4000/products")
            .then((res) => {
                const data = res.data;
                setitem(data);
                setFilteredItems(data)
            })
            .catch((error) => {
                console.error("Error fetching data");
            });
    }, []);

    useEffect(() => {
        const fetchcart = ()=> {
            axios.get(`http://localhost:4000/users/${userid}`)
            .then((res)=>{
                const cart=res.data.cart || []
                setCartItems(cart)
            })
            .catch((error) => {
                console.error("Error fetching data:",error);
            });
        }
        if(userid){
            fetchcart()
        }
    }, [userid]);

  

    useEffect(()=>{
        localStorage.setItem("cartItems",JSON.stringify(cartItems))

    },[cartItems])

    return (
        <Mycontext.Provider value={{ item, setitem, filteredItems, setFilteredItems,searchProduct,setSearchproducts ,isLogin,setIsLogin,
            userid,setUserid,username,setUsername , cartItems,setCartItems,searchvalues,setSearchvalues,adminLoged,setAdminLoged

        }}>
            {children}
        </Mycontext.Provider>
    );
};

export default Context;
