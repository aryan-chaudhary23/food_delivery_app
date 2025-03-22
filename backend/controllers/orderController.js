import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for frontend
const placeOrder = async (req,res) =>{

    const frontend_url ="http://localhost:3000"
    try{
        const newOrder= new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        //after this clearing the cart for user
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
        //new creating logic for payment link using stripe
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"usd",
                product_data:{
                    name: item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data:{
                currency: "usd",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount: 2*100
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            //if payment is successfull we will be redirected to this page after payment
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({
            success: true,
            session_url: session.url
        })
    }catch(error){
        res.json({
            success: false,
            message: {error}
        })
    }
}

const verifyOrder = async (req,res)=>{
    const {orderId,success} =req.body;
    try{
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true, message: "Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success:false,
                message: "Not Paid"
            })
        }
    }
    catch(error){
        res.json({
            success: false,
            message: {error}
        })
    }
}

// user orders for frontend
const userOrders= async(req,res)=>{
    try{
        const orders =await orderModel.find({userId: req.body.userId})
        res.json({
            success:true,
            data:orders
        })
    }catch(error){
        res.json({
            success:true,
            message: {error}
        })
    }
}

//all orders for admin
const listOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({})
        res.json({
            success: true,
            data: orders
        })
    }catch(error){
        res.json({
            success: true,
            message: {error}
        })
    }
}

// update status controller
const updateStatus= async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({
            success:true,
            message:"Satus Updated"
        })
    }catch(error){
        res.json({
            success:false,
            message: {error}
        })
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}