import { test, expect } from './fixtures';
import { sortCases } from '../../data/users';

test.describe('Shopping', () => {
  test('inventory shows 6 products', async ({ loggedIn }) => {
    await expect(loggedIn.items).toHaveCount(6);
  });

  for (const s of sortCases.filter((c) => c.key === 'price')) {
    test(`sorts by ${s.label}`, async ({ loggedIn }) => {
      await loggedIn.sort.selectOption(s.option);
      const p = await loggedIn.prices();
      expect(p).toEqual([...p].sort((a, b) => (a - b) * s.dir));
    });
  }

  for (const s of sortCases.filter((c) => c.key === 'name')) {
    test(`sorts by ${s.label}`, async ({ loggedIn }) => {
      await loggedIn.sort.selectOption(s.option);
      const n = await loggedIn.names();
      expect(n).toEqual([...n].sort((a, b) => a.localeCompare(b) * s.dir));
    });
  }

  test('add and remove items updates cart badge', async ({ loggedIn }) => {
    await loggedIn.addToCart('sauce-labs-backpack');
    await loggedIn.addToCart('sauce-labs-bike-light');
    await expect(loggedIn.cartBadge).toHaveText('2');
    await loggedIn.removeFromCart('sauce-labs-backpack');
    await expect(loggedIn.cartBadge).toHaveText('1');
  });

  test('end-to-end checkout @smoke', async ({ loggedIn, checkout }) => {
    await loggedIn.addToCart('sauce-labs-backpack');
    await loggedIn.openCart();
    await checkout.start();
    await checkout.fillInfo('Test', 'User', '12345');
    await checkout.finish();
    await checkout.expectComplete();
    await expect(checkout.completeHeader).toBeVisible();
  });
});
