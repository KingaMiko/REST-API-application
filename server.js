import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST: uriDb } = process.env;
const connection = mongoose.connect(uriDb);

async function startServer() {
  try {
    await connection;
    console.log("Database connection successful");
    app.listen(3000, function () {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (err) {
    console.log("Database connection failed, shutting down");
    console.error(err);
    process.exit(1);
  }
}

startServer();
