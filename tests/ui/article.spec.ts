import { test, expect } from "@playwright/test";
import { registerUser, UserData } from "../utils/user-api";
import { ArticlePage } from "../pages/article-page";
import { LoginPage } from "../pages/login-page";
import { HomePage } from "../pages/home-page";

test("Registered user can create an article through the UI", async ({
  page,
  request,
}) => {
  const uniqueIdentifier = Date.now();
  const user: UserData = {
    username: `testUser${uniqueIdentifier}`,
    email: `testUser${uniqueIdentifier}@email.com`,
    password: "test123",
  };
  const articleTitle = `Smoke article ${uniqueIdentifier}`;
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const articlePage = new ArticlePage(page);

  const registrationResponse = await registerUser(request, user);
  expect(registrationResponse.status()).toBe(201);

  await loginPage.open();
  await loginPage.login(user.email, user.password);
  await expect(homePage.yourFeedLink).toBeVisible();

  await articlePage.openEditor();
  await articlePage.createArticle(
    articleTitle,
    "A smoke test article",
    "This article verifies the main publishing flow.",
    "smoke",
  );

  await expect(articlePage.articleTitle(articleTitle)).toBeVisible();
  await expect(page).toHaveURL(/\/article\/[^/]+$/);
  await expect(
    page.getByText("This article verifies the main publishing flow.", {
      exact: true,
    }),
  ).toBeVisible();
});

test("Registered user can add a comment through the UI", async ({
  page,
  request,
}) => {
  const uniqueIdentifier = Date.now();
  const user: UserData = {
    username: `commentUser${uniqueIdentifier}`,
    email: `commentUser${uniqueIdentifier}@email.com`,
    password: "test123",
  };
  const articleTitle = `Comment article ${uniqueIdentifier}`;
  const comment = `UI smoke comment ${uniqueIdentifier}`;
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const articlePage = new ArticlePage(page);

  const registrationResponse = await registerUser(request, user);
  expect(registrationResponse.status()).toBe(201);

  await loginPage.open();
  await loginPage.login(user.email, user.password);
  await expect(homePage.yourFeedLink).toBeVisible();

  await articlePage.openEditor();
  await articlePage.createArticle(
    articleTitle,
    "An article for UI comment testing",
    "This article verifies the comment flow.",
    "comment",
  );
  await expect(articlePage.articleTitle(articleTitle)).toBeVisible();

  await articlePage.addComment(comment);
  await expect(articlePage.commentBody(comment)).toBeVisible();
  await expect(articlePage.articleTitle(articleTitle)).toBeVisible();
});

test("Registered user can favorite and unfavorite an article through the UI", async ({
  page,
  request,
}) => {
  const uniqueIdentifier = Date.now();
  const user: UserData = {
    username: `favoriteUser${uniqueIdentifier}`,
    email: `favoriteUser${uniqueIdentifier}@email.com`,
    password: "test123",
  };
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const articlePage = new ArticlePage(page);

  const registrationResponse = await registerUser(request, user);
  expect(registrationResponse.status()).toBe(201);

  await loginPage.open();
  await loginPage.login(user.email, user.password);
  await expect(homePage.yourFeedLink).toBeVisible();

  await articlePage.openArticle("how-to-learn-javascript-efficiently");

  await articlePage.favorite();
  await expect(articlePage.unfavoriteArticleButton).toBeVisible();

  await articlePage.unfavorite();
  await expect(articlePage.favoriteArticleButton).toBeVisible();
});

test("User cannot publish an article without a title", async ({
  page,
  request,
}) => {
  const uniqueIdentifier = Date.now();
  const user: UserData = {
    username: `invalidArticleUser${uniqueIdentifier}`,
    email: `invalidArticleUser${uniqueIdentifier}@email.com`,
    password: "test123",
  };
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const articlePage = new ArticlePage(page);

  const registrationResponse = await registerUser(request, user);
  expect(registrationResponse.status()).toBe(201);

  await loginPage.open();
  await loginPage.login(user.email, user.password);
  await expect(homePage.yourFeedLink).toBeVisible();

  await articlePage.openEditor();
  await articlePage.descriptionInput.fill("Description without a title");
  await articlePage.bodyInput.fill("Article body without a title");

  await expect(articlePage.publishButton).toBeVisible();
  await articlePage.publishButton.click();
  await expect(page).toHaveURL(/\/editor$/);
  await expect(articlePage.articleTitle("Description without a title")).not.toBeVisible();
});

test("User cannot post an empty comment", async ({ page, request }) => {
  const uniqueIdentifier = Date.now();
  const user: UserData = {
    username: `emptyCommentUser${uniqueIdentifier}`,
    email: `emptyCommentUser${uniqueIdentifier}@email.com`,
    password: "test123",
  };
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const articlePage = new ArticlePage(page);

  const registrationResponse = await registerUser(request, user);
  expect(registrationResponse.status()).toBe(201);

  await loginPage.open();
  await loginPage.login(user.email, user.password);
  await expect(homePage.yourFeedLink).toBeVisible();

  await articlePage.openArticle("how-to-learn-javascript-efficiently");
  await expect(articlePage.postCommentButton).toBeVisible();
  await articlePage.postCommentButton.click();
  await expect(page).toHaveURL(/\/article\/how-to-learn-javascript-efficiently$/);
  await expect(articlePage.commentBody("UI empty comment should not be posted")).not.toBeVisible();
});
