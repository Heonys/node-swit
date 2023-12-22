import express from "express";
import * as authController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

//signup
router.post("/signup", authController.signup);

// login
router.post("/login", authController.login);

//me
router.get("/me", isAuth, authController.me);

export default router;

//me
// router.post("/me", (req, res) => {
//   const token = req.header("myToken");
//   return jwt.verify(token, key, (err, decode) => {
//     if (err) {
//       return res.sendStatus(404);
//     }
//     return decode;
//   });
// });
