import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState<String>("");
    const [password, setPassword] = useState<String>("");

    const handleClick = () => {
        axios.post("http://localhost:3000/auth/login", {
            email,
            password
        }).then((response) => {
            const data = response.data;
            const token = data.token;
            console.log(token)
            localStorage.setItem("Token", token);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            username: <input type="text" onChange={(e) => setEmail(e.target.value)}/>
            password: <input type="text" onChange={(e) => setPassword(e.target.value)}/>
            <input type="button" value="Submit" onClick={handleClick}/>
        </div>
    )
}

export default Login