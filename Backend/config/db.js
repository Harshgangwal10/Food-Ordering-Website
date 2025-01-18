import mongoose from "mongoose";

 export const connectDB =async()=>{
  await mongoose.connect('mongodb+srv://foodApp:741852963@cluster0.dghm8.mongodb.net/food-ordering-website').then(()=>console.log("Db connected"));
}