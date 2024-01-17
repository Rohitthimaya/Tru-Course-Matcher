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

        const result = [];

        // Iterate through matched students to organize data
        for (const matchedStudent of matchedStudents) {
            const matchedCourses = await Course.find({
                _id: { $in: matchedStudent.courses },
            });

            const userMatchedData = {
                userId: matchedStudent._id,
                user: matchedStudent.firstName + " " + matchedStudent.lastName,
                email: matchedStudent.email,
                tId: matchedStudent.tId,
                courses: matchedCourses.map((course) => course), // Assuming there's a "name" property in the Course model
            };

            console.log(userMatchedData)

            result.push(userMatchedData);
        }

        res.status(200).json({ matchedData: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get all courses
router.get("/courses", authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    return res.json({ courses: courses });
})

// Delete course for users
router.delete("/course/:id", authenticateJwt, async (req, res) => {
    const courseId = req.params.id;
    const studentId = req.headers.id;
    const student = await User.findById(studentId)

    console.log("Student Courses: " + student?.courses);

    if (student?.courses) {
        student.courses = student.courses.filter(course => course.toString() !== courseId);
        await student.save();
    }
    return res.status(200).json({ message: `Course with id ${courseId} deleted! ${student?.courses}`, courses: student?.courses});
});


export default router;
