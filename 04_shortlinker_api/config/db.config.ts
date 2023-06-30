import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const url = process.env.MONGO_DB_HOST!;
const dbName = process.env.MONGO_DB_DATABASE!;

export async function dbConnect() {
  try {
    const client = await MongoClient.connect(url);
    return client.db(dbName);
  } catch (error: any) {
    console.log("Error occurs while connection to MogoDB");
  }
}
