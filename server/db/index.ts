import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    SocialHandle: String,
    tId: String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const courseSchema = new mongoose.Schema({
    courseName: String,
    courseNum: String,
    courseCrn: Number
})

export const User = mongoose.model('User', userSchema);
export const Course = mongoose.model('Course', courseSchema);