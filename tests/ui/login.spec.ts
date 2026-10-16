import { test, expect } from './fixtures';
import { invalidLogins } from '../../data/users';

test.describe('Login @smoke', () => {
  test.beforeEach(async ({ login }) => {
    await login.goto();
  });

  test('standard user logs in', async ({ login, page }) => {
    await login.login('standard_user');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  for (const c of invalidLogins) {
    test(`rejects ${c.title}`, async ({ login }) => {
      await login.login(c.user, c.pass);
      await expect(login.error).toContainText(c.error);
    });
  }

  test('protected page redirects anonymous user', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page.locator('[data-test="error"]')).toContainText('only access');
  });
});
