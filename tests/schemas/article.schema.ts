import { z } from "zod";

const ArticleAuthorSchema = z.object({
  username: z.string(),
  bio: z.string().nullable(),
  image: z.string().nullable(),
  following: z.boolean(),
});

export const ArticleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  body: z.string(),
  tagList: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  favorited: z.boolean(),
  favoritesCount: z.number(),
  author: ArticleAuthorSchema,
});

export const ArticleResponseSchema = z.object({
  article: ArticleSchema,
});

export const ArticleSummarySchema = ArticleSchema.omit({ body: true });

export const ArticleListResponseSchema = z.object({
  articles: z.array(ArticleSummarySchema),
  articlesCount: z.number(),
});

export type ArticleResponse = z.infer<typeof ArticleResponseSchema>;
export type ArticleListResponse = z.infer<typeof ArticleListResponseSchema>;
