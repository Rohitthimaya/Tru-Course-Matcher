import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import Appbar from "../Appbar/Appbar";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        alert("I am clicked");
        axios
            .post("http://localhost:3000/auth/login", {
                email,
                password,
            })
            .then((response) => {
                const data = response.data;
                const token = data.token;
                console.log(token);
                localStorage.setItem("Token", token);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Appbar />
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
