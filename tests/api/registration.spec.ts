import { test, expect } from "@playwright/test";
import { registerUser, UserData } from "../utils/user-api";

test("Registration API should return a 201 status code for successful registration", async ({
  request,
}) => {
  const uniqueIdentifier = Date.now(); // Generate a unique identifier based on the current timestamp
  const user : UserData = {
     username: `testUser${uniqueIdentifier}`,
  email: `testUser${uniqueIdentifier}@email.com`,
  password: "test123",
  };

const registrationResponse = await registerUser(request, user);


  expect(registrationResponse.status()).toBe(201);
});


test('Registration with empty password should return 422 status code', async ({request}) => {
    const uniqueIdentifier = Date.now();
 const user : UserData = {
     username: `testUser${uniqueIdentifier}`,
  email: `testUser${uniqueIdentifier}@email.com`,
  password: "",
  };  const registrationResponse = await registerUser(request, user);
    expect(registrationResponse.status()).toBe(422);
    const responseBody = await registrationResponse.json();
    console.log(responseBody);
});