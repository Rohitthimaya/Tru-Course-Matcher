"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInputSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const emailSchema = zod_1.default.string().email();
const passwordSchema = zod_1.default.string().min(6).max(30);
exports.userInputSchema = zod_1.default.object({
    email: emailSchema,
    password: passwordSchema
});
