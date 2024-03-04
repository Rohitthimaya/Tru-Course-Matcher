import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/";
import { loginUserInputSchema, signupUserInputSchema } from "@thimayarohit/common";
import { SECRET, authenticateJwt } from "../middleware";

const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for hashing

// In the signup route
router.post("/signup", async (req, res) => {
    const reqBody = signupUserInputSchema.safeParse(req.body);

    if (!reqBody.success) {
        return res.status(403).json({
            message: "Invalid Input!"
        })
    }
    
    const { email, password, firstName, lastName, tId, socialHandle } = reqBody.data;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.findOne({ email });

    if (user) {
        return res.status(403).json({
            message: "User Already Exists!"
        })
    }

    const newUser = new User({ email, password: hashedPassword, firstName, lastName, socialHandle, tId });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "User Successfully Created!", token });
})

// In the login route
router.post("/login", async (req, res) => {
    const reqBody = loginUserInputSchema.safeParse(req.body);
    if (!reqBody.success) {
        return res.status(403).json({ message: "Invalid Inputs!" });
    }

    const { email, password } = reqBody.data;

    const user = await User.findOne({ email });
    if (user) {
        // Compare hashed password
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
            return res.status(200).json({ message: "Login Successfully!", token });
        }
    }

    return res.status(403).json({ message: "Invalid Credentials!" });
})


export default router;