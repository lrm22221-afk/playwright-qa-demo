import { test, expect } from './fixtures';
test.describe('Login', () => {
  test.beforeEach(async ({ login }) => { await login.goto(); });
  test('standard user logs in', async ({ login, page }) => {
    await login.login('standard_user');
    await expect(page).toHaveURL(/inventory\.html/);
  });
  test('locked out user sees error', async ({ login }) => {
    await login.login('locked_out_user');
    await expect(login.error).toContainText('locked out');
  });
  test('wrong password is rejected', async ({ login }) => {
    await login.login('standard_user', 'wrong');
    await expect(login.error).toContainText('do not match');
  });
  test('empty username is required', async ({ login }) => {
    await login.submit.click();
    await expect(login.error).toContainText('Username is required');
  });
});
