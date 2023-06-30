import { Router } from "express";
import LinkController from "../controllers/link.controller";

export const router = Router();

router.post("/shortlink", LinkController.shortLink);
router.get("*");
