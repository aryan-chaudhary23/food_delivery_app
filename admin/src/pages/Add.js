import React, { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const Add = ({url}) => {
    const [image, setImage] = useState(null);
    const [data,setData]= useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })

    const onSubmitHandler = async(event) =>{
        event.preventDefault();
        const formData= new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        //now send this form data to the server
        const response = await axios.post(`${url}/api/food/add`,formData)
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad"
            }) //we are resetting the data to empty so that the form will be cleared
            setImage(false) //we are resetting the image to false so that the image will be removed from the image container
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event)=>{
        const name =event.target.name;
        const value =event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    return (
        <div className="w-[70%] ml-[max(5vw,25px)] mt-12 text-gray-500 text-base max-w-xl bg-gray-50 rounded-xl shadow-md p-6">
            <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
                {/* Image Upload */}
                <div className="flex flex-col gap-3 items-center">
                    <p className="text-lg font-medium">Upload Image</p>
                    <label
                        htmlFor="image"
                        className="w-full max-w-[300px] h-[150px] border-2 border-dashed border-gray-300 rounded-xl bg-gray-100 flex items-center justify-center cursor-pointer hover:border-blue-400 transition duration-300"
                    >
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Uploaded"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            <div className="flex flex-col items-center text-gray-400">
                                <Upload size={40} />
                                <p className="text-sm mt-2">Click to upload image</p>
                            </div>
                        )}
                    </label>
                    <input
                        type="file"
                        id="image"
                        hidden
                        required
                        onChange={(e)=> setImage(e.target.files[0])}
                    />
                </div>

                {/* Product Name */}
                <div className="w-full max-w-[280px] flex flex-col gap-2">
                    <p className="text-lg font-medium">Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Product Description */}
                <div className="w-full max-w-[280px] flex flex-col gap-2">
                    <p className="text-lg font-medium">Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="4"
                        placeholder="Write content here"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    ></textarea>
                </div>

                {/* Category & Price */}
                <div className="flex gap-8">
                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <p className="text-lg font-medium">Product Category</p>
                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            name="category"
                            className="w-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-2">
                        <p className="text-lg font-medium">Product Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="$20"
                            className="w-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-[120px] py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition duration-300"
                >
                    ADD
                </button>
            </form>
        </div>
    );
};

export default Add;
