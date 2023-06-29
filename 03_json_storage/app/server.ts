import app from "./app";
import dotenv from "dotenv";
import sequelize from "../models/index";

dotenv.config();

const port = process.env.PORT || 5000;

async function init() {
  try {
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("error occurs with db connection: ", error);
  }
}

init();
