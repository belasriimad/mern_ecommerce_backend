import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';


export const auth = async (req, res, next) => {
    try {
        //get the token from the headers
        const token = await req.headers.authorization.split(" ")[1];
        //check if the tokens matches 
        const decodedToken = await jwt.verify(token, JWT_SECRET);
        //get logged in user
        const user = await decodedToken;
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({
            error: "Unauthenticated"
        });
    }
}