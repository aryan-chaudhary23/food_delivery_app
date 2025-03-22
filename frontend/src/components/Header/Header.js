import React from 'react';
import { assets } from '../../assets/assets';

const Header = () => {
  return (
    <div id="home" className="flex justify-center items-center w-full min-h-[80vh] mt-0">
      {/* Card Container */}
      <div className="relative w-[92%] md:w-[75%] h-[70vh] overflow-hidden rounded-3xl shadow-xl">
        {/* Background Slider */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center absolute animate-slide"
            style={{ backgroundImage: `url(${assets.headerbg1})` }}
          ></div>
          <div
            className="w-full h-full bg-cover bg-center absolute animate-slide animation-delay-5s"
            style={{ backgroundImage: `url(${assets.headerbg2})` }}
          ></div>
          <div
            className="w-full h-full bg-cover bg-center absolute animate-slide animation-delay-10s"
            style={{ backgroundImage: `url(${assets.headerbg3})` }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-12 bg-black bg-opacity-50 rounded-3xl">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
            Order Your <span className="text-red-400">Favourite Food</span> Here
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl drop-shadow-md">
            Discover a diverse menu featuring a mouth-watering array of dishes, prepared with the finest ingredients and culinary expertise.  
            Satisfy your cravings and elevate your dining experience — one bite at a time.
          </p>
          <button className="bg-red-500 text-white px-8 py-4 rounded-full shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105">
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
