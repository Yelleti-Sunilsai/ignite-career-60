import express from "express";

import {
    registerUser,
    loginUser,
    verifyOtp,
} from "../controllers/auth.controller";

import protect from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", registerUser);

router.post("/verify-otp", verifyOtp);

router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Protected profile route accessed",
    });
});

export default router;