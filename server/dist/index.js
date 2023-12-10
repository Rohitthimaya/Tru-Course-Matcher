"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/auth", auth_1.default);
mongoose_1.default.connect('mongodb+srv://thimayarohit:Rohit2728@cluster0.ulnmn04.mongodb.net/compcourses', { dbName: "compcourses" });
app.listen(port, () => {
    console.log(`App Running on http://localhost:${port}`);
});
