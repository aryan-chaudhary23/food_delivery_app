import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Package } from "lucide-react";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrder = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    }
    else toast.error("Error")
  };
  const statusHandler = async(event,orderId)=>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status: event.target.value
    })
    if(response.data.success){
      await fetchAllOrder();
    }
  }


  useEffect(() => {
    fetchAllOrder();
  }, []);

  return (
    <div className="my-12 px-4">
      <h3 className="text-2xl font-semibold text-gray-800">Order Page</h3>
      <div className="mt-6 flex flex-col gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] md:grid-cols-[0.5fr_2fr_1fr] gap-8 p-5 border border-red-500 text-gray-700 text-sm md:text-xs rounded-lg shadow-sm"
          >
            {/* Replacing Image with Lucide Icon */}
            <Package className="w-12 h-12 text-red-500 md:w-10 md:h-10" />

            {/* Order Details */}
            <div>
              <p className="font-semibold">
                {order.items.map((item, index) =>
                  index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p className="font-semibold mt-6 mb-2">{order.address.firstName} {order.address.lastName}</p>
              <div className="mb-3 text-gray-600">
                <p>{order.address.street},</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
              </div>
              <p className="text-gray-700">{order.address.phone}</p>
            </div>

            {/* Order Summary */}
            <p className="font-medium text-gray-700">Items: {order.items.length}</p>
            <p className="font-medium text-gray-700">${order.amount}</p>

            {/* Order Status Dropdown */}
            <select
            onChange={(event)=>statusHandler(event,order._id)}
            value={order.status}
              className="bg-red-100 border border-red-500 px-3 py-2 outline-none rounded-lg w-[max(11vw,120px)] md:py-1 md:text-xs cursor-pointer"
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
