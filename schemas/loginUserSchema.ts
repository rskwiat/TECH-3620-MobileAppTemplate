import { z } from 'zod';

export const LoginUser = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Must be 8 or more characters long" })
    .max(20)
});

export type LoginUserType = z.infer<typeof LoginUser>;
