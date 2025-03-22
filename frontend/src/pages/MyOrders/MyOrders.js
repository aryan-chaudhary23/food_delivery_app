import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { Package } from "lucide-react";

const MyOrders = () => {

    const {url,token} = useContext(StoreContext);
    const [data,setData] =useState([]);

    const fetchOrders= async()=>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers: {token}});
        if(response.data.success) setData(response.data.data);
    }
    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token]) // whenever token updated then this runs 
    //token might get updated when we login or logout

  return (
    <div className="my-12">
    <h2 className="text-xl font-semibold">Orders</h2>
    <div className="flex flex-col gap-5 mt-8">
      {data.map((order, index) => (
        <div
          key={index}
          className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-8 text-sm p-4 text-gray-700 border border-tomato"
        >
          <Package className="w-12 h-12 text-tomato" />
          <p>
            {order.items.map((item, index) =>
              index === order.items.length - 1
                ? `${item.name} X ${item.quantity}`
                : `${item.name} X ${item.quantity}, `
            )}
          </p>
          <p>${order.amount}.00</p>
          <p>Items: {order.items.length}</p>
          <p>
            <span className="text-tomato">&#x25cf;</span>
            <b className="font-medium text-gray-700"> {order.status}</b>
          </p>
          <button
            className="border-none py-3 px-4 rounded bg-[#ffe1e1] cursor-pointer text-gray-700"
            onClick={fetchOrders}
          >
            Track Order
          </button>
        </div>
      ))}
    </div>
  </div>
  )
}

export default MyOrders