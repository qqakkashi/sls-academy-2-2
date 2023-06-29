import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.DB_NAME);

const database = process.env.DB_NAME as string;
const username = process.env.DB_USERNAME as string;
const password = process.env.DB_PASSWORD as string;
const host = process.env.DB_HOST as string;
const dialect = process.env.DB_DIALECT as "postgres";

const sequelize = new Sequelize({
  database,
  username,
  password,
  host,
  dialect,
  define: { timestamps: false },
});

export default sequelize;
