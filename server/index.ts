import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import courseRoutes from "./routes/course";
import { User } from "./db/index";
import cors from "cors";
import { authenticateJwt } from "./middleware";

require('dotenv').config();
// const dbUrl = process.env.DB_URL;

if (!dbUrl) {
    console.error("DB_URL is not defined in environment variables.");
    process.exit(1); // Exit the process if DB_URL is not defined
}

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);


app.get("/me", authenticateJwt, async (req, res) => {
    const userId = req.headers.id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(403).json({
            message: "User Doesnt Already Exist!"
        })
    }

    res.json({
        email: user.email
    })
})

mongoose.connect(dbUrl, {dbName: "compcourses"});

app.listen(port, () => {
    console.log(`App Running on http://localhost:${port}`);
})
