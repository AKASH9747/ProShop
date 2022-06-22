import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://Akash1234:Akash1234@akashmedia.cxyfg.mongodb.net/proshop?retryWrites=true&w=majority`,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
