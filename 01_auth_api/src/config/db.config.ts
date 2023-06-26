import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/./../../../.env" });

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  database: process.env.DB_DATABASE,
});
