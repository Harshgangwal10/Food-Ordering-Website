import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import Stripe from 'stripe'


const stripe =new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order for frontend

const placeOrder =async (req,res) =>{

  const frontend_url = process.env.FRONTEND_URL?.split(",")[0] || "http://localhost:5173";
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ success: false, message: "Stripe is not configured on the server." });
  }
  if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
    return res.status(400).json({ success: false, message: "Your cart is empty." });
  }
  const newOrder =new orderModel({
    userId:req.userId,
    items:req.body.items,
    amount:req.body.amount,
    address:req.body.address
  })
  await newOrder.save();
  await userModel.findByIdAndUpdate(req.userId,{cartData:{}})
  req.app.get("io")?.to("admins").emit("order:created", newOrder)

  const line_items =req.body.items.map((item)=>({
    price_data:{
      currency:"inr",
      product_data:{
        name:item.name
      },
      unit_amount:item.price*100*80
    },
    quantity:item.quantity
  }))
  line_items.push({
    price_data:{
      currency:"inr",
      product_data:{
        name:"Delivery Charges"
      },
      unit_amount:2*100*80
    },
    quantity:1
  })

  const session =await stripe.checkout.sessions.create({
    line_items:line_items,
    mode:'payment',
    success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
  })

  res.json({success:true,session_url:session.url})
  
} catch (error) {
  console.error("Stripe checkout error:", error);
  const details = error.raw?.message || error.message;
  const errorType = error.type || error.name;
  const errorCode = error.code ? ` (${error.code})` : "";
  res.status(500).json({
    success: false,
    message: details && details !== "Error"
      ? details
      : `Payment setup failed: ${errorType}${errorCode}. Check the backend terminal for details.`
  });
}
}

const verifyOrder =async (req,res)=>{
  const {orderId,success} = req.body;
  try {
    if(success=="true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      res.json({success:true,message:"Paid"})
    }else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false ,message:"Not Paid"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
}

//user orders fro frontend

const userOrders =async (req,res) =>{
  try {
    const orders = await orderModel.find({userId:req.userId});
    res.json({success :true ,data:orders})
    
  } catch (error) {
    console.log(error);
    res.json({success:false ,message :"Error"})
    
  }
}

//listing orders fro admin pael

const listOrders =async (req,res)=>{
  try {
    const orders =await orderModel.find({});
    res.json({success:true,data:orders})
    
  } catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})    
  }
}

//api for updating order status

const updateStatus =async(req,res)=>{
try {
  const order = await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status},{new:true});
  const io = req.app.get("io");
  io?.to("admins").emit("order:updated", order);
  io?.to(`user:${order.userId}`).emit("order:updated", order);
  res.json({success:true,message:"Status Updated"})
  
} catch (error) {
  console.log(error);
  res.json({success:false ,message:"Error"})
}

}

export {placeOrder,verifyOrder, userOrders,listOrders,updateStatus}
