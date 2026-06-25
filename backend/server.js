 


import "dotenv/config"; // Line 1 is critical!
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
const startServer = async () => {
  try {
    await connectDB();

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();








 