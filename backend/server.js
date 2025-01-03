import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';

import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import 'dotenv/config.js';
import { createAdmin } from './scripts/createAdmin.js'; // Import createAdmin function
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());


//db connection
connectDB().then(() => {
    // Create admin user if it doesn't exist
    createAdmin();
});

//api endpoint
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/admin",adminRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);



app.get('/', (req, res) => {
    res.status(200).send('API is running');
});

//listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//mongodb+srv://kylelamo50:halabarca@cluster0.pyjli.mongodb.net/?