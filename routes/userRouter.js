import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { JWT_SECRET } from '../config.js';
import { auth } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    try {
        const { username, email, password, address, city, zipCode} = req.body;
        //validate user data
        if(!username || !email || !password || !address || !city || !zipCode) {
            return res.status(422).send({
                error: "All the fields are required."
            });
        }
        //check if email already exists
        const exists = await User.findOne({email});
        if(exists) {
            return res.status(401).send({
                error: "Email already taken."
            });
        }
        //store user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
            address,
            city,
            zipCode
        });
        const createdUser = await user.save();
        if(createdUser) {
            return res.status(200).send({
                message: "User created successfully."
            });
        }else {
            return res.status(200).send({
                error: "Error creating user try again."
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: error.message
        });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const {  email, password } = req.body;
        //validate user data
        if(!email || !password) {
            return res.status(422).send({
                error: "All the fields are required."
            });
        }
        //check if email already exists
        const user = await User.findOne({email});
        if(user) {
            const passwordCheck = await bcrypt.compare(password, user.password);
            if(!passwordCheck) {
                return res.status(422).send({
                    error: "Invalid email or password."
                });
            }else {
                //create token
                const token = jwt.sign({userId: user._id}, 
                    JWT_SECRET, { expiresIn: "10d"});
                return res.status(200).send({
                    user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        address: user.address,
                        city: user.city,
                        zipCode: user.zipCode,
                    },
                    token
                });
            }
        }else {
            return res.status(422).send({
                error: "Invalid email or password."
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: error.message
        });
    }
});

userRouter.get('/user', auth, async(req, res) => {
    const user = await User.findById(req.user.userId);
    return res.status(200).send({
        user:  {
            _id: user._id,
            username: user.username,
            email: user.email,
            address: user.address,
            city: user.city,
            zipCode: user.zipCode,
        }
    });
});


export default userRouter;