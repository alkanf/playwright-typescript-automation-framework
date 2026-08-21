import { test, expect } from "@playwright/test";
import { loginUser, registerUser, UserData } from "../utils/user-api";
import { UserResponseSchema } from "../schemas/user.schema";

test("Registered user can log in through the API", async ({ request }) => {
  const uniqueIdentifier = Date.now();
  const user: UserData = {
    username: `testUser${uniqueIdentifier}`,
    email: `testUser${uniqueIdentifier}@email.com`,
    password: "test123",
  };

  const registrationResponse = await registerUser(request, user);
  expect(registrationResponse.status()).toBe(201);

  const loginResponse = await loginUser(request, user.email, user.password);
  expect(loginResponse.status()).toBe(200);

  const responseBody = UserResponseSchema.parse(await loginResponse.json());
  expect(responseBody.user.email).toBe(user.email);
  expect(responseBody.user.token).toBeTruthy();
});

test("User cannot log in through the API with an incorrect password", async ({
  request,
}) => {
  const response = await loginUser(
    request,
    "unknown-user@email.com",
    "wrong-password",
  );

  expect(response.status()).toBe(401);
});