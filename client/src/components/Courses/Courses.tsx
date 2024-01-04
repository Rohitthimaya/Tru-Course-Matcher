import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmailState } from "../../store/selectors/userEmail";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { userState } from "../../store/atoms/user";
import { isUserLoading } from "../../store/selectors/isUserLoading";

// Define the type for the course
interface Course {
  _id: string;
  courseName: string;
  courseNum: number;
  courseCrn: number;
  __v: number;
}

export const Courses = () => {
  const userEmail = useRecoilValue(userEmailState);
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if(userEmail) {
      axios
        .get("http://localhost:3000/courses/my-courses", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        })
        .then((response) => {
          const data = response.data;
          const courses: Course[] = data.courses;
          setMyCourses(courses);
        })
        .catch((err) => {
          console.log(err);
        }).finally(() => {
          setUser((prevUser) => ({
            ...prevUser,
            isLoading: false
          }))
        })
    }else{
      return( navigate("/login"));
    }
  }, []);

  const handleDelete = (courseId: string) => {
    // Implement your delete logic here
    console.log(`Delete course with ID: ${courseId}`);
  };

  const handleAddNewCourse = () => {
    // Implement your logic to navigate to the add new course page
    console.log("Navigate to add new course page");
  };

  if (userEmail) {
    return (
      <Box textAlign="center">
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Course Number</TableCell>
                <TableCell>Course CRN</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myCourses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.courseNum}</TableCell>
                  <TableCell>{course.courseCrn}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(course._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: "20px" }}
          onClick={handleAddNewCourse}
        >
          Add New Course
        </Button>
      </Box>
    );
  }
};

