import { test, expect } from "@playwright/test";
import { UserResponseSchema } from "@schemas/user.schema";
import { loginUser, registerUser, updateUser, UserData } from "@utils/user-api";

test("Authenticated user can update their profile through the API", async ({
  request,
}) => {
  const uniqueIdentifier = Date.now();
  const user: UserData = {
    username: `updateUser${uniqueIdentifier}`,
    email: `updateUser${uniqueIdentifier}@email.com`,
    password: "test123",
  };
  const updatedUsername = `updatedUser${uniqueIdentifier}`;
  const updatedBio = "Updated by an API smoke test";

  const registrationResponse = await registerUser(request, user);
  expect(registrationResponse.status()).toBe(201);

  const loginResponse = await loginUser(request, user.email, user.password);
  expect(loginResponse.status()).toBe(200);
  const loginBody = UserResponseSchema.parse(await loginResponse.json());

  const updateResponse = await updateUser(request, loginBody.user.token, {
    username: updatedUsername,
    bio: updatedBio,
  });

  expect(updateResponse.status()).toBe(200);
  const updatedUser = UserResponseSchema.parse(await updateResponse.json());
  expect(updatedUser.user.username).toBe(updatedUsername);
  expect(updatedUser.user.email).toBe(user.email);
  expect(updatedUser.user.bio).toBe(updatedBio);
  expect(updatedUser.user.token).toBeTruthy();
});

test("User cannot update their profile with an invalid token", async ({
  request,
}) => {
  const updateResponse = await updateUser(request, "invalid-token", {
    username: "unauthorizedUser",
  });

  expect(updateResponse.status()).toBe(401);
});
