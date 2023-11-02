import mongoose from "mongoose";

export const connectToMongo = async () => {
  const { DB_HOST: uriDb } = process.env;
  await mongoose.connect(uriDb);
};
