import React, { useRef } from 'react';
import { menu_list } from '../../assets/assets';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ExploreMenu = ({ category, setCategory }) => {
  const scrollRef = useRef(null);

  // Scroll function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.6;

      if (direction === 'left') {
        scrollRef.current.scrollTo({ left: scrollLeft - scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div id="menu" className="w-full px-6 md:px-12 py-16 bg-gray-50">
      {/* Title */}
      <div className="text-center mb-8 flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-gray-900">
          Explore Our Menu
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover a curated selection of mouth-watering dishes crafted with the finest ingredients and culinary mastery. Elevate your dining experience, one bite at a time.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition duration-300"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>

        {/* Menu Items */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4"
        >
          {menu_list.map((menu, index) => (
            <div
              key={index}
              className={`min-w-[160px] h-[180px] flex flex-col items-center justify-between bg-white rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg ${
                category === menu.menu_name
                  ? 'border-2 border-blue-500 shadow-lg'
                  : ''
              }`}
              onClick={() =>
                setCategory((prev) =>
                  prev === menu.menu_name ? 'All' : menu.menu_name
                )
              }
            >
              {/* Image */}
              <div className="w-24 h-24 mt-4">
                <img
                  src={menu.menu_image}
                  alt={menu.menu_name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Category Name */}
              <span
                className={`text-md font-medium mb-4 ${
                  category === menu.menu_name
                    ? 'text-blue-500'
                    : 'text-gray-800'
                }`}
              >
                {menu.menu_name}
              </span>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition duration-300"
        >
          <ChevronRight size={24} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default ExploreMenu;
