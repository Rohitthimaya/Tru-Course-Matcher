import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userEmailState } from "../../store/selectors/userEmail";
import { coursesState } from "../../store/selectors/userCourses";
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
import {isCourseLoadingState} from "../../store/selectors/isCourseLoading";
import { Loading } from "../Loading/Loading";
import { courseState } from "../../store/atoms/courses";

// Define the type for the course
export interface Course {
  _id: string;
  courseName: string;
  courseNum: number;
  courseCrn: number;
  __v: number;
}

export const Courses = () => {
  const userEmail = useRecoilValue(userEmailState);
  const navigate = useNavigate();
  const setCourses = useSetRecoilState(courseState);
  const courses = useRecoilValue(coursesState);
  const setUser = useSetRecoilState(userState);
  const isLoading = useRecoilValue(isUserLoading);
  const isCourseLoading = useRecoilValue(isCourseLoadingState)


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
          setCourses({isLoading: false,courses:courses});
          console.log(courses);
        })
        .catch((err) => {
          console.log(err);
        }).finally(() => {

          setUser((prevUser) => ({
            ...prevUser,
            isLoading: false
          }))

        })
    }
  }, [Courses]);

  if(isLoading){
    return(<><Loading /></>)
  }

  if(isCourseLoading){
    return(<><Loading /></>)
  }

  const handleDelete = (courseId: string) => {
    // Implement your delete logic here
    axios.delete(`http://localhost:3000/courses/course/${courseId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      }
    }).then((response) => {
      axios
        .get("http://localhost:3000/courses/my-courses", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        })
        .then((response) => {
          const data = response.data;
          const courses: Course[] = data.courses;
          console.log(courses);
          setCourses({isLoading: false,courses:courses});
        })
        .catch((err) => {
          console.log(err);
        })
      // setCourses({isLoading: false, courses: courses});
    }).catch((err) => {
      console.log(err)
    })
  };

  const handleAddNewCourse = () => {
    // Implement your logic to navigate to the add new course page
    return(<>{navigate("/selectcourse")}</>)
  };

  if (userEmail) {
    console.log("Courses: " + courses);
    return (
      <Box textAlign="center">
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell>Course Name</TableCell>
                <TableCell>Course Number</TableCell>
                <TableCell>Course CRN</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses && courses.map((course) => (
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
  }else{
    return(<>{navigate("/login")}</>)
  }
};

