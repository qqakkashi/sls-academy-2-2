import { Request, Response } from "express";
import IpService from "../service/ip.service";

class IpController {
  async detectIp(req: Request, res: Response) {
    const userIp =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (userIp === undefined) {
      return res.status(404).json({
        error:
          "The server cannot get data about the IP of the computer that sent the request",
      });
    }
    const detectedIp = await IpService.detectIp(userIp);
    return res.status(200).json(detectedIp);
  }
}

export default new IpController();
