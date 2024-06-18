import z from 'zod';

const emailSchema = z.string().email().refine((email) => email.endsWith('@mytru.ca'), {
    message: "Email must valid tru email",
  });
  
const passwordSchema = z.string().min(6).max(30);
const firstNameSchema = z.string();
const lastNameSchema = z.string();
const socialHandleSchema = z.string();
const tIdSchema = z.string();

export const loginUserInputSchema = z.object({
    email: emailSchema,
    password: passwordSchema
});

export const signupUserInputSchema = z.object({
    email: emailSchema,
    password: passwordSchema ,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    socialHandle: socialHandleSchema,
    tId: tIdSchema
});


export type signUpParams = z.infer<typeof signupUserInputSchema>;
export type loginParams = z.infer<typeof loginUserInputSchema>;