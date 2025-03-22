import React, { useContext } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { StoreContext } from '../../context/StoreContext';
import { Link,useNavigate } from 'react-router-dom';
import { ShoppingBag, LogOut, User } from 'lucide-react';
import { toast } from 'react-toastify';




const Navbar = ({setShowLogin,showLogin}) => {
  const { cartItems, token, setToken } = useContext(StoreContext);
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    //toast.success("Logout Successfully")
    navigate("/");
    toast.success("Logged out successfully")
  }

  // Calculate total cart count
  const cartCount = Object.values(cartItems).reduce((total, num) => total + num, 0);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-red-500">
        Tomato<span className="text-black">.</span>
      </Link>

      {/* Navigation Links */}
      <ul className="flex gap-8">
        {[
          { label: 'Home', id: 'home' },
          { label: 'Menu', id: 'menu' },
          { label: 'Mobile App', id: 'mobile-app' },
          { label: 'Contact Us', id: 'contact' }
        ].map((item) => (
          <Link to="/" key={item.id}>
            <div
              onClick={() => handleScroll(item.id)}
              className="text-gray-700 hover:text-black cursor-pointer transition font-medium"
            >
              {item.label}
            </div>
          </Link>
        ))}
      </ul>

      {/* Icons and Button */}
      <div className="flex items-center gap-6 relative">
        {/* Search Icon */}
        <Search className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer transition" />

        {/* Basket Icon */}
        <Link to="/cart" className="relative">
           <ShoppingCart className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer transition" />
          {cartCount > 0 && (
            <div>
              {/* Blinking Dot */}
              <span className="absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              {/* Item Count */}
              <span className="absolute top-0 right-0 -mt-1 -mr-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </div>
          )}
        </Link>

        {/* Sign In Button */}
        {!token?
        <button onClick={()=>setShowLogin(!showLogin)} className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">
          Sign In
        </button>:
        <div className="relative group">
        <div className="navbar-profile relative">
          <User 
            className="w-10 h-10 text-gray-400 cursor-pointer hover:text-gray-600 transition-all"
          />
          <ul className="absolute hidden group-hover:flex flex-col right-0 z-20 bg-white shadow-lg rounded-lg border border-tomato p-4 space-y-2 transition-all">
            <li 
              onClick={() => navigate("/myorders")} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 hover:text-tomato transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-gray-500" />
              <p className="text-sm font-medium">Orders</p>
            </li>
            <hr className="border-gray-200" />
            <li 
              onClick={logout} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 hover:text-tomato transition-all cursor-pointer"
            >
              <LogOut className="w-5 h-5 text-gray-500" />
              <p className="text-sm font-medium">Logout</p>
            </li>
          </ul>
        </div>
      </div>
        }
      </div>
    </nav>
  );
};

export default Navbar;
