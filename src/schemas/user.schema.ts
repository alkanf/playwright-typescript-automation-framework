import { z } from "zod";

export const UserResponseSchema = z.object({
  user: z.object({
    email: z.string(),
    token: z.string(),
    username: z.string(),
    bio: z.string().nullable(),
    image: z.string().nullable(),
  }),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
