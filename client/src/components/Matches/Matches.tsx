import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../../store/selectors/userEmail";
import { useNavigate } from "react-router-dom";
import { isUserLoading } from "../../store/selectors/isUserLoading";
import { Loading } from "../Loading/Loading";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  TextField,
} from "@mui/material";

interface MatchedUserData {
  userId: string;
  user: string;
  email: string;
  tId: string;
  courses: {
    courseCrn: React.ReactNode;
    courseName: string;
  }[];
}

export const Matches: React.FC = () => {
  const userEmail = useRecoilValue(userEmailState);
  const isLoading = useRecoilValue(isUserLoading);
  const [matchedData, setMatchedData] = useState<MatchedUserData[]>([]);
  const [filter, setFilter] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses/matched-courses", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data.matchedData);
        setMatchedData(data.matchedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredData = matchedData.filter(
    (user) =>
      user.user.toLowerCase().includes(filter.toLowerCase()) ||
      user.courses.some((course) =>
        course.courseCrn?.toString().includes(filter)
      )
  );

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter(event.target.value);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (userEmail) {
    return (
      <div style={{ margin: "20px" }}>
        <TextField
          label="Filter by name or course CRN"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={handleFilterChange}
          style={{ marginBottom: "20px" }}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Tru ID</TableCell>
                <TableCell>Matched Courses</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.user}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.tId}</TableCell>
                  <TableCell>
                    <List>
                      {user.courses.map((course, index) => (
                        <ListItem
                          key={index}
                        >{`${course.courseName} (CRN: ${course.courseCrn})`}</ListItem>
                      ))}
                    </List>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <>{navigate("/login")}</>;
  }
};

export default Matches;
