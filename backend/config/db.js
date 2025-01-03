import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://kylelamo50:halabarca@cluster0.pyjli.mongodb.net/Food-App').then(()=>console.log(`MongoDB Connected`));

    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}