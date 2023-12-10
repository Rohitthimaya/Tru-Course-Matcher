import jwt from "jsonwebtoken";
export const SECRET = "mYSuPerSecret";
import {Response, Request, NextFunction} from "express";

export const authenticateJwt = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, data) => {
            if(err){
                return res.status(403).json({ message: "Invalid Token!" });
            }

            if(!data){
                return res.status(403).json({ message: "Invalid Token!" });
            }

            if(typeof data === "string"){
                return res.status(403).json({ message: "Invalid Token!" });
            }

            req.headers["id"] = data.id;
            next();
        })
    }
}