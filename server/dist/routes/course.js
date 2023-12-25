"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../middleware/index");
const db_1 = require("../db");
const router = express_1.default.Router();
// Add a new course
router.post('/admin-add-course', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseNum, courseName, courseCrn } = req.body;
        const course = yield db_1.Course.findOne({ courseCrn });
        if (course) {
            return res.status(201).send({ message: "Course Already Exists!" });
        }
        const newCourse = new db_1.Course({ courseName, courseNum, courseCrn });
        yield newCourse.save();
        return res.status(200).send({ message: "Course Created!" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}));
// Select a course
router.post("/course", index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseCrn } = req.body;
        const userId = req.headers.id;
        const user = yield db_1.User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User Not Found!" });
        }
        const course = yield db_1.Course.findOne({ courseCrn });
        if (!course) {
            return res.status(404).send({ message: "Course Not Found!" });
        }
        if (user.courses.includes(course._id)) {
            return res.status(400).send({ message: "Course Already Added!" });
        }
        user.courses.push(course._id);
        yield user.save();
        return res.status(200).send({ message: "Course Added!" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}));
// Get all user courses
router.get('/my-courses', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.headers.id;
        const student = yield db_1.User.findById(studentId).populate('courses');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ courses: student.courses });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Get matched courses and details of other students
router.get('/matched-courses', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.headers.id;
        const student = yield db_1.User.findById(studentId).populate('courses');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        // Find other students who have at least one common course
        const matchedStudents = yield db_1.User.find({
            _id: { $ne: studentId }, // Exclude the current user
            courses: { $in: student.courses }, // At least one common course
        });
        const matchedStudentsDetails = matchedStudents.map(matchedStudent => ({
            _id: matchedStudent._id,
            username: matchedStudent.email,
        }));
        // Find and send the details of matched courses
        const matchedCourses = yield db_1.Course.find({ _id: { $in: student.courses } });
        res.status(200).json({ matchedCourses, matchedStudents: matchedStudentsDetails });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
