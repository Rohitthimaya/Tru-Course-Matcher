import React from "react";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../../store/selectors/userEmail";
import { isUserLoading } from "../../store/selectors/isUserLoading";

export const Landing = () => {
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoading);
    console.log(userEmail, userLoading)
    return (
        <>
            <h1>I am Landing Page</h1>
            {(!userLoading && !userEmail) ? (
                <h1>I will display Sign Up</h1>
            ) : (
                <h1>I will display Main</h1>
            )}

        </>
    )
}
