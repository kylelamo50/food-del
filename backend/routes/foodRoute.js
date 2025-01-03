import express from 'express';
import { addFood,listFood,removeFood,updateFood} from '../controllers/foodController.js';
import multer from 'multer';


const foodRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${(file.originalname)}`);
    }
});

const upload = multer({storage:storage});


//add food item to database.**API endpoint**
foodRouter.post('/add',upload.single("image"),addFood);

foodRouter.get('/list',listFood);
foodRouter.post('/remove',removeFood);
foodRouter.post('/update',updateFood);

export default foodRouter;