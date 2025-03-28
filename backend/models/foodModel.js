import mongoose from "mongoose";

const foodSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
})

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)
// this is done to avoid the error of model already exists
//ie. if model already exists it will use it otherwise new model will be created

export default foodModel;