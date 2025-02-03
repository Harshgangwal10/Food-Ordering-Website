import mongoose from "mongoose";

 export const connectDB =async()=>{
  await mongoose.connect('mongodb+srv://harsh:harsh@cluster0.3njhs.mongodb.net/food-del').then(()=>console.log("Db connected"));
}