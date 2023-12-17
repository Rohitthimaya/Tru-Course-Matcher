"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../middleware/index");
const router = express_1.default.Router();
// Post a new course
router.post('/course', index_1.authenticateJwt, (req, res) => {
    const { courseNum, courseName, courseCrn } = req.body;
    const userId = req.headers["userId"];
    console.log(courseNum, courseName, courseCrn, userId);
});
// Get all my courses
// Matched courses
