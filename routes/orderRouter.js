import express from 'express';
import Order from '../models/orderModel.js';
import { auth } from '../middlewares/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.post('/', auth, async (req, res) => {
    try {
        const { products } = req.body;
        const userId = req.user.userId;
        products.forEach(async (product) => {
            const order = new Order({
                user: userId,
                productName: product.name,
                qty: product.quantity,
                price: product.price,
                total: product.quantity * product.price
            });
            await order.save();
        });
        return res.status(200).send({
            message: 'Order paid successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message
        });
    }
});

orderRouter.get('/', auth, async(req, res) => {
    try {
        const orders = await Order.find({user: req.user.userId});
        return res.status(200).send(orders);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message
        })
    }
});

export default orderRouter;