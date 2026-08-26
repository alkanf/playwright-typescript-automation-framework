import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { LoginPage } from "../pages/login-page";
import { ProfilePage } from "../pages/profile-page";
import { registerUser, UserData } from "../utils/user-api";

test("Registered user can follow and unfollow a profile through the UI", async ({
  page,
  request,
}) => {
  const uniqueIdentifier = Date.now();
  const user: UserData = {
    username: `profileUser${uniqueIdentifier}`,
    email: `profileUser${uniqueIdentifier}@email.com`,
    password: "test123",
  };
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const profilePage = new ProfilePage(page);

  const registrationResponse = await registerUser(request, user);
  expect(registrationResponse.status()).toBe(201);

  await loginPage.open();
  await loginPage.login(user.email, user.password);
  await expect(homePage.yourFeedLink).toBeVisible();

  await profilePage.open("johndoe");
  await expect(profilePage.usernameHeading).toBeVisible();

  await profilePage.follow();
  await expect(profilePage.unfollowButton).toBeVisible();

  await profilePage.unfollow();
  await expect(profilePage.followButton).toBeVisible();
});

test("Anonymous user can view a profile but clicking follow redirects to login", async ({ page }) => {
  const profilePage = new ProfilePage(page);

  await profilePage.open("johndoe");

  await expect(page).toHaveURL(/\/profile\/johndoe$/);
  await expect(profilePage.usernameHeading).toBeVisible();

  await expect(profilePage.followButton).toBeVisible();

  await profilePage.follow();
  await expect(page).toHaveURL(/\/login/);

});
