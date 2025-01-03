import userModel from '../models/userModel.js';

//add items to user Cart
const addToCart = async (req, res) => {
    try {
        
        let userData = await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;  //cartData is an object with key as itemId and value as quantity

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]++;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:cartData});
        res.json({success:true,message:"Item added to cart successfully"});
        
    } catch (error) {
        return res.status(500).json({success:false, message: error.message });
    }
}

//remove items from user Cart

const removeFromCart = async (req, res) => {
    try {
        
        let userData = await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]--;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Item removed from cart successfully"});
        
    }catch (error) {
        return res.status(500).json({success:false, message:"Error" });
    }

  
}

//fetch user cart data

const getCart = async (req, res) => {
    try {
        
        let userData = await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({success:true,cartData});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message: "Error" });
    }
 
}

export { addToCart, removeFromCart, getCart };