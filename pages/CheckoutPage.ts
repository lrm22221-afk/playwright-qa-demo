import { Page, expect } from '@playwright/test';
export class CheckoutPage {
  constructor(private page: Page) {}
  async start() { await this.page.locator('[data-test="checkout"]').click(); }
  async fillInfo(first: string, last: string, zip: string) {
    await this.page.locator('[data-test="firstName"]').fill(first);
    await this.page.locator('[data-test="lastName"]').fill(last);
    await this.page.locator('[data-test="postalCode"]').fill(zip);
    await this.page.locator('[data-test="continue"]').click();
  }
  async finish() { await this.page.locator('[data-test="finish"]').click(); }
  async expectComplete() { await expect(this.page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!'); }
}
