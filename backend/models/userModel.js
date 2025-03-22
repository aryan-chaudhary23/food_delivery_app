import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    cartData:{
        type: Object,
        default: {}
    }
},{minimize: false}); // minimize: false is used to store empty object in cartData without this it will not store empty object

const userModel =mongoose.model.user || mongoose.model("user",userSchema);
export default userModel;