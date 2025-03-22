import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item
const addFood= async(req,res)=>{
    let image_filename= `${req.file.filename}`;
    const food =new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })
    try{
        await food.save();
        res.json({
            success:true,
            message:"Food Added"
        })
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:"Failed to add food"
        })
        //if food is not added successfully then delete the image
    }
}

const listFood= async(req,res)=>{
    try{
        const food = await foodModel.find({}); //by this way we can fetch all the food items
        res.json({
            success:true,
            data:food
        })
    } catch(error){
        console.log(error)
        res.json({
            success:false,
            message:"Failed to fetch food"
        })
    }
}

const removeFood =async(req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{}) //delete the image from the uploads folder
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success:true,
            message:"Food Deleted"
        })
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:"Failed to delete food"
        })
    }
}
export {addFood,listFood,removeFood}