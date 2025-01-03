import express from 'express';
import { addToCart,removeFromCart,getCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart);                            //token
cartRouter.post("/remove",authMiddleware,removeFromCart);                    //token
cartRouter.post("/get",authMiddleware,getCart);                              //token

export default cartRouter;