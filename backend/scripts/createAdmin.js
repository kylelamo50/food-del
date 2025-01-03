import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import AdminModel from '../models/adminModel.js';
import 'dotenv/config.js';
//import { connectDB } from '../config/db.js';

// Connect to the database
//connectDB();

const createAdmin = async () => {
    try {
        const adminExists = await AdminModel.findOne({ email: 'admin@admin.com' });
        if (adminExists) {
            console.log('Admin user already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash('admin', 10);
        const admin = new AdminModel({
            name: 'admin',
            email: 'admin@admin.com',
            password: hashedPassword,
        });

        await admin.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

export {createAdmin};