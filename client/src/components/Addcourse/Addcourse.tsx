import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { isAdminState } from "../../store/selectors/isAdmin";
import { isUserLoading } from "../../store/selectors/isUserLoading";
import { Loading } from "../Loading/Loading";

export const Addcourse = () => {
    const [courseName, setCourseName] = useState("");
    const [courseNum, setCourseNum] = useState("");
    const [courseCrn, setCourseCrn] = useState("");
    const isAdmin = useRecoilValue(isAdminState);
    const isLoading = useRecoilValue(isUserLoading);
    const navigate = useNavigate();

    const [fileContent, setFileContent] = useState('');

    const handleFileButtonClick = async () => {
        try {
            const response = await axios.get('http://localhost:3000/read-file', {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("Token")
                }
            });
            setFileContent(response.data);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!isAdmin) {
        return <>{navigate("/login")}</>;
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        axios.post("http://localhost:3000/courses/admin-add-course", {
            "courseName": courseName,
            "courseNum": courseNum,
            "courseCrn": courseCrn
        },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("Token")
                }
            }).then((response) => {
                const data = response.data;
                alert("Course Added Successfully!");
                console.log(data);
            }).catch((err) => {
                console.log(err);
            });

        setCourseName("");
        setCourseNum("");
        setCourseCrn("");
    };

    return (
        <div>
            {/* Add Course Form */}
            <Grid container style={{ padding: "5vw" }}>
                <Grid item xs={12} md={6} lg={6}>
                    <div style={{ marginTop: 100 }}>
                        <Typography variant={"h2"}>Add Course</Typography>
                        <TextField
                            label="Course Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="courseName"
                            value={courseName}
                            onChange={(e) => { setCourseName(e.target.value) }}
                        />
                        <TextField
                            label="Course Number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="courseNum"
                            value={courseNum}
                            onChange={(e) => { setCourseNum(e.target.value) }}
                        />
                        <TextField
                            label="Course CRN"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="courseCrn"
                            value={courseCrn}
                            onChange={(e) => { setCourseCrn(e.target.value) }}
                        />
                        <div style={{ marginTop: 20 }}>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={handleSubmit}
                            >
                                Add Course
                            </Button>
                        </div>

                        <div>
                            <button onClick={handleFileButtonClick}>Read File</button>
                            <div>
                                <h3>File Content:</h3>
                                <pre>{fileContent}</pre>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};
