import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    productName: {
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
    total: {
        type: Number,
        required: true
    },
    user: {type: Schema.Types.ObjectId, ref: 'users'}
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;