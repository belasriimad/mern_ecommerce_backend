import express from 'express';
import Category from '../models/categoryModel.js';

const categoryRouter = express.Router();

const seedCategories = [
    {
        name: 'Phones'
    },
    {
        name: 'Laptops'
    }
];

categoryRouter.post('/', async (req, res) => {
    try {
        const categories = await Category.insertMany(seedCategories);
        return res.status(200).send(categories);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message
        });
    }
});

categoryRouter.get('/', async(req, res) => {
    try {
        const categories = await Category.find({});
        return res.status(200).send(categories);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message
        })
    }
});

export default categoryRouter;