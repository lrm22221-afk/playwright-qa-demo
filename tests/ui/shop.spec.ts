import { test, expect } from './fixtures';
test.describe('Shopping', () => {
  test.beforeEach(async ({ login }) => { await login.goto(); await login.login('standard_user'); });
  test('inventory shows 6 products', async ({ inventory }) => { await expect(inventory.items).toHaveCount(6); });
  test('sort by price low to high', async ({ inventory }) => {
    await inventory.sort.selectOption('lohi');
    const p = await inventory.prices();
    expect(p).toEqual([...p].sort((a, b) => a - b));
  });
  test('add two items updates cart badge', async ({ inventory }) => {
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.addToCart('sauce-labs-bike-light');
    await expect(inventory.cartBadge).toHaveText('2');
  });
  test('end-to-end checkout', async ({ inventory, checkout }) => {
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.openCart();
    await checkout.start();
    await checkout.fillInfo('Test', 'User', '12345');
    await checkout.finish();
    await checkout.expectComplete();
  });
});
