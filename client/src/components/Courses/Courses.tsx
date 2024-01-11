import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
import { isCourseLoadingState } from "../../store/selectors/isCourseLoading";
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

const fetchCourses = async (
  setCourses: React.Dispatch<React.SetStateAction<any>>,
  setUser: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const response = await axios.get("http://localhost:3000/courses/my-courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    });

    const data = response.data;
    const courses: Course[] = data.courses;
    setCourses({ isLoading: false, courses: courses });
    console.log(courses);
  } catch (err) {
    console.log(err);
  } finally {
    setUser((prevUser: any) => ({
      ...prevUser,
      isLoading: false,
    }));
    setCourses((prevCourses: any) => ({
      ...prevCourses,
      isLoading: false,
    }));
  }
};

export const Courses = () => {
  const userEmail = useRecoilValue(userEmailState);
  const navigate = useNavigate();
  const setCourses = useSetRecoilState(courseState);
  const setUser = useSetRecoilState(userState);
  const isLoading = useRecoilValue(isUserLoading);
  const isCourseLoading = useRecoilValue(isCourseLoadingState);
  const courses = useRecoilValue(coursesState);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("Token") && userEmail) {
        try {
          await fetchCourses(setCourses, setUser);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      } else {
        navigate("/login");
      }
    };

    fetchData();
  }, [userEmail, setCourses, setUser, navigate]);

  if (!userEmail) {
    return null;
  }

  if (isLoading || isCourseLoading) {
    return <Loading />;
  }

  const handleDelete = (courseId: string) => {
    axios
      .delete(`http://localhost:3000/courses/course/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then(() => {
        fetchCourses(setCourses, setUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddNewCourse = () => {
    navigate("/selectcourse");
  };

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
            {courses &&
              courses.map((course) => (
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
};
