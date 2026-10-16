import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly items: Locator;
  readonly cartBadge: Locator;
  readonly sort: Locator;
  constructor(private readonly page: Page) {
    this.items = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sort = page.locator('[data-test="product-sort-container"]');
  }
  async goto() {
    await this.page.goto('/inventory.html');
  }
  async addToCart(slug: string) {
    await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
  }
  async removeFromCart(slug: string) {
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }
  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
  async prices(): Promise<number[]> {
    const t = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
    return t.map((p) => parseFloat(p.replace('$', '')));
  }
  async names(): Promise<string[]> {
    return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
  }
}
