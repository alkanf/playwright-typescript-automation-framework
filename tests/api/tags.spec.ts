import { test, expect } from '@playwright/test';

interface TagsResponse {
  tags: string[];
}

test('GET tags returns a tags list', async ({ request }) => {
  const response = await request.get('tags');

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const responseBody = (await response.json()) as TagsResponse;
 
  console.log(responseBody.tags);
  expect(Array.isArray(responseBody.tags)).toBe(true);
  
});