import { test, expect } from "@playwright/test";

test("Registration API should return a 201 status code for successful registration", async ({
  request,
}) => {
  const uniqueIdentifier = Date.now(); // Generate a unique identifier based on the current timestamp
  const response = await request.post("users", {
    data: {
      user: {
        username: `testuser${uniqueIdentifier}`,
        email: `testuser${uniqueIdentifier}@example.com`,
        password: `securepassword${uniqueIdentifier}`,
      },
    },
  });

  expect(response.status()).toBe(201);
});


test('Registration with empty password should return 422 status code', async ({request}) => {
    const uniqueIdentifier = Date.now();
    const user = { data: { user: { username: `testuser${uniqueIdentifier}`, email: `testuser${uniqueIdentifier}@example.com`, password: `` } } };
    const response = await request.post('users', user);
    expect(response.status()).toBe(422);
    const responseBody = await response.json();
    console.log(responseBody);
});