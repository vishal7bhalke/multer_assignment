import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  coverPath: { type: String, required: true }, 
  imagePaths: { type: [String], required: true }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Item", itemSchema);
