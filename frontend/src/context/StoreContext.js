// to fetch the items of the selected category from the global state object and display them in the UI.
import { createContext, useEffect, useState } from "react";
//import { food_list } from "../assets/assets";
import axios from "axios"

export const StoreContext = createContext(null);
   //remeber to make changes in index.js
const StoreContextProvider= (props)=>{
    const [cartItems,setCartItems]=useState({});
    const url="http://localhost:4000"
    const [token,setToken] =useState("")
    const [food_list,setFood_list]= useState([])
    const fetchFood = async()=>{
        const response =await axios.get(`${url}/api/food/list`)
        if(response.data.success){
            setFood_list(response.data.data)
        }else{
            console.log("Tf");
        }
    }

    const addToCart= async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removeFromCart= async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
    // this will run whenevr changes made in cartItems

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for (const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo= food_list.find((product)=>product._id===item);
                totalAmount+=itemInfo.price * cartItems[item];
            }
        }
        return totalAmount
    }
    const loadCartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers: {token}})
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFood();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])

    const contextValue={ //everything inside this can beused in any component
        food_list,cartItems,setCartItems,addToCart,removeFromCart, getTotalCartAmount, url, token, setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;