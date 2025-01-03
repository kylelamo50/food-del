import jwt from 'jsonwebtoken';

const authMiddleware= async (req, res, next) => {
    
        const {token} = req.headers;  //headers are key value pairs that are sent with every request
        if (!token) {
            return res.status(401).json({success:false, message: 'Not Authorized Lamo' });
        }
    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id; // Attach userId to the request object
        next();
    } catch (error) {
        return res.status(401).json({ success:false,message: 'Not Authorized Lamo' });
    }
}

export default authMiddleware;


/*
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization; // Extract the Authorization header
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Not Authorized' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized' });
    }

    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = token_decoded.id; // Attach userId to the request object
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not Authorized' });
    }
}

export default authMiddleware;
*/