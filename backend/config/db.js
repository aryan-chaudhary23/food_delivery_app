import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://aryanchaudhary290:w6d7h5NekhR2ohXx@cluster0.ph41s.mongodb.net/food-del').then(()=> console.log("DB Connected")) // in the connection string at last after / we added the project name
}