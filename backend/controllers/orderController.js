import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order from frontend
const placeOrder = async (req, res) => {

    const frontentUrl="https://food-del-frontend-fpe3.onrender.com";
    try {
      
        const newOrder = new orderModel({
            userId:req.body.userId, //get from middleware// middle will decode token and attach userId to req.body
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}}); //clear cart after order is placed

        //payment gateway
        const line_items = req.body.items.map((item)=>({
            
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
    
        }));

        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2*100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items:line_items,
            mode: 'payment',
            success_url: `${frontentUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontentUrl}/verify?success=false&orderId=${newOrder._id}`,
        });
        res.json({ success: true,session_url:session.url });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error" });
    }
}

    const verifyOrder = async (req,res) => {

        if (req.body.sucess) {
            req.body.success = req.body.sucess;
            delete req.body.sucess;
        }
        const {orderId,success} = req.body;
       
        
        try {
            if(success=="true"){
              
                await orderModel.findByIdAndUpdate(orderId,{payment:true});
                res.json({success:true,message:"Order Paid Successfully"});
            }
            else{
                
                await orderModel.findByIdAndDelete(orderId)
                return res.json({success:false,message:"Order Faileddddd"});
                
            }
        } catch (error) {
            console.error('Error verifying order:', error);
            return res.status(500).json({ success: false, message: "Error" });
        }

    

}

//user orders for frontend

const userOrders=async (req,res)=>{

    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
        
    } catch (error) {
        console.error('Error getting user orders:', error);
        return res.status(500).json({ success: false, message: "Error" });
        
    }

}


//Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
        res.json({ success: true, data: orders });          //send all orders to frontend using api
    } catch (error) {
        console.error('Error listing orders:', error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

//api for updating order status
const updateOrderStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });   //update status in database
        res.json({ success: true, message: "Order Status Updated" });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateOrderStatus};

/*
const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    console.log(success);
    try {
        if(success==="true"){
            console.log("Order Paid Successfully");
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Order Paid Successfully"});
        }
        else{
            console.log(orderId);
            await orderModel.findByIdAndDelete(orderId)
            return res.json({success:false,message:"Order Faileddddd"});
            
        }
    } catch (error) {
        console.error('Error verifying order:', error);
        return res.status(500).json({ success: false, message: "Error" });
    }
        */
