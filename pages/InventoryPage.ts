import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for the SauceDemo Inventory (Products) Page.
 * Represents the authenticated dashboard landing view.
 */
export class InventoryPage extends BasePage {
  // Locators
  readonly pageTitle: Locator;
  readonly inventoryList: Locator;
  readonly shoppingCartBadge: Locator;
  readonly menuButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('[data-test="title"]');
    this.inventoryList = page.locator('[data-test="inventory-item"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
  }

  /**
   * Returns the header title text (e.g., 'Products')
   */
  async getPageTitleText(): Promise<string> {
    await this.pageTitle.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.pageTitle.textContent()) || '';
  }

  /**
   * Validates if user has successfully navigated to the inventory page
   */
  async isLoaded(): Promise<boolean> {
    await this.pageTitle.waitFor({ state: 'visible' });
    return this.getUrl().includes('/inventory.html');
  }

  /**
   * Returns count of product items rendered on the page
   */
  async getItemCount(): Promise<number> {
    return this.inventoryList.count();
  }
}
