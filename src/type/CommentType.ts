import { z } from "zod";

// Insurance Data Schema
export const commentDataSchema = z.object({
  comment: z
    .string({ required_error: "Comment is required" })
    .nonempty({ message: "Comment is required" }),
});
