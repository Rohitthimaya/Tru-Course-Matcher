import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmailState } from "../../store/selectors/userEmail";
import { isUserLoading } from "../../store/selectors/isUserLoading";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { userState } from "../../store/atoms/user";
import { isAdminState } from "../../store/selectors/isAdmin";
import { Loading } from "../Loading/Loading";

export const Appbar = () => {
    const userEmail = useRecoilValue(userEmailState);
    const isLoading = useRecoilValue(isUserLoading);
    const isAdmin = useRecoilValue(isAdminState);
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    if(isLoading){
        return(<><Loading /></>)
    }

    if (userEmail) {
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
                    {isAdmin && <div style={{ marginRight: 10 }}>
                        <Button
                            onClick={() => {
                                navigate("/addcourse")
                            }}
                        >Add course</Button>
                    </div>}

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
                        >Matches</Button>
                    </div>

                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("Token", "");
                            setUser({
                                isLoading: false,
                                userEmail: null,
                                isAdmin: false
                            })
                            navigate("/login")
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
                        variant={"contained"}
                        onClick={() => {
                            navigate("/signup")
                        }}
                    >Signup</Button>
                </div>
                <div>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate("/login")
                        }}
                    >Signin</Button>
                </div>
            </div>
        </div>
    }
}