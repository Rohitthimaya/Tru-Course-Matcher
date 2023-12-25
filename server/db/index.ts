import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const courseSchema = new mongoose.Schema({
    courseName: String,
    courseNum: Number,
    courseCrn: Number
})

export const User = mongoose.model('User', userSchema);
export const Course = mongoose.model('Course', courseSchema);