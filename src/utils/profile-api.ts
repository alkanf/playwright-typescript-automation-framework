import { APIRequestContext, APIResponse } from "@playwright/test";

const apiBaseUrl = process.env.API_BASE_URL ?? "https://api.realworld.show/api/";

export async function getCurrentUser(
  request: APIRequestContext,
  token: string,
): Promise<APIResponse> {
  return request.get(new URL("user", apiBaseUrl).toString(), {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}

export async function getProfile(
  request: APIRequestContext,
  token: string,
  username: string,
): Promise<APIResponse> {
  return request.get(
    new URL(`profiles/${encodeURIComponent(username)}`, apiBaseUrl).toString(),
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
}

export async function followUser(
  request: APIRequestContext,
  token: string,
  username: string,
): Promise<APIResponse> {
  return request.post(
    new URL(
      `profiles/${encodeURIComponent(username)}/follow`,
      apiBaseUrl,
    ).toString(),
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
}

export async function unfollowUser(
  request: APIRequestContext,
  token: string,
  username: string,
): Promise<APIResponse> {
  return request.delete(
    new URL(
      `profiles/${encodeURIComponent(username)}/follow`,
      apiBaseUrl,
    ).toString(),
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
}
