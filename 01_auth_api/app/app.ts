import express, { Express } from "express";
import { ErrorMiddleware } from "../src/middleware/error.middleware";
import { router } from "../src/router/router";

const app: Express = express();

app.use(express.json());
app.use("/", router);
app.use(ErrorMiddleware);

export default app;
