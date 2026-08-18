import {test, expect} from "@playwright/test";
import { registerUser, UserData } from "../utils/user-api";



test("Registered user can log in through UI", async ({
  page,
  request,
}) => { 
   const uniqueIdentifier = Date.now();

const user: UserData = {
  username: `testUser${uniqueIdentifier}`,
  email: `testUser${uniqueIdentifier}@email.com`,
  password: "test123",
};

const registrationResponse = await registerUser(request, user);

  expect(registrationResponse.status()).toBe(201);

  await page.goto("/login");
  
  await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(
  page.getByRole("link", { name: "Your Feed", exact: true }),
).toBeVisible();


});