import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmailState } from "../../store/selectors/userEmail";
import { isUserLoading } from "../../store/selectors/isUserLoading";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../Appbar/Appbar";
import { userState } from "../../store/atoms/user";
import { Button, Grid, Typography } from "@mui/material";

export const Landing = () => {
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoading);
    const navigate = useNavigate();

    console.log(userEmail, userLoading);

    if (userLoading) {
        return <>Loading....</>;
    }

    return (
        <div>
            {/* Title Section */}
            <Grid container style={{ padding: "5vw" }}>
                <Grid item xs={12} md={6} lg={6}>
                    <div style={{ marginTop: 100 }}>
                        <Typography variant={"h2"}>Tru Course Matcher</Typography>
                        {userLoading && !userEmail && (
                            <div style={{ display: "flex", marginTop: 20 }}>
                                <div style={{ marginRight: 10 }}>
                                    <Button
                                        size={"large"}
                                        variant={"contained"}
                                        onClick={() => {
                                            navigate("/signup");
                                        }}
                                    >
                                        Signup
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        size={"large"}
                                        variant={"contained"}
                                        onClick={() => {
                                            navigate("/login");
                                        }}
                                    >
                                        Signin
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        {/* Additional Content or Image Section */}
                        <Typography variant={"h5"}>Learn, Connect, Grow</Typography>
                        <img src={"/your-image.jpg"} alt="Illustration" width={"100%"} />
                    </div>
                </Grid>
            </Grid>

            {/* About Us Section */}
            <Grid container style={{ padding: "5vw" }}>
                <Grid item xs={12} md={6} lg={6}>
                    <div>
                        <Typography variant={"h3"}>About Us</Typography>
                        <Typography variant={"body1"}>
                            Welcome to Tru Course Matcher, your one-stop platform for learning and
                            connecting with others who share your educational interests.
                        </Typography>
                        {/* Additional About Us Content */}
                    </div>
                </Grid>
            </Grid>

            {/* Footer Section */}
            <Grid container style={{ padding: "5vw", backgroundColor: "#f0f0f0" }}>
                <Grid item xs={12}>
                    <div>
                        <Typography variant={"h5"}>Contact Us</Typography>
                        <Typography variant={"body1"}>Email: info@trucoursematcher.com</Typography>
                        {/* Additional Footer Content */}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};
