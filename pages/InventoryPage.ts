import { Page, Locator } from '@playwright/test';
export class InventoryPage {
  readonly items: Locator; readonly cartBadge: Locator; readonly sort: Locator;
  constructor(private page: Page) {
    this.items = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sort = page.locator('[data-test="product-sort-container"]');
  }
  async addToCart(slug: string) { await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click(); }
  async openCart() { await this.page.locator('[data-test="shopping-cart-link"]').click(); }
  async prices(): Promise<number[]> {
    const t = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
    return t.map(p => parseFloat(p.replace('$', '')));
  }
}
