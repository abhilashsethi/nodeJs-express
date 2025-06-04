import mongoose, { Schema, model } from "mongoose";

const ImageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, {
  timestamps: true
})

const Image = model("Image", ImageSchema);
export default Image;