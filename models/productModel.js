import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;