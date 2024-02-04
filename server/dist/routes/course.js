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
const fs = require('fs');
const path = require('path');
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
        return res.status(200).json({ courses: student.courses });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
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
        const result = [];
        // Iterate through matched students to organize data
        for (const matchedStudent of matchedStudents) {
            // Find the common course IDs between the current student and matched student
            const commonCourseIds = student.courses.filter(courseId => 
            // console.log("Id: " + courseId._id)
            matchedStudent.courses.includes(courseId._id));
            // Fetch the common courses using the common IDs
            const matchedCourses = yield db_1.Course.find({
                _id: { $in: commonCourseIds },
            });
            const userMatchedData = {
                userId: matchedStudent._id,
                user: matchedStudent.firstName + " " + matchedStudent.lastName,
                email: matchedStudent.email,
                tId: matchedStudent.tId,
                courses: matchedCourses.map((course) => course), // Assuming there's a "name" property in the Course model
            };
            result.push(userMatchedData);
        }
        res.status(200).json({ matchedData: result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Get all courses
router.get("/courses", index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield db_1.Course.find({});
    return res.json({ courses: courses });
}));
// Delete course for users
router.delete("/course/:id", index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    const studentId = req.headers.id;
    const student = yield db_1.User.findById(studentId);
    console.log("Student Courses: " + (student === null || student === void 0 ? void 0 : student.courses));
    if (student === null || student === void 0 ? void 0 : student.courses) {
        student.courses = student.courses.filter(course => course.toString() !== courseId);
        yield student.save();
    }
    return res.status(200).json({ message: `Course with id ${courseId} deleted! ${student === null || student === void 0 ? void 0 : student.courses}`, courses: student === null || student === void 0 ? void 0 : student.courses });
}));
router.get('/read-file', (req, res) => {
    const filePath = path.join("C:/Users/thima/Tru-Course-Matcher/server/routes/file.txt"); // Adjust the file name
    console.log(filePath);
    try {
        if (fs.existsSync("C:/Users/thima/Tru-Course-Matcher/server/routes/file.txt")) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            console.log(fileContent);
            res.send(fileContent);
        }
        else {
            res.status(404).send({ error: 'File not found' });
        }
    }
    catch (error) {
        res.status(500).send({ error: 'Error reading file' });
    }
});
exports.default = router;
