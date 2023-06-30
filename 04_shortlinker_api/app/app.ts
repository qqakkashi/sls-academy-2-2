import express, { Express } from "express";
import { router } from "../src/router/router";
import { ErrorMiddleware } from "../src/middleware/error.middleware";

const app: Express = express();

app.use(express.json());
app.use("/", router);
app.use(ErrorMiddleware);

export default app;
