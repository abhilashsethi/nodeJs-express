import mongoose, { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  inStock: Boolean,
  tags: [String],
})

const Product = model('Product', ProductSchema);
export default Product;