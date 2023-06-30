import { Request, Response, NextFunction } from "express";
import LinkService from "../service/link.service";
import ApiError from "../exeptions/api.errors";

class LinkController {
  async shortLink(req: Request, res: Response, next: NextFunction) {
    try {
      const link = req.body.link;
      if (!link) {
        return next(
          ApiError.BadRequest("The link to shortening is not provided")
        );
      }
      const shortedLink = await LinkService.shortLink(link);
      return res.status(201).json(shortedLink);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new LinkController();
