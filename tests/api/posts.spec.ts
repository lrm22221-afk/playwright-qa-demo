import { test, expect } from '@playwright/test';
test.describe('JSONPlaceholder API', () => {
  test('GET /posts/1 returns valid schema', async ({ request }) => {
    const r = await request.get('/posts/1');
    expect(r.status()).toBe(200);
    const b = await r.json();
    expect(b).toMatchObject({ id: 1, userId: expect.any(Number), title: expect.any(String), body: expect.any(String) });
  });
  test('GET /posts?userId=1 filters correctly', async ({ request }) => {
    const b = await (await request.get('/posts', { params: { userId: 1 } })).json();
    expect(b.length).toBeGreaterThan(0);
    for (const p of b) expect(p.userId).toBe(1);
  });
  test('POST /posts creates resource', async ({ request }) => {
    const r = await request.post('/posts', { data: { title: 'qa', body: 'portfolio', userId: 1 } });
    expect(r.status()).toBe(201);
    expect(await r.json()).toMatchObject({ title: 'qa', id: expect.any(Number) });
  });
  test('GET unknown post returns 404', async ({ request }) => {
    expect((await request.get('/posts/99999')).status()).toBe(404);
  });
});
