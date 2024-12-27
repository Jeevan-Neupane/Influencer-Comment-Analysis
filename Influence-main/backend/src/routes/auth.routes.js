import { Router } from "express";
import { getUser, login, logout, signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();



router.post("/signup", signup)



router.post("/login", login)


router.post("/logout", logout)

router.get("/user", verifyToken, getUser)



export default router;