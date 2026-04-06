import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    slug: { type: String, required: true, unique: true },

    price: { type: Number, required: true },

    images: [{ type: String }],

    description: { type: String },

    features: [{ type: String }],

    category: { type: String },

    stock: { type: Number, default: 0 },

    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);