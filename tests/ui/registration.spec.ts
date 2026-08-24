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
  await expect(page.getByRole("link", { name: username, exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
});

test("User cannot register without a password", async ({ page }) => {
  const uniqueIdentifier = Date.now();
  const registrationPage = new RegistrationPage(page);

  await registrationPage.open();
  await registrationPage.usernameInput.fill(`invalidUser${uniqueIdentifier}`);
  await registrationPage.emailInput.fill(
    `invalidUser${uniqueIdentifier}@email.com`,
  );

  await expect(registrationPage.signUpButton).toBeVisible();
  await expect(registrationPage.signUpButton).toBeDisabled();
  await expect(page).toHaveURL(/\/register$/);
});
