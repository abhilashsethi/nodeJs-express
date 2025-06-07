import { uploadToCloudinary } from "../helper/cloudinaryHelper.js";
import Image from "../models/image.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const newImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    })

    await newImage.save();

    fs.unlinkSync(req.file.path);

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newImage,
    });

  } catch (error) {
    console.log("Error uploading image:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to upload image"
    });
  }
}

const fetchImagesController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    const sortObj = {}
    sortObj[sortBy] = sortOrder;
    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

    if (!images || images.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No images found"
      });
    }


    return res.status(200).json({
      success: true,
      currenrtPage: page,
      totalPages,
      totalImages,
      limit,
      message: "Images fetched successfully",
      images
    });

  } catch (error) {
    console.log("Error fetching images:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch images"
    });
  }
}

const deleteImageController = async (req, res) => {
  try {
    const getCurrentIdOfImageToBeDeleted = req.params.id;
    const userId = req.userInfo.userId;
    const image = await Image.findById(getCurrentIdOfImageToBeDeleted);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      });
    }

    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image"
      });
    }

    await cloudinary.uploader.destroy(image.publicId)
    await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully"
    });

  } catch (error) {
    console.log("Error deleting image:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete image"
    });

  }
}

export {
  uploadImage,
  fetchImagesController,
  deleteImageController
};