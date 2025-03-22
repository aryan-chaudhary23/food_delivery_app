import React, { useContext, useState } from "react";
import { X } from "lucide-react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const {url,setToken} =useContext(StoreContext)
  const [currentState, setCurrentState] = useState("Login");
  const [data,setData] = useState({
    name: "",
    email:"",
    password:""
  })
  const onChangeHandler = (event)=>{
    const name= event.target.name;
    const value= event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const onLogin = async (event)=>{
    event.preventDefault();
    let newUrl= url;
    if(currentState==="Login") newUrl+= "/api/user/login"
    else newUrl+= "/api/user/register"
    const response= await axios.post(newUrl,data);
    console.log(response)
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
      toast.success(`Welcome ${data.name}`)
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={onLogin} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        {/* Title */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            {currentState}
          </h2>
          <X
            onClick={() => setShowLogin(false)}
            className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black transition"
          />
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {currentState === "Sign Up" && (
            <input
              onChange={onChangeHandler}
              name='name'
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              className="w-full border border-gray-300 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          )}
          <input
            onChange={onChangeHandler}
            name='email'
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            className="w-full border border-gray-300 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-red-500 transition"
          />
          <input
            onChange={onChangeHandler}
            name='password'
            value={data.password}
            type="password"
            placeholder="Your password"
            required
            className="w-full border border-gray-300 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-red-500 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-2xl mt-6 hover:bg-gray-800 transition font-semibold"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Terms and Conditions */}
        <div className="flex items-start mt-4 space-x-2">
          <input type="checkbox" required className="w-4 h-4 mt-1" />
          <p className="text-sm text-gray-500 leading-tight">
            By continuing, I agree to the{" "}
            <span className="text-red-500 hover:underline cursor-pointer">
              terms of use
            </span>{" "}
            &{" "}
            <span className="text-red-500 hover:underline cursor-pointer">
              privacy policy
            </span>
            .
          </p>
        </div>

        {/* Toggle Between Login/Signup */}
        {currentState === "Login" ? (
          <p className="mt-6 text-center text-gray-600">
            Create a new account?{" "}
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="text-red-500 hover:underline cursor-pointer font-medium"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              className="text-red-500 hover:underline cursor-pointer font-medium"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
