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
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const course_1 = __importDefault(require("./routes/course"));
const index_1 = require("./db/index");
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/auth", auth_1.default);
app.use("/courses", course_1.default);
app.get("/me", middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.id;
    const user = yield index_1.User.findById(userId);
    if (!user) {
        return res.status(403).json({
            message: "User Doesnt Already Exist!"
        });
    }
    res.json({
        email: user.email
    });
}));
mongoose_1.default.connect('mongodb+srv://thimayarohit:Rohit2728@cluster0.ulnmn04.mongodb.net/compcourses', { dbName: "compcourses" });
app.listen(port, () => {
    console.log(`App Running on http://localhost:${port}`);
});
