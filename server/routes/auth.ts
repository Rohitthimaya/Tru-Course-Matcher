import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/";
import { userInputSchema } from "@thimayarohit/common";
import { SECRET, authenticateJwt } from "../middleware";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const reqBody = userInputSchema.safeParse(req.body);
    if (!reqBody.success) {
        return res.status(403).json({
            message: "Invalid Input!"
        })
    }
    const email = reqBody.data.email;
    const password = reqBody.data.password;

    const user = await User.findOne({ email, password });

    if (user) {
        return res.status(403).json({
            message: "User Already Exist!"
        })
    }

    const newUser = new User({ email, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1h" });
    localStorage.setItem("access_token", token);
    res.json({ message: "User Succesfully Created!", token });
})

router.post("/login", async (req, res) => {
    const reqBody = userInputSchema.safeParse(req.body);
    if (!reqBody.success) {
        return res.status(403).json({ message: "Invalid Inputs!" });
    }

    const email = reqBody.data.email;
    const password = reqBody.data.password;

    const user = await User.findOne({ email, password });
    if (user) {
        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
        localStorage.setItem("access_token", token);
        res.status(200).json({ message: "Login Successfully!", token });
    } else {
        return res.status(403).json({ message: "Invalid Inputs!" });
    }
})

export default router;