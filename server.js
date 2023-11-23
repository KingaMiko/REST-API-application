import app from "./app.js";

import { connectToMongo } from "#drivers/mongo.js";

async function startServer() {
  try {
    await connectToMongo();
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
