import {test, expect} from "@playwright/test";
import { registerUser, UserData } from "../utils/user-api";
import { LoginPage } from "../pages/login-page";
import { HomePage } from "../pages/home-page";
import { SettingsPage } from "../pages/settings-page";



test("Registered user can log in through UI", async ({
  page,
  request,
}) => { 
   const uniqueIdentifier = Date.now();
   const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);

const user: UserData = {
  username: `testUser${uniqueIdentifier}`,
  email: `testUser${uniqueIdentifier}@email.com`,
  password: "test123",
};

const registrationResponse = await registerUser(request, user);

  expect(registrationResponse.status()).toBe(201);

  await loginPage.open();
  
  await loginPage.login(user.email, user.password);

  await expect(homePage.yourFeedLink).toBeVisible();

  await settingsPage.open();
  await settingsPage.logout();

  await expect(homePage.signInLink).toBeVisible();
});

test("User cannot log in with an incorrect password", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("unknown-user@email.com", "wrong-password");

  await expect(loginPage.signInButton).toBeVisible();
});