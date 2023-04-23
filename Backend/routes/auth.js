import express from "express";
import { signIn, signUp } from "../controllers/auth.js";

const router = express.Router();

router.post("/sign-up", signUp);

router.put("/sign-in", signIn);

export default router;
