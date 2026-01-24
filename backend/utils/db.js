import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MONGODB CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.error("MongoDB connection error:", error && error.message ? error.message : error);
        console.error(error);
        // rethrow so callers can handle or process can exit
        throw error;
    }
}

export default connectDB