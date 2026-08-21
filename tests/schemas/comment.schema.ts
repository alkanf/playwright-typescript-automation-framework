import { z } from "zod";

const CommentAuthorSchema = z.object({
  username: z.string(),
  bio: z.string().nullable(),
  image: z.string().nullable(),
  following: z.boolean(),
});

export const CommentResponseSchema = z.object({
  comment: z.object({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    body: z.string(),
    author: CommentAuthorSchema,
  }),
});

export const CommentsResponseSchema = z.object({
  comments: z.array(CommentResponseSchema.shape.comment),
});

export type CommentResponse = z.infer<typeof CommentResponseSchema>;
export type CommentsResponse = z.infer<typeof CommentsResponseSchema>;
