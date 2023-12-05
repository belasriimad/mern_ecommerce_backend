import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

const seedProducts = [
    {
        name: 'Iphone',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        qty: 30,
        price: 500,
        category: '65549ca522bb95036d6e0a30',
        image: 'https://cdn.pixabay.com/photo/2017/10/12/22/17/business-2846221_1280.jpg'
    },
    {
        name: 'Samsung',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        qty: 100,
        price: 800,
        category: '65549ca522bb95036d6e0a30',
        image: 'https://cdn.pixabay.com/photo/2015/01/20/13/13/samsung-605439_1280.jpg'
    },
    {
        name: 'Xiaomi',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        qty: 3,
        price: 400,
        category: '65549ca522bb95036d6e0a30',
        image: 'https://cdn.pixabay.com/photo/2020/03/09/08/44/redmi-note-8-4914990_1280.png'
    },
    {
        name: 'Huawei',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        qty: 8,
        price: 1000,
        category: '65549ca522bb95036d6e0a30',
        image: 'https://cdn.pixabay.com/photo/2017/08/11/14/19/honor-2631271_1280.jpg'
    },
    {
        name: 'LG',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        qty: 30,
        price: 900,
        category: '65549ca522bb95036d6e0a30',
        image: 'https://cdn.pixabay.com/photo/2017/11/12/09/27/google-2941935_1280.jpg'
    },
    {
        name: 'Lenovo',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        qty: 3,
        price: 800,
        category: '65549ca522bb95036d6e0a31',
        image: 'https://cdn.pixabay.com/photo/2016/11/28/01/34/laptop-1864126_1280.jpg'
    },
    {
        name: 'HP',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        qty: 12,
        price: 600,
        category: '65549ca522bb95036d6e0a31',
        image: 'https://cdn.pixabay.com/photo/2016/06/08/10/35/laptop-1443559_1280.jpg'
    },
    {
        name: 'DELL',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        qty: 10,
        price: 590,
        category: '65549ca522bb95036d6e0a31',
        image: 'https://cdn.pixabay.com/photo/2017/01/06/00/45/computer-1956711_1280.png'
    }
];

productRouter.post('/', async (req, res) => {
    try {
        const products = await Product.insertMany(seedProducts);
        return res.status(200).send(products);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message
        });
    }
});


productRouter.get('/', async(req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).send(products);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message
        })
    }
});


productRouter.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send({
                message: "The provided id is not valid!"
            });
        }
        const product = await Product.findById(id).populate('category').exec();
        return res.status(200).send(product);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message
        })
    }
});


productRouter.get('/category/:id', async(req, res) => {
    try {
        const { id } = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(500).send({
                message: "The provided id is not valid!"
            });
        }
        const products = await Product.find({category: id});
        return res.status(200).send(products);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message
        })
    }
});


export default productRouter;