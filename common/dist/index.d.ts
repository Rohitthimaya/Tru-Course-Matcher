import z from 'zod';
export declare const userInputSchema: z.ZodObject<{
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
export type signUpParams = z.infer<typeof userInputSchema>;
