import { Page, Locator } from '@playwright/test';
export class LoginPage {
  readonly username: Locator; readonly password: Locator; readonly submit: Locator; readonly error: Locator;
  constructor(private page: Page) {
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.submit = page.locator('[data-test="login-button"]');
    this.error = page.locator('[data-test="error"]');
  }
  async goto() { await this.page.goto('/'); }
  async login(user: string, pass = 'secret_sauce') {
    await this.username.fill(user); await this.password.fill(pass); await this.submit.click();
  }
}
