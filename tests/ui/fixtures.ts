import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

type Pages = { login: LoginPage; inventory: InventoryPage; checkout: CheckoutPage; loggedIn: InventoryPage };

export const test = base.extend<Pages>({
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventory: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  /** Fixture that starts the test already authenticated as standard_user. */
  loggedIn: async ({ page, login }, use) => {
    await login.goto();
    await login.login('standard_user');
    await page.waitForURL(/inventory\.html/);
    await use(new InventoryPage(page));
  },
});
export { expect } from '@playwright/test';
