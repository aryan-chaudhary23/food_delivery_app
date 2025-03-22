import React, { useContext, useState,useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { motion } from "framer-motion";
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const navigate= useNavigate();
  const { getTotalCartAmount, token, food_list, cartItems,url } = useContext(StoreContext);
  const [data,setData] =useState({ // this is to store user delivery details
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler= (event)=>{
    const name= event.target.name;
    const value= event.target.value;
    setData(data=>({
      ...data,
      [name]: value
    }))
  }
  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems= [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo =item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    });
    let orderData= {
      address: data,
      items: orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    console.log(response)
    if(response.data.success){
      const {session_url} =response.data;
      console.log(session_url)
      window.location.replace(session_url);
    }else{
      toast.error(response.data.message)
    }
  }
  useEffect(()=>{
    if(!token){
      toast.error("Please Login first")
      navigate("/cart")
    }
    else if(getTotalCartAmount()===0){
      toast.error("Please Add Items to Cart");
      navigate("/cart")
    }
  },[token])
  return (
    <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3 }}
    >
      <form onSubmit={placeOrder} className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 bg-white shadow-md rounded-2xl p-8">
        {/* Left Side - Delivery Information */}
        <div>
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            Delivery Information
          </p>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              name ="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              required
              type="text"
              placeholder="First name"
              className="w-full border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              name ="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              required
              type="text"
              placeholder="Last name"
              className="w-full border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Email */}
          <input
            name ="email"
            onChange={onChangeHandler}
            value={data.email}
            required
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
          />

          {/* Street */}
          <input
            name ="street"
            onChange={onChangeHandler}
            value={data.street}
            required
            type="text"
            placeholder="Street"
            className="w-full border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
          />

          {/* City & State */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              name ="city"
              onChange={onChangeHandler}
              value={data.city}
              required
              type="text"
              placeholder="City"
              className="w-full border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              name ="state"
              onChange={onChangeHandler}
              value={data.state}
              required
              type="text"
              placeholder="State"
              className="w-full border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Zip Code & Country */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              name ="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              required
              type="text"
              placeholder="Zip Code"
              className="w-full border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              name ="country"
              onChange={onChangeHandler}
              value={data.country}
              required
              type="text"
              placeholder="Country"
              className="w-full border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Phone */}
          <input 
            name ="phone"
            onChange={onChangeHandler}
            value={data.phone}
            required
            type="tel"
            placeholder="Phone"
            className="w-full border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
          />
        </div>

        {/* Right Side - Cart Summary */}
        <div>
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Cart Totals
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <p>Subtotals:</p>
                <p>${getTotalCartAmount().toFixed(2)}</p>
              </div>
              <hr />
              <div className="flex justify-between text-gray-700">
                <p>Delivery Fee:</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2.00}</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-gray-800">
                <p>Total:</p>
                <p>
                  $
                  {getTotalCartAmount() === 0
                    ? "0.00"
                    : (getTotalCartAmount() + 2).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Proceed Button */}
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-blue-600 transition ${
                getTotalCartAmount() === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={getTotalCartAmount() === 0}
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </form>
    </motion.div>
  );
};

export default PlaceOrder;
