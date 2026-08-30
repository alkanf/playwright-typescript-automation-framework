import { APIRequestContext, APIResponse } from "@playwright/test";

const apiBaseUrl = process.env.API_BASE_URL ?? "https://api.realworld.show/api/";

export async function getComments(
  request: APIRequestContext,
  token: string,
  slug: string,
): Promise<APIResponse> {
  return request.get(
    new URL(`articles/${encodeURIComponent(slug)}/comments`, apiBaseUrl).toString(),
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
}

export async function createComment(
  request: APIRequestContext,
  token: string,
  slug: string,
  body: string,
): Promise<APIResponse> {
  return request.post(
    new URL(`articles/${encodeURIComponent(slug)}/comments`, apiBaseUrl).toString(),
    {
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        comment: { body },
      },
    },
  );
}

export async function deleteComment(
  request: APIRequestContext,
  token: string,
  slug: string,
  commentId: number,
): Promise<APIResponse> {
  return request.delete(
    new URL(
      `articles/${encodeURIComponent(slug)}/comments/${commentId}`,
      apiBaseUrl,
    ).toString(),
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
}
