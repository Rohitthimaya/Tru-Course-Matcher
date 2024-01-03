import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../Appbar/Appbar";
import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { isAdminState } from "../../store/selectors/isAdmin";

export const Addcourse = () => {
    const [courseName, setCourseName] = useState("");
    const [courseNum, setCourseNum] = useState("");
    const [courseCrn, setCourseCrn] = useState("");
    const isAdmin = useRecoilValue(isAdminState);

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
                alert("Course Added Successfully!")
                console.log(data)
            }).catch((err) => {
                console.log(err);
            })

        setCourseName("")
        setCourseNum("")
        setCourseCrn("")
    };

    if(!isAdmin){
        return <h1>Only For Admins</h1>
    }

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
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};
