import { z } from "zod";

export const ProfileResponseSchema = z.object({
  profile: z.object({
    username: z.string(),
    bio: z.string().nullable(),
    image: z.string().nullable(),
    following: z.boolean(),
  }),
});

export type ProfileResponse = z.infer<typeof ProfileResponseSchema>;
