import React from "react";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../../store/selectors/userEmail";
import { isUserLoading } from "../../store/selectors/isUserLoading";
import {useNavigate} from "react-router-dom";
import Appbar from "../Appbar/Appbar";

export const Landing = () => {
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoading);
    const navigate = useNavigate();
    console.log(userEmail, userLoading)
    return (
        <>
            <Appbar />
            <h1>I am Landing Page</h1>
            {(userLoading && userEmail == null) ? (
                <h1>I will display Sign Up</h1>
            ) : (
                <h1>I will display Main</h1>
            )}


            <button onClick={() => {
                localStorage.removeItem("Token");
                navigate("/Login")
            }}>Sign Out</button>

        </>
    )
}
