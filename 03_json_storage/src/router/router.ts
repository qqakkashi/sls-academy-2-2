import { Router } from "express";
import JsonContoller from "../controllers/json.contoller";

export const router = Router();

router.put("*", JsonContoller.putFile);
router.get("*");
