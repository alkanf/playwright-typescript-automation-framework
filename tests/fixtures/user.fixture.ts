import { expect, test as base } from "@playwright/test";
import { registerUser, UserData } from "../utils/user-api";

interface UserFixtures {
  registeredUser: UserData;
}

export const test = base.extend<UserFixtures>({
  registeredUser: async ({ request }, use) => {
    const uniqueIdentifier = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const user: UserData = {
      username: `fixtureUser${uniqueIdentifier}`,
      email: `fixtureUser${uniqueIdentifier}@email.com`,
      password: "test123",
    };

    const registrationResponse = await registerUser(request, user);
    expect(registrationResponse.status()).toBe(201);

    await use(user);
  },
});

export { expect };
