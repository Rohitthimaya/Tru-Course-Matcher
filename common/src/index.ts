import z from 'zod';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6).max(30);

export const userInputSchema = z.object({
    email: emailSchema,
    password: passwordSchema 
});

console.log("hi there");

export type signUpParams = z.infer<typeof userInputSchema>;