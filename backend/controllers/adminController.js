
import AdminModel from "../models/adminModel.js"; // Corrected import
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await AdminModel.findOne({ email });  //check if user exists
        if (!admin) {
            return res.json({ success:false,message: "Admin Doesn't Exist" });
        }
        const match = await bcrypt.compare(password, admin.password);  //compare password
        if (!match) {
           
            return res.json({ success:false,message: "Invalid credentials",password:password,a:admin.password,match:match });
        }
        const token = createToken(admin._id);  //create token
        res.json({ success:true,token});  //send token to client
    }
    catch (error) {
        return res.status(500).json({ success:false,message: "Server Error" });
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

export {loginAdmin};

