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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNotEmail = (value: string) => {
  return !emailRegex.test(value);
};

export const registerUserSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required" })
      .nonempty({ message: "Username is required" })
      .refine(isNotEmail, { message: "Username cannot be an email address" }),
    email: z
      .string({ required_error: "Email is required" })
      .nonempty({ message: "Email is required" })
      .email({ message: "Invalid email format" }),
    password: z
      .string({ required_error: "Password is required" })
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
    // .regex(/[A-Z]/, {
    //   message: "Password must contain at least one uppercase letter",
    // })
    // .regex(/[a-z]/, {
    //   message: "Password must contain at least one lowercase letter",
    // })
    // .regex(/\d/, { message: "Password must contain at least one number" })
    // .regex(/[^A-Za-z0-9]/, {
    //   message: "Password must contain at least one special character",
    // }),,
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .nonempty({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
