import { test, expect } from "../fixtures/user.fixture";
import { registerUser, UserData } from "../utils/user-api";
import { LoginPage } from "../pages/login-page";
import { HomePage } from "../pages/home-page";
import { SettingsPage } from "../pages/settings-page";



test("Registered user can log in through UI", async ({
  page,
  registeredUser: user,
}) => {
   const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);

  await loginPage.open();
  
  await loginPage.login(user.email, user.password);

  await expect(homePage.yourFeedLink).toBeVisible();

  await settingsPage.open();
  await settingsPage.logout();

  await expect(homePage.signInLink).toBeVisible();
});

const invalidLoginCases = [
  {
    name: "an incorrect password",
    usernamePrefix: "invalidPasswordUser",
    emailPrefix: "invalidPasswordUser",
    password: "wrong-password",
    shouldRegister: true,
  },
  {
    name: "an unknown email",
    usernamePrefix: "unknownEmailUser",
    emailPrefix: "unknownEmailUser",
    password: "test123",
    shouldRegister: false,
  },
];

for (const loginCase of invalidLoginCases) {
  test(`User cannot log in with ${loginCase.name}`, async ({ page, request }) => {
    const uniqueIdentifier = Date.now();
    const user: UserData = {
      username: `${loginCase.usernamePrefix}${uniqueIdentifier}`,
      email: `${loginCase.emailPrefix}${uniqueIdentifier}@email.com`,
      password: "test123",
    };
    const loginPage = new LoginPage(page);

    if (loginCase.shouldRegister) {
      const registrationResponse = await registerUser(request, user);
      expect(registrationResponse.status()).toBe(201);
    }

    await loginPage.open();
    await loginPage.login(user.email, loginCase.password);

    await expect(loginPage.credentialsError).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });
}

test("User cannot log in with empty credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await expect(loginPage.signInButton).toBeVisible();
  await expect(loginPage.signInButton).toBeDisabled();
  await expect(page).toHaveURL(/\/login$/);
});