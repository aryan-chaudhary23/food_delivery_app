import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams,setSearchParams]=useSearchParams(); //this is done to fetch order id and success status from the URL
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      });

      if (response.data.success) {
        navigate("/myorders");
        toast.success("Order Placed Successfully");
      } else {
        toast.error("Something went wrong");
        navigate("/");
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="w-24 h-24 border-4 border-gray-400 border-t-[tomato] rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;
