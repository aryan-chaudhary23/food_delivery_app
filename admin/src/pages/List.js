import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch list');
    }
  };

  const removeFood = async (id) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the list after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
      <p className="text-xl font-semibold text-gray-700 mb-4">All Food List</p>

      {list.length === 0 ? (
        // When list is empty
        <div className="flex flex-col items-center justify-center text-gray-500 py-10">
          <p className="text-lg mb-4">No food items available. Add some items!</p>
          <Link
            to="/add"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Add Item
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-4 bg-gray-100 px-4 py-3 rounded-t-lg text-sm font-medium text-gray-600 hidden md:grid">
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Action</span>
          </div>

          {/* Table Content */}
          {list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-4 px-4 py-3 border-b border-gray-200 text-sm hover:bg-gray-50 transition duration-300 md:grid"
            >
              <img
                src={`${url}/images/` + item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-md shadow-sm"
              />
              <p className="truncate text-gray-800 font-medium">{item.name}</p>
              <p className="text-gray-600">{item.category}</p>
              <p className="text-gray-800 font-medium">${item.price}</p>
              <p
                onClick={() => removeFood(item._id)}
                className="text-red-500 cursor-pointer hover:text-red-700 transition duration-200 font-medium"
              >
                X
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
