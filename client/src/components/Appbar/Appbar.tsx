import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmailState } from "../../store/selectors/userEmail";
import { isUserLoading } from "../../store/selectors/isUserLoading";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { userState } from "../../store/atoms/user";

const Appbar = () => {
    const userEmail = useRecoilValue(userEmailState);
    const isLoading = useRecoilValue(isUserLoading);
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    // if (isLoading) {
    //     return <></>
    // }

    if (userEmail) {

        setUser({
            isLoading: false,
            userEmail: userEmail
        })

        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1
        }}>
            <div style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => {
                navigate("/")
            }}>
                <Typography variant={"h6"}>Tru Course Matcher</Typography>
            </div>

            <div style={{ display: "flex" }}>
                <div style={{ marginRight: 10, display: "flex" }}>
                    <div style={{ marginRight: 10 }}>
                        <Button
                            onClick={() => {
                                navigate("/addcourse")
                            }}
                        >Add course</Button>
                    </div>

                    <div style={{ marginRight: 10 }}>
                        <Button
                            onClick={() => {
                                navigate("/courses")
                            }}
                        >Courses</Button>
                    </div>

                    <div style={{ marginRight: 10 }}>
                        <Button
                            onClick={() => {
                                navigate("/matches")
                            }}
                        >Get Matches</Button>
                    </div>

                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("token", "");
                            setUser({
                                isLoading: false,
                                userEmail: null
                            })
                        }}
                    >Logout</Button>
                </div>
            </div>
        </div>
    } else {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1
        }}>
            <div style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => {
                navigate("/")
            }}>
                <Typography variant={"h6"}>Coursera</Typography>
            </div>


            <div style={{ display: "flex" }}>

                <div style={{ marginRight: 10 }}>
                    <Button
                        onClick={() => {
                            navigate("/Signup")
                        }}
                    >Sign Up</Button>
                </div>

                <div style={{ marginRight: 10 }}>
                    <Button
                        onClick={() => {
                            navigate("/Login")
                        }}
                    >Login</Button>
                </div>
            </div>
        </div>
    }
}

export default Appbar;