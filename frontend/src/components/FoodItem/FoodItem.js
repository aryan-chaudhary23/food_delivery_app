import React,{useContext} from 'react';
import { Minus, Plus } from 'lucide-react';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      {/* Image */}
      <div className="w-full h-40 overflow-hidden">
        <img 
          src= {`${url}/images/` + image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        
        {/* Description */}
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
          {description}
        </p>
        
        {/* Price + Button */}
        <div className="flex justify-between items-center mt-2">
      <span className="text-red-500 font-semibold text-lg">${price}</span>
      {!cartItems[id] ? (
        <button
          onClick={() => addToCart(id)}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center gap-3">
          {/* Decrease Button */}
          <button
            onClick={() =>
              removeFromCart(id)
            }
            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition duration-300"
          >
            <Minus size={20} />
          </button>

          {/* Item Count */}
          <span className="text-lg font-medium text-gray-800 w-6 text-center">
            {cartItems[id]}
          </span>

          {/* Increase Button */}
          <button
            onClick={() => addToCart(id)}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
          >
            <Plus size={20} />
          </button>
        </div>
      )}
    </div>
      </div>
    </div>
  );
};

export default FoodItem;
