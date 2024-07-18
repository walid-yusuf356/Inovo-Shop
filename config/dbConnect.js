import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);

    const url = process.env.MONGO_URL;

    const connected = await mongoose.connect(url
    );
    console.log(`MongoDB Connected: ${connected.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
