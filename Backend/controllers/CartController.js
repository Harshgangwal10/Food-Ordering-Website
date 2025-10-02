import e from "express";
import userModel from "../models/userModel.js";

// add to item to user

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    
    // Ensure cartData is initialized
    let cartData = { ...userData.cartData } || {};

    // Increment item quantity or initialize it
    cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

    // Update user data
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove items from user 

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);

    
    let cartData = { ...userData.cartData } || {};

   
    if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;

     
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }

  
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Removed from Cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

//fetchuser cart data

const getCart =async (req,res)=>{


  try{
    let userData =await userModel.findById(req.body.userId);
    let cartData =await userData.cartData;
    res.json({success:true,cartData});

  }catch(error){
   console.log(error)
    res.json({success:false,message:"Error"});
  }
}

export {addToCart,removeFromCart,getCart};
