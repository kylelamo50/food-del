import FoodModel from "../models/foodModel.js";
import fs from "fs";

//add food item
const addFood = async (req, res) => {

    let image_filename=`${req.file.filename}`;

    const food=new FoodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    });

    try{
        await food.save();
        res.status(201).json({success:true,message:"Food added successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
  
};

//all food list

const listFood = async (req, res) => {
    try {
        const foods = await FoodModel.find({});
        res.status(200).json({success:true,data:foods});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


//remove food

const removeFood = async (req, res) => {    
    try {
        const food = await FoodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
       
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        await FoodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


// update food item
const updateFood = async (req, res) => {
    try {
        const { id, name, description, price } = req.body;
        const food = await FoodModel.findById(id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        food.name = name || food.name;
        food.description = description || food.description;
        food.price = price || food.price;

        if (req.file) {
            // Remove old image
            fs.unlink(`./uploads/${food.image}`, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
            // Update with new image
            food.image = req.file.filename;
        }

        await food.save();
        res.status(200).json({ success: true, message: "Food updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

        

export { addFood,listFood,removeFood,updateFood}; 