import { z } from "zod";

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .nonempty({ message: "Email is required" })
    .email({ message: "Enter a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .nonempty({ message: "Password is required" }),
});
