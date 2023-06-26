import { Request, Response, NextFunction } from "express";
import ApiError from "../exeptions/api.errors";
import AuthService from "../service/auth.service";
import { pool } from "../config/db.config";

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(ApiError.Conflict("Not all required fields are filled"));
      }
      const cadidate = await pool.query("SELECT id FROM users WHERE email=$1", [
        email,
      ]);
      if (cadidate.rowCount !== 0) {
        return next(ApiError.Conflict("User with this email is already exist"));
      }
      const newUser = await AuthService.singUpUser(email, password);
      return res.status(201).json(newUser);
    } catch (error: any) {
      next(error);
    }
  }

  async singIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(ApiError.Conflict("Not all required fields are filled"));
      }
      const loginUser = await AuthService.signInUser(email, password);
      return res.status(200).json(loginUser);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new AuthController();
