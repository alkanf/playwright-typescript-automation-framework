import { APIRequestContext, APIResponse } from "@playwright/test";
import { config } from "@config/environment";

const apiBaseUrl = config.apiBaseUrl;

export interface ArticleData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export async function createArticle(
  request: APIRequestContext,
  token: string,
  article: ArticleData,
): Promise<APIResponse> {
  return request.post(new URL("articles", apiBaseUrl).toString(), {
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      article,
    },
  });
}

export async function getArticle(
  request: APIRequestContext,
  token: string,
  slug: string,
): Promise<APIResponse> {
  return request.get(
    new URL(`articles/${encodeURIComponent(slug)}`, apiBaseUrl).toString(),
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
}

export async function listArticles(
  request: APIRequestContext,
  token: string,
): Promise<APIResponse> {
  return request.get(new URL("articles", apiBaseUrl).toString(), {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}

export async function getFeed(
  request: APIRequestContext,
  token: string,
): Promise<APIResponse> {
  return request.get(new URL("articles/feed", apiBaseUrl).toString(), {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}

export async function updateArticle(
  request: APIRequestContext,
  token: string,
  slug: string,
  article: ArticleData,
): Promise<APIResponse> {
  return request.put(
    new URL(`articles/${encodeURIComponent(slug)}`, apiBaseUrl).toString(),
    {
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        article,
      },
    },
  );
}

export async function deleteArticle(
  request: APIRequestContext,
  token: string,
  slug: string,
): Promise<APIResponse> {
  return request.delete(
    new URL(`articles/${encodeURIComponent(slug)}`, apiBaseUrl).toString(),
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
}

export async function favoriteArticle(
  request: APIRequestContext,
  token: string,
  slug: string,
): Promise<APIResponse> {
  return request.post(
    new URL(
      `articles/${encodeURIComponent(slug)}/favorite`,
      apiBaseUrl,
    ).toString(),
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
}

export async function unfavoriteArticle(
  request: APIRequestContext,
  token: string,
  slug: string,
): Promise<APIResponse> {
  return request.delete(
    new URL(
      `articles/${encodeURIComponent(slug)}/favorite`,
      apiBaseUrl,
    ).toString(),
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
}
