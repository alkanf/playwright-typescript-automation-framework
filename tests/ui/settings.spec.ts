import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { LoginPage } from "../pages/login-page";
import { SettingsPage } from "../pages/settings-page";
import { loginUser, registerUser, UserData } from "../utils/user-api";

test("Registered user can update the username through the UI", async ({
  page,
  request,
}) => {
  const uniqueIdentifier = Date.now();
  const user: UserData = {
    username: `settingsUser${uniqueIdentifier}`,
    email: `settingsUser${uniqueIdentifier}@email.com`,
    password: "test123",
  };
  const updatedUsername = `updatedUser${uniqueIdentifier}`;
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);

  const registrationResponse = await registerUser(request, user);
  expect(registrationResponse.status()).toBe(201);

  await loginPage.open();
  await loginPage.login(user.email, user.password);
  await expect(homePage.yourFeedLink).toBeVisible();

  await settingsPage.open();
  await settingsPage.updateUsername(updatedUsername);

  await expect(page.getByRole("link", { name: updatedUsername })).toBeVisible();
});