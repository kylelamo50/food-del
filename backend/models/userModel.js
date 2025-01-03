import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unqiue: true,
    },
    password: {
        type: String,
        required: true,
    },
        cartData: { type: Object, default: {}}
    },{minimize: false});

const UserModel =mongoose.models.user || mongoose.model('user', userSchema);
export default UserModel;