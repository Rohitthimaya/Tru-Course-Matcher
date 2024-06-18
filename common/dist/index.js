"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUserInputSchema = exports.loginUserInputSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const emailSchema = zod_1.default.string().email().refine((email) => email.endsWith('@mytru.ca'), {
    message: "Email must valid tru email",
});
const passwordSchema = zod_1.default.string().min(6).max(30);
const firstNameSchema = zod_1.default.string();
const lastNameSchema = zod_1.default.string();
const socialHandleSchema = zod_1.default.string();
const tIdSchema = zod_1.default.string();
exports.loginUserInputSchema = zod_1.default.object({
    email: emailSchema,
    password: passwordSchema
});
exports.signupUserInputSchema = zod_1.default.object({
    email: emailSchema,
    password: passwordSchema,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    socialHandle: socialHandleSchema,
    tId: tIdSchema
});
