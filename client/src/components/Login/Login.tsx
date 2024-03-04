import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import { Appbar } from "../Appbar/Appbar";
import { useSetRecoilState } from "recoil";
import { userState } from "../../store/atoms/user";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);
    const adminEmail = import.meta.env.VITE_ADMINEMAIL;

    const handleClick = () => {
        axios
            .post("http://localhost:3000/auth/login", {
                email,
                password,
            })
            .then((response) => {
                const data = response.data;
                const token = data.token;
                localStorage.setItem("Token", token);
                setUser({
                    isLoading: false,
                    userEmail: email,
                    isAdmin: email == adminEmail
                })
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                setIsError(true);
            });
    };

    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: "400px",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography variant="h5" align="center" gutterBottom>
                        Login
                    </Typography>
                    <div>
                        {isError && (
                            <Typography sx={{ color: "red", textAlign: "center", marginBottom: 2 }}>
                                Invalid Credentials
                            </Typography>
                        )}
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            onClick={handleClick}
                            variant="contained"
                            sx={{ mt: 2, backgroundColor: "#2E4AAE", color: "#fff" }}
                        >
                            Login
                        </Button>
                    </div>
                </Paper>
            </Container>
        </>
    );
};

export default Login;
