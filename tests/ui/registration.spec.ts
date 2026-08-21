import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { RegistrationPage } from "../pages/registration-page";


test("User can register through the UI", async ({ page }) => {
  const uniqueIdentifier = Date.now();
  const username = `testUser${uniqueIdentifier}`;
  const email = `testUser${uniqueIdentifier}@email.com`;
  const password = "test123";
  const registrationPage = new RegistrationPage(page);
  const homePage = new HomePage(page);

  await registrationPage.open();
  await registrationPage.register(username, email, password);

  await expect(homePage.yourFeedLink).toBeVisible();
});
