import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is Running At Port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo DB connection Failed ", error);
  });
