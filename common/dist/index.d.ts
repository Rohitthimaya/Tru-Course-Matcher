import z from 'zod';
export declare const loginUserInputSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const signupUserInputSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    socialHandle: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    socialHandle: string;
}, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    socialHandle: string;
}>;
export type signUpParams = z.infer<typeof signupUserInputSchema>;
export type loginParams = z.infer<typeof loginUserInputSchema>;
