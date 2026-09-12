import { Page } from '@playwright/test';

/**
 * BasePage encapsulates generic web interactions and page navigation.
 * All domain-specific page objects inherit from this class.
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a specific path or URL
   */
  async navigateTo(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Retrieves the current page URL
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Retrieves the current page title
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Wait for network idle state
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
