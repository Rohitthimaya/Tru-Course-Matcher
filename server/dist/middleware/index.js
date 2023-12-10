"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET = "mYSuPerSecret";
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, data) => {
            if (err) {
                return res.status(403).json({ message: "Invalid Token!" });
            }
            if (!data) {
                return res.status(403).json({ message: "Invalid Token!" });
            }
            if (typeof data === "string") {
                return res.status(403).json({ message: "Invalid Token!" });
            }
            req.headers["id"] = data.id;
            next();
        });
    }
};
exports.authenticateJwt = authenticateJwt;
