import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";


// app config
const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.use(express.json());     //this is 

// Allow only frontend on render
const allowedOrigins = ['https://food-delivery-app-frontend-vjx5.onrender.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


//db connection
connectDB();
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))

app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)

app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("hello world"); //show on browser if we hit the server
    //but we dont use browser to hit the server we use postman 
    //so on postman hit the server link ie http://localhost:4000/ and we see the response hello world
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
