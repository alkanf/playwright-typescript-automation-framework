import { test, expect } from '@playwright/test';
import { TagsResponseSchema } from "@schemas/tag.schema";

test('GET tags returns a tags list', async ({ request }) => {
  const response = await request.get('tags');

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const responseBody = TagsResponseSchema.parse(await response.json());

  expect(responseBody.tags.every((tag) => typeof tag === "string")).toBe(true);
  
});