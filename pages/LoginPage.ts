import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for the SauceDemo Login Page.
 * Encapsulates UI elements and user interactions on https://www.saucedemo.com/
 */
export class LoginPage extends BasePage {
  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessageContainer: Locator;
  readonly errorCloseButton: Locator;

  constructor(page: Page) {
    super(page);
    // Utilizing robust data-test attributes recommended for Playwright
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessageContainer = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('button.error-button');
  }

  /**
   * Navigates directly to the SauceDemo login page
   */
  async goto(): Promise<void> {
    await this.navigateTo('/');
    await this.waitForLoad();
  }

  /**
   * Types username into input field
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Types password into input field
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the login submit button
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Complete login action
   */
  async login(username?: string, password?: string): Promise<void> {
    if (username !== undefined && username !== '') {
      await this.enterUsername(username);
    }
    if (password !== undefined && password !== '') {
      await this.enterPassword(password);
    }
    await this.clickLogin();
  }

  /**
   * Extracts error message banner text
   */
  async getErrorMessage(): Promise<string> {
    await this.errorMessageContainer.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.errorMessageContainer.textContent()) || '';
  }

  /**
   * Checks whether the error banner is visible
   */
  async isErrorDisplayed(): Promise<boolean> {
    return this.errorMessageContainer.isVisible();
  }
}
