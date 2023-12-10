import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);

mongoose.connect('mongodb+srv://thimayarohit:Rohit2728@cluster0.ulnmn04.mongodb.net/compcourses', {dbName: "compcourses"});

app.listen(port, () => {
    console.log(`App Running on http://localhost:${port}`);
})