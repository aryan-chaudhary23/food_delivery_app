import React from 'react';
import { NavLink } from 'react-router-dom';
import { PlusCircle, List, Package } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-1/5 min-h-screen border-r border-gray-300 bg-gray-50">
      <div className="flex flex-col pt-12 pl-8 gap-6">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-md transition-colors ${
              isActive
                ? 'bg-red-100 border-l-4 border-red-400 text-red-500'
                : 'hover:bg-gray-100'
            }`
          }
        >
          <PlusCircle className="w-6 h-6" />
          <p className="text-sm font-medium hidden md:block">Add Items</p>
        </NavLink>
        
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-md transition-colors ${
              isActive
                ? 'bg-red-100 border-l-4 border-red-400 text-red-500'
                : 'hover:bg-gray-100'
            }`
          }
        >
          <List className="w-6 h-6" />
          <p className="text-sm font-medium hidden md:block">List Items</p>
        </NavLink>
        
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-md transition-colors ${
              isActive
                ? 'bg-red-100 border-l-4 border-red-400 text-red-500'
                : 'hover:bg-gray-100'
            }`
          }
        >
          <Package className="w-6 h-6" />
          <p className="text-sm font-medium hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
