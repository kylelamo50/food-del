import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";


//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });  //check if user exists
        if (!user) {
            return res.json({ success:false,message: "User Doesn't Exist" });
        }
        const match = await bcrypt.compare(password, user.password);  //compare password
        if (!match) {
            return res.json({ success:false,message: "Invalid credentials" });
        }
        const token = createToken(user._id);  //create token
        res.json({ success:true,token});  //send token to client
    }
    catch (error) {
        return res.status(500).json({ success:false,message: "Server Error" });
    }
}

const createToken = (id) => { // a token is created when a user logs in successfully and is used to verfify a user's identity
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await UserModel.findOne({ email });  //check if user already exists
        if (exists) {
            return res.json({ success:false,message: "User already exists" });
        }
         //validate email format and strong password
        if(!validator.isEmail(email)){
            return res.json({ success:false,message: "Please enter a valid email" });
        }
        if(password.length < 8){
            return res.json({ success:false,message: "Password must be at least 8 characters" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const newUser = new UserModel({
            name:name,
            email:email,
            password: hashedPassword
        });
        const user= await newUser.save();  //save user in database
        const token = createToken(user._id);  //create token
        res.json({ success:true,token});  //send token to client

    }catch (error) {
            return res.status(500).json({ success:false,message: "Server Error" });
        }
}

export { loginUser, registerUser };