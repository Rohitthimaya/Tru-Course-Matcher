import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../../store/selectors/userEmail";
import { useNavigate } from "react-router-dom";

export const Courses = () => {
	const userEmail = useRecoilValue(userEmailState);
	const navigate = useNavigate();

	useEffect(() => {
		if(!userEmail){
			return navigate("/login");
		}
	}, [])


	return (<>I am courses</>)

}
