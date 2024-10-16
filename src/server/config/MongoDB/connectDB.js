import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB ✔');
  } catch (error) {
    throw new Error('MongoDB ❌', error);
  }
};

export default connectDB;
