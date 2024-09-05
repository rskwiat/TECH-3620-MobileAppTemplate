import { z } from 'zod';

export const RegisterUserSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }).min(3, {
    message: 'Name must be greater than 3 characters'
  }),
  email: z.string({
    required_error: "Email is required",
  }
  ).email({
    message: "Invalid email address"
  }),
  password: z.string({
    required_error: "Password is required",
  }).min(8,
    { message: "Must be 8 or more characters long" })
});

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;
