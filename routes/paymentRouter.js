import express from 'express';
import stripe from 'stripe';

const Stripe = new stripe('sk_test_51C19VNGin0JfRTbQUGCWTkt3wehRnyqRirpbquWlxISCo4f1l9PraQSLxDPBopGEddgWfnam1PlQzBTkwUCP01xd00ptdFClHL');

const paymentRouter = express.Router();

paymentRouter.post('/pay', async (req, res) => {
    const { amount } = req.body;
    const paymentItent = await Stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true
        }
    });

    res.send({
        clientSecret: paymentItent.client_secret
    });
});

export default paymentRouter;