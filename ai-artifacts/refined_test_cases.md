# Human QA Refinement & Verification Matrix

While LLMs excel at rapidly generating combinatorial scenarios, automated testing requires strict selector stability, precise assertions, and deterministic state management. 

Below is the **Human-in-the-Loop (HITL) QA Evaluation & Enhancement Review**:

| Test ID | AI Scenario | Human QA Findings & Refinements | Automation Strategy (Playwright POM) |
| :--- | :--- | :--- | :--- |
| **TC_LOGIN_01** | Valid credentials happy path | AI suggested verifying redirect and header. Human QA added assertions for product container count (`itemCount > 0`) to confirm the catalog actually rendered. | `LoginPage.login()` → `expect(InventoryPage.getUrl()).toContain('/inventory.html')` + `expect(InventoryPage.getItemCount()).toBeGreaterThan(0)` |
| **TC_LOGIN_02** | Locked-out user security check | AI captured the scenario. Human QA ensured exact string assertion `"Epic sadface: Sorry, this user has been locked out."` and verified that the page URL did NOT navigate to `/inventory.html`. | `LoginPage.login(lockedUser)` → `expect(LoginPage.getErrorMessage()).toBe(...)` + URL boundary check. |
| **TC_LOGIN_03** | Empty credentials | AI proposed empty fields. Human QA observed that SauceDemo evaluates username first, throwing `"Epic sadface: Username is required"` rather than a generic or simultaneous password warning. | `LoginPage.clickLogin()` with no input → assert exact required warning banner. |
| **TC_LOGIN_04** | Empty password | AI proposed empty password. Human QA verified SauceDemo's sequential validation logic triggers `"Epic sadface: Password is required"` only once username is populated. | `LoginPage.enterUsername(validUser)` → `LoginPage.clickLogin()` → assert password banner. |
| **TC_LOGIN_05** | Invalid credentials | AI suggested generic random text. Human QA externalized these values into `testData.json` fixture to ensure reproducibility across CI runs. | Data-driven fixture injection → assert mismatch banner. |

---

### Detailed Test Specifications (ISO/IEC/IEEE 29119 Aligned)

#### Specification: TC_LOGIN_01 (Primary Automation Target)
- **Objective**: Verify that a registered user can log in with valid credentials and access the inventory dashboard.
- **Pre-conditions**: Clean browser session; user at `https://www.saucedemo.com/`.
- **Steps**:
  1. Navigate to `/`.
  2. Enter `standard_user` into `data-test="username"`.
  3. Enter `secret_sauce` into `data-test="password"`.
  4. Click `data-test="login-button"`.
- **Expected Outcome**:
  - Current URL matches `https://www.saucedemo.com/inventory.html`.
  - Header displays "Products".
  - Inventory list contains > 0 items.

#### Specification: TC_LOGIN_02
- **Objective**: Verify that an account in locked status cannot access the application.
- **Pre-conditions**: Clean browser session; user at `https://www.saucedemo.com/`.
- **Steps**:
  1. Navigate to `/`.
  2. Enter `locked_out_user` into `data-test="username"`.
  3. Enter `secret_sauce` into `data-test="password"`.
  4. Click `data-test="login-button"`.
- **Expected Outcome**:
  - URL remains on login page (`https://www.saucedemo.com/`).
  - Error banner `data-test="error"` displays: `"Epic sadface: Sorry, this user has been locked out."`.

#### Specification: TC_LOGIN_03
- **Objective**: Verify that submitting the form with null/empty inputs prevents authentication.
- **Pre-conditions**: User at `https://www.saucedemo.com/`.
- **Steps**:
  1. Leave both username and password inputs blank.
  2. Click `data-test="login-button"`.
- **Expected Outcome**:
  - Form submission is halted.
  - Error banner displays: `"Epic sadface: Username is required"`.

#### Specification: TC_LOGIN_04
- **Objective**: Verify that omitting the password when providing a valid username halts submission.
- **Pre-conditions**: User at `https://www.saucedemo.com/`.
- **Steps**:
  1. Enter `standard_user` into username input.
  2. Leave password input empty.
  3. Click `data-test="login-button"`.
- **Expected Outcome**:
  - Error banner displays: `"Epic sadface: Password is required"`.

#### Specification: TC_LOGIN_05
- **Objective**: Verify that providing invalid/unregistered credentials shows appropriate rejection.
- **Pre-conditions**: User at `https://www.saucedemo.com/`.
- **Steps**:
  1. Enter `invalid_user` into username input.
  2. Enter `wrong_password` into password input.
  3. Click `data-test="login-button"`.
- **Expected Outcome**:
  - Error banner displays: `"Epic sadface: Username and password do not match any user in this service"`.
