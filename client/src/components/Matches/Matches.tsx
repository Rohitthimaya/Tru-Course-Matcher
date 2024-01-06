import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../../store/selectors/userEmail";
import { useNavigate } from "react-router-dom";
import { isUserLoading } from "../../store/selectors/isUserLoading";
import { Loading } from "../Loading/Loading"

export const Matches = () => {
    const userEmail = useRecoilValue(userEmailState);
    const isLoading = useRecoilValue(isUserLoading);
	const navigate = useNavigate();

	useEffect(() => {
        // I will get matches...
	}, [])

    if(isLoading){
        return(<><Loading /></>)
    }

    if(userEmail){
        return (
            <><h1>I am Matches Page...</h1></>
        )
    }else{
        return(<>{navigate("/login")}</>)
    }
}