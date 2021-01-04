const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String },
    type: { type: String },
    cost: { type: Number },
    description: { type: String },
    productId: { type: String },
  },
  { timestamps: true }
);

ProductSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;