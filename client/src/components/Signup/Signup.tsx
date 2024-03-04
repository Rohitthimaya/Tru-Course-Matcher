import React, { useEffect, useState } from "react";
import {Appbar} from "../Appbar/Appbar";
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
    const [tId, setTruId] = useState("");
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    const adminEmail = import.meta.env.VITE_ADMINEMAIL;

    const handleSubmit = () => {
        // Your form submission logic here
        axios.post("http://localhost:3000/auth/signup", {
            firstName,
            lastName,
            email,
            password,
            tId,
            socialHandle
        }).then((res) => {
            const data = res.data;
            const token = data.token;
            localStorage.setItem("Token", token);

            setUser({
                isLoading: false,
                userEmail: email,
                isAdmin: email == adminEmail
            })

            // Reset form fields
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setSocialHandle("");
            setTruId("");

            navigate("/");
        }).catch((err) => {
            console.log(err);
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
                        Sign Up
                    </Typography>
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
                        label="Password (Min 6 and Max 30 size)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Tru Id"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={tId}
                        onChange={(e) => setTruId(e.target.value)}
                    />
                    <TextField
                        label="Social Handle"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={socialHandle}
                        onChange={(e) => setSocialHandle(e.target.value)}
                    />
                    <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
                        Sign Up
                    </Button>
                </Paper>
            </Container>
        </>
    );
};
