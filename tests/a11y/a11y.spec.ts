import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility scan with axe-core (WCAG 2.0/2.1 A + AA).
 * The demo site has known issues, so we gate on *critical* violations only
 * and attach the full report to the HTML report for review.
 */
test.describe('Accessibility (axe)', () => {
  test('login page has no critical violations', async ({ page }, info) => {
    await page.goto('/');
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    await info.attach('axe-login.json', {
      body: JSON.stringify(r.violations, null, 2),
      contentType: 'application/json',
    });
    expect(r.violations.filter((v) => v.impact === 'critical')).toEqual([]);
  });
});
