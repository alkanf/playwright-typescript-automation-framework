import { test, expect } from "../fixtures/user.fixture";
import { HomePage } from "../pages/home-page";
import { LoginPage } from "../pages/login-page";
import { SettingsPage } from "../pages/settings-page";

test("Registered user can update the username through the UI", async ({
  page,
  registeredUser: user,
}) => {
  const updatedUsername = `updatedUser${Date.now()}`;
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);

  await loginPage.open();
  await loginPage.login(user.email, user.password);
  await expect(homePage.yourFeedLink).toBeVisible();

  await settingsPage.open();
  await settingsPage.updateUsername(updatedUsername);

  await expect(page.getByRole("link", { name: updatedUsername })).toBeVisible();
});

test("Anonymous user is redirected when opening settings", async ({ page }) => {
  const settingsPage = new SettingsPage(page);

  await settingsPage.open();

  await expect(page).toHaveURL(/\/login$/);
});