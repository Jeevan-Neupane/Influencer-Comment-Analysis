import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.DB_URI);
    console.log(
      `\n MongoDB connect !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("ERROR :MongoDB : db/Index.js", error);
    process.exit(1);
  }
};

export default connectDB;
