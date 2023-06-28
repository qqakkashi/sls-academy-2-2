import { Router } from "express";
import IpController from "../controllers/ip.controller";

export const router = Router();

router.get("/detect-ip", IpController.detectIp);
