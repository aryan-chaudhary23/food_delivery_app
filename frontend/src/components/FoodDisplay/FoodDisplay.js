import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { assets } from '../../assets/assets';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Conditionally filter based on category
  const filteredList =
    category && category.trim().toLowerCase() !== 'all'
      ? food_list.filter(
          (item) =>
            item.category?.trim().toLowerCase() === category.trim().toLowerCase()
        )
      : food_list;

  return (
    <div id="mobile-app" className="w-full px-6 md:px-12 py-16">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
        Top Dishes Near You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredList.map((item) => (
          <FoodItem
            key={item.id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
      <div className='flex flex-col items-center gap-12 pt-16'>
      <h2 className="text-6xl font-bold mx-auto text-gray-900 text-center tracking-tight w-[70vw]">
      For Better Exprience Download
      Tomato App 
      </h2>
      <div className=' flex flex-row items-center justify-center gap-10'>
        <img className='scale-75 cursor-pointer transition duration-300 hover:scale-100' src={assets.playstorelogo} alt='playstore' />
        <img className='scale-75 cursor-pointer transition duration-300 hover:scale-100' src={assets.appstorelogo} alt='appstore' />
        </div>      
      </div>
    </div>
  );
};

export default FoodDisplay;
