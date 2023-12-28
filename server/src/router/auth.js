import express from "express";
import * as authController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

//signup
router.post("/signup", authController.signup);

// login
router.post("/login", authController.login);

// logout
router.post("/logout", authController.logout);

//me
router.get("/me", isAuth, authController.me);

router.get("/csrf-token", authController.csrfToken);

export default router;
