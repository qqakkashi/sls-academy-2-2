import ApiError from "../exeptions/api.errors";
import { Request, Response, NextFunction } from "express";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ status: false, error: err.message });
  }
  return res.status(500).json({ message: "Unkown error" });
};
