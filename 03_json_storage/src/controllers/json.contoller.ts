import { Request, Response, NextFunction } from "express";
import JsonService from "../service/json.service";
import ApiError from "../exeptions/api.errors";

class JsonController {
  async putFile(req: Request, res: Response, next: NextFunction) {
    try {
      const url = req.originalUrl;
      const file = req.body;
      if (Object.keys(file).length === 0) {
        return next(ApiError.Conflict("No json file to save"));
      }
      const response = await JsonService.putNewJson(url, file);
      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new JsonController();
