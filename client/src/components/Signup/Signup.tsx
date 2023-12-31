import React, { useEffect, useState } from "react";
import AppBar from "../Appbar/Appbar";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../../store/atoms/user";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [socialHandle, setSocialHandle] = useState("");

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Your form submission logic here

        // Reset form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setSocialHandle("");
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
