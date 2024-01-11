import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Course } from "../Courses/Courses";
import { isUserLoading } from "../../store/selectors/isUserLoading";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../store/atoms/user";
import { userEmailState } from "../../store/selectors/userEmail";
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { courseState } from "../../store/atoms/courses";


export const AddCourseUser = () => {
    // const [courses, setCourses] = useState<Course[]>([]);
    const [courses, setCourses] = useRecoilState(courseState);
    // const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [filterText, setFilterText] = useState<string>("");
    const setUser = useSetRecoilState(userState);
    const userEmail = useRecoilValue(userEmailState);
    const isLoading = useRecoilValue(isUserLoading)
    const navigate = useNavigate();

    useEffect(() => {
        if (userEmail) {
            axios.get("http://localhost:3000/courses/courses", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("Token"),
                },
            }).then((res) => {
                const data = res.data;
                setCourses({
                    isLoading: false,
                    courses: data.courses
                });
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setUser((prevUser) => ({
                    ...prevUser,
                    isLoading: false
                }));
            });
        }
    }, [userEmail, setUser]);

    const filterOptions = (inputValue: string) => {
        return courses && courses.courses?.filter(course =>
            course.courseName.toLowerCase().includes(inputValue.toLowerCase()) ||
            course.courseNum.toString().includes(inputValue) ||
            course.courseCrn.toString().includes(inputValue)
        );
    };

    const handleAddCourse = (course: Course) => {
        // Add your logic for handling the addition of the course
        console.log(`Added course: ${course.courseName}`);
        axios.post("http://localhost:3000/courses/course", {
            courseName: course.courseName,
            courseNum: course.courseNum,
            courseCrn: course.courseCrn
        },{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("Token")
            }
        }).then((response) => {
            const data = response.data;
            alert(data.message)
            return
        }).catch((err) => {
            console.log(err);
        })
    };

    if(isLoading){
        return(<><Loading /></>)
    }

    if (userEmail) {
        return (

            <div style={{ maxWidth: 800, margin: 'auto', padding: 20, border: '1px solid #ddd', borderRadius: 8, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Filter courses"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{ marginBottom: 16 }}
                />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Course Name</TableCell>
                                <TableCell>Course Number</TableCell>
                                <TableCell>Course CRN</TableCell>
                                <TableCell>Add</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterOptions(filterText)?.map(course => (
                                <TableRow key={course._id}>
                                    <TableCell>{course.courseName}</TableCell>
                                    <TableCell>{course.courseNum}</TableCell>
                                    <TableCell>{course.courseCrn}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleAddCourse(course)}
                                        >
                                            Add
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }else{
        return(<>{navigate("/login")}</>)
    }


};


// {selectedCourse && (
//     <div>
//         <p>Selected Course: {selectedCourse.courseName} - {selectedCourse.courseNum} - {selectedCourse.courseCrn}</p>
//         {/* Add button and other functionality here */}
//     </div>
// )}