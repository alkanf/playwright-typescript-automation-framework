import { test, expect } from "@playwright/test";
import {
  followUser,
  getCurrentUser,
  getProfile,
  unfollowUser,
} from "@utils/profile-api";
import { loginUser, registerUser, UserData } from "@utils/user-api";
import { ProfileResponseSchema } from "@schemas/profile.schema";
import { UserResponseSchema } from "@schemas/user.schema";

test("User can read profiles and follow or unfollow another user", async ({
  request,
}) => {
  const uniqueIdentifier = Date.now();
  const currentUser: UserData = {
    username: `currentUser${uniqueIdentifier}`,
    email: `currentUser${uniqueIdentifier}@email.com`,
    password: "test123",
  };
  const targetUsername = "johndoe";

  const currentUserRegistration = await registerUser(request, currentUser);
  expect(currentUserRegistration.status()).toBe(201);

  const currentUserLogin = await loginUser(
    request,
    currentUser.email,
    currentUser.password,
  );
  expect(currentUserLogin.status()).toBe(200);
  const currentUserLoginBody = UserResponseSchema.parse(
    await currentUserLogin.json(),
  );
  const currentUserToken = currentUserLoginBody.user.token;

  const currentUserResponse = await getCurrentUser(request, currentUserToken);
  expect(currentUserResponse.status()).toBe(200);
  const currentUserBody = UserResponseSchema.parse(
    await currentUserResponse.json(),
  );
  expect(currentUserBody.user.username).toBe(currentUser.username);

  const profileResponse = await getProfile(
    request,
    currentUserToken,
    targetUsername,
  );
  expect(profileResponse.status()).toBe(200);
  const profileBody = ProfileResponseSchema.parse(
    await profileResponse.json(),
  );
  expect(profileBody.profile.username).toBe(targetUsername);
  expect(profileBody.profile.following).toBe(false);

  const followResponse = await followUser(
    request,
    currentUserToken,
    targetUsername,
  );
  expect(followResponse.status()).toBe(200);
  const followedProfile = ProfileResponseSchema.parse(
    await followResponse.json(),
  );
  expect(followedProfile.profile.following).toBe(true);

  const unfollowResponse = await unfollowUser(
    request,
    currentUserToken,
    targetUsername,
  );
  expect(unfollowResponse.status()).toBe(200);
  const unfollowedProfile = ProfileResponseSchema.parse(
    await unfollowResponse.json(),
  );
  expect(unfollowedProfile.profile.following).toBe(false);
});
