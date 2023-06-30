import app from "./app";
import dotenv from "dotenv";
import { dbConnect } from "../config/db.config";

dotenv.config();

const port = process.env.PORT || 5000;

async function init() {
  try {
    const db = await dbConnect();

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error: any) {
    console.log(error);
  }
}

init();
