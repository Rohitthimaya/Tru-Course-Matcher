"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    SocialHandle: String,
    courses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course' }],
});
const courseSchema = new mongoose_1.default.Schema({
    courseName: String,
    courseNum: Number,
    courseCrn: Number
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Course = mongoose_1.default.model('Course', courseSchema);
