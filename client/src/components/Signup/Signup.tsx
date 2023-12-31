import React, { useEffect, useState } from "react";
import AppBar from "../Appbar/Appbar";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../../store/atoms/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [socialHandle, setSocialHandle] = useState("");
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();

    const handleSubmit = () => {
        // Your form submission logic here
        axios.post("http://localhost:3000/auth/Signup", {
            firstName,
            lastName,
            email,
            password,
            socialHandle
        }).then((res) => {
            const data = res.data;
            const token = data.token
            localStorage.setItem("Token", token);
            navigate("/");
        }).catch((err) => {
            console.log(err);
        });

        // Reset form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setSocialHandle("");

        setUser({
            isLoading: false,
            userEmail: email
        })
    };

    return (
        <>
            <AppBar />
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
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
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
                        <TextField
                            label="Social Handle"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={socialHandle}
                            onChange={(e) => setSocialHandle(e.target.value)}
                        />
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            Sign Up
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
};
