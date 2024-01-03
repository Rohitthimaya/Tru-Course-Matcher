import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../../store/selectors/userEmail";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Courses = () => {
  const userEmail = useRecoilValue(userEmailState);
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState("");

  useEffect(() => {
    if (!userEmail) {
      return navigate("/login");
    } else {
      axios
        .get("http://localhost:3000/courses/my-courses", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        })
        .then((response) => {
          const data = response.data;
          const courses = data.courses;
          setMyCourses(courses);
          console.log(myCourses);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userEmail]); // Include userEmail in the dependency array

  return <>I will display courses</>;
};
