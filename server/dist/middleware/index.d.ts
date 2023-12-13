export declare const SECRET = "mYSuPerSecret";
import { Response, Request, NextFunction } from "express";
export declare const authenticateJwt: (req: Request, res: Response, next: NextFunction) => void;
