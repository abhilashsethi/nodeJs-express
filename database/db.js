import mongoose from "mongoose";

const connectToDb = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongodb connected successfully");

  } catch (error) {
    console.log("Mongodb connection error:", error);
    process.exit(1)
  }
}
export default connectToDb;