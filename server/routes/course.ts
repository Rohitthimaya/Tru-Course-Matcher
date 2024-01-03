import express from "express";
import { authenticateJwt } from "../middleware/index";
import { User, Course } from "../db";

const router = express.Router();

// Add a new course
router.post('/admin-add-course', authenticateJwt, async (req, res) => {
    try {
        const { courseNum, courseName, courseCrn } = req.body;

        const course = await Course.findOne({ courseCrn });

        if (course) {
            return res.status(201).send({ message: "Course Already Exists!" });
        }

        const newCourse = new Course({ courseName, courseNum, courseCrn });
        await newCourse.save();

        return res.status(200).send({ message: "Course Created!" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

// Select a course
router.post("/course", authenticateJwt, async (req, res) => {
    try {
        const { courseCrn } = req.body;
        const userId = req.headers.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: "User Not Found!" });
        }

        const course = await Course.findOne({ courseCrn });

        if (!course) {
            return res.status(404).send({ message: "Course Not Found!" });
        }

        if (user.courses.includes(course._id)) {
            return res.status(400).send({ message: "Course Already Added!" });
        }

        user.courses.push(course._id);
        await user.save();

        return res.status(200).send({ message: "Course Added!" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

// Get all user courses
router.get('/my-courses', authenticateJwt, async (req, res) => {
    try {
        const studentId = req.headers.id;
        const student = await User.findById(studentId).populate('courses');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.status(200).json({ courses: student.courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get matched courses and details of other students
router.get('/matched-courses', authenticateJwt, async (req, res) => {
    try {
        const studentId = req.headers.id;
        const student = await User.findById(studentId).populate('courses');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Find other students who have at least one common course
        const matchedStudents = await User.find({
            _id: { $ne: studentId }, // Exclude the current user
            courses: { $in: student.courses }, // At least one common course
        });

        const matchedStudentsDetails = matchedStudents.map(matchedStudent => ({
            _id: matchedStudent._id,
            username: matchedStudent.email,
        }));

        // Find and send the details of matched courses
        const matchedCourses = await Course.find({ _id: { $in: student.courses } });

        res.status(200).json({ matchedCourses, matchedStudents: matchedStudentsDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
