import { Request, Response, NextFunction } from "express";
import ApiError from "../exeptions/api.errors";
import jwt from "jsonwebtoken";
import TokenService from "../service/token.service";

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return next(ApiError.UserUnathorizated("User unathorize: no access token"));
  }
  const access_token = authorizationHeader.split(" ")[1];
  if (!access_token) {
    return next(ApiError.UserUnathorizated("User unathorize: no access token"));
  }
  const verifyToken = TokenService.verifyToken(access_token);
  if (!verifyToken) {
    return next(
      ApiError.UserUnathorizated("User unathorize: access token invalid")
    );
  }
  next();
};
