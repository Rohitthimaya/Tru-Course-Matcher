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
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = common_1.userInputSchema.safeParse(req.body);
    if (!reqBody.success) {
        return res.status(403).json({
            message: "Invalid Input!"
        });
    }
    const email = reqBody.data.email;
    const password = reqBody.data.password;
    const firstName = reqBody.data.firstName;
    const lastName = reqBody.data.lastName;
    const socialHandle = reqBody.data.socialHandle;
    const user = yield db_1.User.findOne({ email, password, firstName, lastName, socialHandle });
    if (user) {
        return res.status(403).json({
            message: "User Already Exist!"
        });
    }
    const newUser = new db_1.User({ email, password });
    yield newUser.save();
    const token = jsonwebtoken_1.default.sign({ id: newUser._id }, middleware_1.SECRET, { expiresIn: "1h" });
    localStorage.setItem("Token", token);
    res.json({ message: "User Succesfully Created!", token });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = common_1.userInputSchema.safeParse(req.body);
    if (!reqBody.success) {
        return res.status(403).json({ message: "Invalid Inputs!" });
    }
    const email = reqBody.data.email;
    const password = reqBody.data.password;
    const user = yield db_1.User.findOne({ email, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, middleware_1.SECRET, { expiresIn: "1h" });
        // localStorage.setItem("Token", token);
        res.status(200).json({ message: "Login Successfully!", token });
    }
    else {
        return res.status(403).json({ message: "Invalid Inputs!" });
    }
}));
exports.default = router;
