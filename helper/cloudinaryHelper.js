import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath)

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    }
  } catch (error) {
    console.log("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}

export {
  uploadToCloudinary
}