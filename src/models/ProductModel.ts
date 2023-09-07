import mongoose from "mongoose";

const productModel = new mongoose.Schema({
    name: String,
    createdAt: Date,
    status: String,
    registedBy: String,
    categorie: String,
})

const Product = mongoose.model('product', productModel);

export default Product;