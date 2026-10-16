import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
export const test = base.extend<{ login: LoginPage; inventory: InventoryPage; checkout: CheckoutPage }>({
  login: async ({ page }, use) => { await use(new LoginPage(page)); },
  inventory: async ({ page }, use) => { await use(new InventoryPage(page)); },
  checkout: async ({ page }, use) => { await use(new CheckoutPage(page)); },
});
export { expect } from '@playwright/test';
