import {test, expect} from "@playwright/test";

test("Registered user can log in through UI", async ({
  page,
  request,
}) => { 
    const uniqueIdentifer = Date.now();
    
    const username = `testUser${uniqueIdentifer}`;
    const email = `testUser${uniqueIdentifer}@email.com`
    const password = `test123`;

  const registrationResponse = await request.post(
    "https://api.realworld.show/api/users",
    {
      data: {
        user: {
          username,
          email,
          password,
        },
      },
    },
  );

  expect(registrationResponse.status()).toBe(201);

  await page.goto("/login");
  
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(
  page.getByRole("link", { name: "Your Feed", exact: true }),
).toBeVisible();


});