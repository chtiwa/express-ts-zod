"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order = require("../models/Order");
const asyncWrapper = require("../middleware/async-wrapper");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const getOrders = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { email } = req.params;
    const orders = yield Order.find({ userEmail: email });
    res.status(200).json({ success: true, orders: orders });
}));
const populateOrders = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // populate the products path which contains a product refrence
    const orders = yield Order.find().populate({
        path: "products",
        populate: {
            path: "product"
        }
    });
    res.status(200).json({ success: true, orders: orders });
}));
const createOrder = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, products, price, status } = req.body;
    const order = yield Order.create({
        userEmail,
        products,
        price,
        status
    });
    res.status(201).json({ success: true, order: order });
}));
const createIntent = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id } = req.params;
    const order = yield Order.findOne({ _id: order_id });
    if (order) {
        const paymentIntent = yield stripe.paymentIntents.create({
            // @ts-ignore
            amount: (order.price * 100).toFixed(0),
            currency: "usd",
            automatic_payment_methods: {
                enabled: true
            }
        });
        order.intent_id = paymentIntent.id;
        order.save();
        res.status(201).json({
            success: true,
            order: order,
            clientSecret: paymentIntent.client_secret
        });
    }
}));
const confirmOrder = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { intent_id } = req.params;
    console.log(intent_id);
    const order = yield Order.findOne({ intent_id: intent_id });
    order.isConfirmed = true;
    order.save();
    res.status(201).json({ success: true, order: order });
}));
module.exports = { getOrders, createOrder, createIntent, confirmOrder };
