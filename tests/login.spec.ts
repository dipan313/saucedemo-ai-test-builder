import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import testData from './fixtures/testData.json';

test.describe('SauceDemo Authentication Test Suite', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  /**
   * TC_LOGIN_01: [PRIMARY AUTOMATED TEST CASE]
   * Verify successful login redirect and catalog visibility with valid credentials.
   */
  test('TC_LOGIN_01 [Positive] - Successful login with valid credentials redirects to inventory', async () => {
    // 1. Perform login with valid test credentials
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    // 2. Assert URL redirection to inventory page
    expect(inventoryPage.getUrl()).toContain('/inventory.html');

    // 3. Assert product header title visibility and text match
    const titleText = await inventoryPage.getPageTitleText();
    expect(titleText).toBe(testData.validUser.expectedHeader);

    // 4. Assert products are rendered on the page
    const itemCount = await inventoryPage.getItemCount();
    expect(itemCount).toBeGreaterThan(0);
  });

  /**
   * TC_LOGIN_02: [Negative - Security / Account State]
   * Verify locked out user receives explicit lockout notification.
   */
  test('TC_LOGIN_02 [Negative] - Locked-out account triggers specific lockout banner', async () => {
    await loginPage.login(testData.lockedOutUser.username, testData.lockedOutUser.password);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(testData.lockedOutUser.expectedErrorMessage);
    expect(loginPage.getUrl()).not.toContain('/inventory.html');
  });

  /**
   * TC_LOGIN_03: [Negative - Boundary / Empty Fields]
   * Verify submitting login form with empty fields displays "Username is required".
   */
  test('TC_LOGIN_03 [Negative] - Empty credentials submission triggers required username validation', async () => {
    await loginPage.clickLogin();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(testData.emptyCredentials.expectedErrorMessage);
  });

  /**
   * TC_LOGIN_04: [Negative - Boundary / Partial Field Entry]
   * Verify submitting valid username with empty password triggers "Password is required".
   */
  test('TC_LOGIN_04 [Negative] - Valid username with empty password triggers password required validation', async () => {
    await loginPage.enterUsername(testData.emptyPassword.username);
    await loginPage.clickLogin();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(testData.emptyPassword.expectedErrorMessage);
  });

  /**
   * TC_LOGIN_05: [Negative - Authentication Failure]
   * Verify submitting unregistered or invalid credentials displays mismatch error banner.
   */
  test('TC_LOGIN_05 [Negative] - Invalid credentials display mismatch error notification', async () => {
    await loginPage.login(testData.invalidCredentials.username, testData.invalidCredentials.password);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(testData.invalidCredentials.expectedErrorMessage);
    expect(loginPage.getUrl()).not.toContain('/inventory.html');
  });
});
