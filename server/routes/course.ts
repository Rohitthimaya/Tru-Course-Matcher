import express from "express";
import { authenticateJwt, SECRET } from "../middleware/index";

const router = express.Router();

// Post a new course
router.post('/course', authenticateJwt, (req, res) => {
    const { courseNum, courseName, courseCrn } = req.body;
    const userId = req.headers["userId"];
    console.log(courseNum, courseName, courseCrn, userId);
})

// Get all my courses

// Matched courses