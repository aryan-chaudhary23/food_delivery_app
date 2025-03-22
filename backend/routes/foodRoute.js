import express from 'express';
import { addFood,listFood,removeFood } from '../controllers/foodController.js';
import multer from 'multer'; //used to upload files

const foodRouter =express.Router();

const storage =multer.diskStorage({
    destination:"uploads", //all the files will be uploaded in the uploads folder
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`) //Date.now() is used to get the current date and time so we can set a unique file name for each upload
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood) //middleware is create whenever we add a food item first image will be uploaded then the food item will be added
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

export default foodRouter