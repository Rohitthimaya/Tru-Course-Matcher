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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db/");
const common_1 = require("@thimayarohit/common");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for hashing
// In the signup route
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = common_1.signupUserInputSchema.safeParse(req.body);
    if (!reqBody.success) {
        return res.status(403).json({
            message: "Invalid Input!"
        });
    }
    const { email, password, firstName, lastName, tId, socialHandle } = reqBody.data;
    // Hash the password
    const hashedPassword = yield bcrypt.hash(password, saltRounds);
    const user = yield db_1.User.findOne({ email });
    if (user) {
        return res.status(403).json({
            message: "User Already Exists!"
        });
    }
    const newUser = new db_1.User({ email, password: hashedPassword, firstName, lastName, socialHandle, tId });
    yield newUser.save();
    const token = jsonwebtoken_1.default.sign({ id: newUser._id }, middleware_1.SECRET, { expiresIn: "1h" });
    res.json({ message: "User Successfully Created!", token });
}));
// In the login route
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = common_1.loginUserInputSchema.safeParse(req.body);
    if (!reqBody.success) {
        return res.status(403).json({ message: "Invalid Inputs!" });
    }
    const { email, password } = reqBody.data;
    const user = yield db_1.User.findOne({ email });
    if (user) {
        // Compare hashed password
        const match = yield bcrypt.compare(password, user.password);
        if (match) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, middleware_1.SECRET, { expiresIn: "1h" });
            return res.status(200).json({ message: "Login Successfully!", token });
        }
    }
    return res.status(403).json({ message: "Invalid Credentials!" });
}));
exports.default = router;
