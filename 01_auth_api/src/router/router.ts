import { Router } from "express";
import AuthController from "../controllers/auth.controller";

export const router = Router();

router.post("/auth/sign-in", AuthController.singIn);
router.post("/auth/sign-up", AuthController.signUp);
router.get("/me");
