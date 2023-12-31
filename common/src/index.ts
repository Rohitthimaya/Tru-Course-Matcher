import z from 'zod';

const emailSchema = z.string().email();
const passwordSchema = z.string().min(6).max(30);
const firstNameSchema = z.string();
const lastNameSchema = z.string();
const socialHandleSchema = z.string();

export const userInputSchema = z.object({
    email: emailSchema,
    password: passwordSchema ,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    socialHandle: socialHandleSchema
});


export type signUpParams = z.infer<typeof userInputSchema>;