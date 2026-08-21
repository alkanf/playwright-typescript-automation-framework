import { test, expect } from "@playwright/test";
import { createArticle, ArticleData } from "../utils/article-api";
import {
  createComment,
  deleteComment,
  getComments,
} from "../utils/comment-api";
import { ArticleResponseSchema } from "../schemas/article.schema";
import {
  CommentResponseSchema,
  CommentsResponseSchema,
} from "../schemas/comment.schema";
import { loginUser, registerUser, UserData } from "../utils/user-api";
import { UserResponseSchema } from "../schemas/user.schema";

test("Authenticated user can create, read and delete a comment through the API", async ({
  request,
}) => {
  const uniqueIdentifier = Date.now();
  const user: UserData = {
    username: `commentUser${uniqueIdentifier}`,
    email: `commentUser${uniqueIdentifier}@email.com`,
    password: "test123",
  };
  const article: ArticleData = {
    title: `Comment smoke article ${uniqueIdentifier}`,
    description: "Article for comment smoke testing",
    body: "This article is used to verify comment operations.",
    tagList: ["smoke"],
  };
  const commentBody = `API smoke comment ${uniqueIdentifier}`;

  const registrationResponse = await registerUser(request, user);
  expect(registrationResponse.status()).toBe(201);

  const loginResponse = await loginUser(request, user.email, user.password);
  expect(loginResponse.status()).toBe(200);
  const loginBody = UserResponseSchema.parse(await loginResponse.json());
  const token = loginBody.user.token;

  const articleResponse = await createArticle(request, token, article);
  expect(articleResponse.status()).toBe(201);
  const articleBody = ArticleResponseSchema.parse(
    await articleResponse.json(),
  );
  const slug = articleBody.article.slug;

  const initialCommentsResponse = await getComments(request, token, slug);
  expect(initialCommentsResponse.status()).toBe(200);
  CommentsResponseSchema.parse(await initialCommentsResponse.json());

  const createCommentResponse = await createComment(
    request,
    token,
    slug,
    commentBody,
  );
  expect(createCommentResponse.status()).toBe(201);
  const createdComment = CommentResponseSchema.parse(
    await createCommentResponse.json(),
  );
  expect(createdComment.comment.body).toBe(commentBody);

  const commentsResponse = await getComments(request, token, slug);
  expect(commentsResponse.status()).toBe(200);
  const commentsBody = CommentsResponseSchema.parse(
    await commentsResponse.json(),
  );
  expect(
    commentsBody.comments.some((comment) => comment.id === createdComment.comment.id),
  ).toBe(true);

  const deleteCommentResponse = await deleteComment(
    request,
    token,
    slug,
    createdComment.comment.id,
  );
  expect(deleteCommentResponse.status()).toBe(204);
});
