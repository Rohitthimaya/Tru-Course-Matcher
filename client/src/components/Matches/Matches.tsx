import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../../store/selectors/userEmail";
import { useNavigate } from "react-router-dom";

export const Matches = () => {
    const userEmail = useRecoilValue(userEmailState);
	const navigate = useNavigate();

	useEffect(() => {
		if(!userEmail){
			return navigate("/login");
		}
	}, [])

    if(userEmail){
        return (
            <h1>I am Matches Page...</h1>
        )
    }
}