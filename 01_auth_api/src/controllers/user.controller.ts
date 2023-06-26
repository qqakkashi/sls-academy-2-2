import { Request, Response, NextFunction } from "express";
import UserService from "../service/user.service";

class UserController {
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userAccessToken = req.headers.authorization?.split(" ")[1]!;
      const dataAboutUser = await UserService.getCurrentUser(userAccessToken);
      console.log(dataAboutUser);
      return res.status(200).json(dataAboutUser);
    } catch (error: any) {
      next();
    }
  }
}

export default new UserController();
