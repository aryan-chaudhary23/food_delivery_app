import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import {motion} from "framer-motion"; 

const Cart = () => {
  const { food_list, cartItems, removeFromCart, getTotalCartAmount,url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3 }}
    >
      <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6">
        {/* Cart Items */}
        <div className="mb-6">
          <div className="grid grid-cols-6 gap-4 border-b pb-3 font-semibold text-gray-700">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>

          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id} className="grid grid-cols-6 gap-4 items-center py-3 border-b">
                  {/* Item Image */}
                  <img
                    src={`${url}/images/` + item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />

                  {/* Title */}
                  <p className="text-gray-800 font-medium">{item.name}</p>

                  {/* Price */}
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>

                  {/* Quantity */}
                  <p className="text-gray-800">{cartItems[item._id]}</p>

                  {/* Total */}
                  <p className="font-semibold text-gray-800">
                    ${(item.price * cartItems[item._id]).toFixed(2)}
                  </p>

                  {/* Remove Button */}
                  <X
                    onClick={() => removeFromCart(item._id)}
                    className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                  />
                </div>
              );
            }
          })}
        </div>

        {/* Cart Bottom Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cart Totals */}
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
                <p>${getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-gray-800">
                <p>Total:</p>
                <p>${ getTotalCartAmount()===0 ?0 : (getTotalCartAmount() + 2).toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/order")}
              className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4 hover:bg-blue-600 transition font-semibold"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>

          {/* Promo Code Section */}
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <p className="text-gray-700 mb-3">
              If you have a promo code, enter it here:
            </p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 border border-gray-300 rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default Cart;
