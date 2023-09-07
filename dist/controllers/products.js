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
const Product = require("../models/Product");
const asyncWrapper = require("../middleware/async-wrapper");
const getProducts = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let products;
    if (req.query.category) {
        products = yield Product.find({ category: req.query.category });
    }
    else {
        products = yield Product.find();
    }
    res.status(200).json({ success: true, products: products });
}));
const getProduct = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield Product.findById({ _id: id });
    res.status(200).json({ success: true, product: product });
}));
const createProduct = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    console.log(req.user);
    const { title, image, options, description, category, price } = req.body;
    const product = yield Product.create({
        title,
        price,
        image,
        description,
        options,
        category
    });
    res.status(201).json({ success: true, product: product });
}));
const deleteProduct = asyncWrapper((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Product.findByIdAndDelete({ _id: id });
    res.status(204).json({ success: true });
}));
module.exports = { getProducts, getProduct, createProduct, deleteProduct };
