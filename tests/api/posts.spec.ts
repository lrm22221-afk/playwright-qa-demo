import { test, expect } from '@playwright/test';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const isPost = (p: unknown): p is Post => {
  const o = p as Post;
  return (
    typeof o.id === 'number' &&
    typeof o.userId === 'number' &&
    typeof o.title === 'string' &&
    typeof o.body === 'string'
  );
};

test.describe('JSONPlaceholder API', () => {
  test('GET /posts/1 matches schema and is JSON', async ({ request }) => {
    const r = await request.get('/posts/1');
    expect(r.status()).toBe(200);
    expect(r.headers()['content-type']).toContain('application/json');
    expect(isPost(await r.json())).toBe(true);
  });

  for (const userId of [1, 5, 10]) {
    test(`GET /posts?userId=${userId} filters correctly`, async ({ request }) => {
      const b: Post[] = await (await request.get('/posts', { params: { userId } })).json();
      expect(b.length).toBeGreaterThan(0);
      for (const p of b) expect(p.userId).toBe(userId);
    });
  }

  test('POST /posts creates resource', async ({ request }) => {
    const r = await request.post('/posts', { data: { title: 'qa', body: 'portfolio', userId: 1 } });
    expect(r.status()).toBe(201);
    expect(await r.json()).toMatchObject({ title: 'qa', id: expect.any(Number) });
  });

  test('PUT /posts/1 replaces resource', async ({ request }) => {
    const r = await request.put('/posts/1', { data: { id: 1, title: 'updated', body: 'b', userId: 1 } });
    expect(r.ok()).toBeTruthy();
    expect(await r.json()).toMatchObject({ title: 'updated' });
  });

  test('DELETE /posts/1 succeeds', async ({ request }) => {
    expect((await request.delete('/posts/1')).status()).toBe(200);
  });

  test('GET unknown post returns 404', async ({ request }) => {
    expect((await request.get('/posts/99999')).status()).toBe(404);
  });
});
