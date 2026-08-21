import { test, expect } from "@playwright/test";
import {
  createArticle,
  deleteArticle,
  favoriteArticle,
  getFeed,
  getArticle,
  listArticles,
  unfavoriteArticle,
  updateArticle,
  ArticleData,
} from "../utils/article-api";
import { loginUser, registerUser, UserData } from "../utils/user-api";
import {
  ArticleListResponseSchema,
  ArticleResponseSchema,
} from "../schemas/article.schema";
import { UserResponseSchema } from "../schemas/user.schema";

test("Authenticated user can create an article through the API", async ({
  request,
}) => {
  const uniqueIdentifier = Date.now();
  const user: UserData = {
    username: `testUser${uniqueIdentifier}`,
    email: `testUser${uniqueIdentifier}@email.com`,
    password: "test123",
  };
  const article: ArticleData = {
    title: `API smoke article ${uniqueIdentifier}`,
    description: "An article created by an API smoke test",
    body: "This article verifies the main API publishing flow.",
    tagList: ["smoke"],
  };

  const registrationResponse = await registerUser(request, user);
  expect(registrationResponse.status()).toBe(201);

  const loginResponse = await loginUser(request, user.email, user.password);
  expect(loginResponse.status()).toBe(200);
  const loginBody = UserResponseSchema.parse(await loginResponse.json());

  const articleResponse = await createArticle(
    request,
    loginBody.user.token,
    article,
  );

  expect(articleResponse.status()).toBe(201);

  const articleBody = ArticleResponseSchema.parse(
    await articleResponse.json(),
  );
  expect(articleBody.article.title).toBe(article.title);
  expect(articleBody.article.description).toBe(article.description);
  expect(articleBody.article.body).toBe(article.body);
});

test("Authenticated user can manage an article through the API", async ({
  request,
}) => {
  const uniqueIdentifier = Date.now();
  const user: UserData = {
    username: `articleOwner${uniqueIdentifier}`,
    email: `articleOwner${uniqueIdentifier}@email.com`,
    password: "test123",
  };
  const article: ArticleData = {
    title: `Lifecycle article ${uniqueIdentifier}`,
    description: "An article for lifecycle smoke testing",
    body: "Original article body.",
    tagList: ["smoke"],
  };
  const updatedArticle: ArticleData = {
    ...article,
    title: `Updated lifecycle article ${uniqueIdentifier}`,
    body: "Updated article body.",
  };

  const registrationResponse = await registerUser(request, user);
  expect(registrationResponse.status()).toBe(201);

  const loginResponse = await loginUser(request, user.email, user.password);
  expect(loginResponse.status()).toBe(200);
  const loginBody = UserResponseSchema.parse(await loginResponse.json());
  const token = loginBody.user.token;

  const createResponse = await createArticle(request, token, article);
  expect(createResponse.status()).toBe(201);
  const createdArticle = ArticleResponseSchema.parse(
    await createResponse.json(),
  );
  const slug = createdArticle.article.slug;

  const getResponse = await getArticle(request, token, slug);
  expect(getResponse.status()).toBe(200);
  const fetchedArticle = ArticleResponseSchema.parse(await getResponse.json());
  expect(fetchedArticle.article.title).toBe(article.title);

  const updateResponse = await updateArticle(
    request,
    token,
    slug,
    updatedArticle,
  );
  expect(updateResponse.status()).toBe(200);
  const updatedArticleResponse = ArticleResponseSchema.parse(
    await updateResponse.json(),
  );
  expect(updatedArticleResponse.article.title).toBe(updatedArticle.title);
  expect(updatedArticleResponse.article.body).toBe(updatedArticle.body);
  const updatedSlug = updatedArticleResponse.article.slug;

  const favoriteResponse = await favoriteArticle(request, token, updatedSlug);
  expect(favoriteResponse.status()).toBe(200);
  const favoritedArticle = ArticleResponseSchema.parse(
    await favoriteResponse.json(),
  );
  expect(favoritedArticle.article.favorited).toBe(true);

  const unfavoriteResponse = await unfavoriteArticle(
    request,
    token,
    updatedSlug,
  );
  expect(unfavoriteResponse.status()).toBe(200);
  const unfavoritedArticle = ArticleResponseSchema.parse(
    await unfavoriteResponse.json(),
  );
  expect(unfavoritedArticle.article.favorited).toBe(false);

  const deleteResponse = await deleteArticle(request, token, updatedSlug);
  expect(deleteResponse.status()).toBe(204);
});

test("Authenticated user can find an article in the list and feed", async ({
  request,
}) => {
  const uniqueIdentifier = Date.now();
  const user: UserData = {
    username: `feedUser${uniqueIdentifier}`,
    email: `feedUser${uniqueIdentifier}@email.com`,
    password: "test123",
  };
  const article: ArticleData = {
    title: `Feed article ${uniqueIdentifier}`,
    description: "An article for list and feed smoke testing",
    body: "This article verifies list and feed responses.",
    tagList: ["feed"],
  };

  const registrationResponse = await registerUser(request, user);
  expect(registrationResponse.status()).toBe(201);

  const loginResponse = await loginUser(request, user.email, user.password);
  expect(loginResponse.status()).toBe(200);
  const loginBody = UserResponseSchema.parse(await loginResponse.json());
  const token = loginBody.user.token;

  const createResponse = await createArticle(request, token, article);
  expect(createResponse.status()).toBe(201);
  const createdArticle = ArticleResponseSchema.parse(
    await createResponse.json(),
  );

  const listResponse = await listArticles(request, token);
  expect(listResponse.status()).toBe(200);
  const listBody = ArticleListResponseSchema.parse(await listResponse.json());
  expect(
    listBody.articles.some(
      (listedArticle) => listedArticle.slug === createdArticle.article.slug,
    ),
  ).toBe(true);

  const feedResponse = await getFeed(request, token);
  expect(feedResponse.status()).toBe(200);
  const feedBody = ArticleListResponseSchema.parse(await feedResponse.json());
  expect(feedBody.articlesCount).toBeGreaterThanOrEqual(0);
});
