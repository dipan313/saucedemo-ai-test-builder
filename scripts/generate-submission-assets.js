const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function generateAssets() {
  console.log('Generating PDF report...');
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Assignment 1 Solution - Dipan Mazumder</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #24292f;
      line-height: 1.5;
      font-size: 11.5pt;
    }
    .header {
      border-bottom: 2px solid #0969da;
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #0969da;
      margin: 0 0 6px 0;
      font-size: 20pt;
    }
    .header .subtitle {
      font-size: 12pt;
      color: #57606a;
      font-weight: 500;
    }
    .meta-box {
      background-color: #f6f8fa;
      border: 1px solid #d0d7de;
      border-radius: 6px;
      padding: 12px 16px;
      margin-bottom: 20px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 6px;
      font-size: 10.5pt;
    }
    .meta-label {
      font-weight: 600;
      color: #24292f;
    }
    h2 {
      color: #1f2328;
      border-bottom: 1px solid #d8dee4;
      padding-bottom: 4px;
      margin-top: 22px;
      margin-bottom: 10px;
      font-size: 14pt;
    }
    h3 {
      font-size: 12pt;
      color: #0969da;
      margin-top: 14px;
      margin-bottom: 6px;
    }
    p, li {
      font-size: 11pt;
    }
    ul, ol {
      margin-top: 4px;
      margin-bottom: 10px;
      padding-left: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 10pt;
    }
    th, td {
      border: 1px solid #d0d7de;
      padding: 8px 10px;
      text-align: left;
    }
    th {
      background-color: #f6f8fa;
      font-weight: 600;
    }
    .badge {
      display: inline-block;
      padding: 2px 6px;
      font-size: 8.5pt;
      font-weight: 600;
      border-radius: 4px;
      background: #dafbe1;
      color: #1a7f37;
      border: 1px solid #aceebb;
    }
    pre {
      background: #f6f8fa;
      border: 1px solid #d0d7de;
      border-radius: 6px;
      padding: 10px;
      font-size: 9.5pt;
      font-family: Consolas, "Courier New", monospace;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .callout {
      border-left: 4px solid #0969da;
      background: #f0f7ff;
      padding: 10px 14px;
      border-radius: 0 6px 6px 0;
      margin: 12px 0;
    }
    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>

  <div class="header">
    <h1>Technical Assessment Submission: Assignment 1</h1>
    <div class="subtitle">AI-Generated Test Case Builder + Script Execution | Indus Net Technologies Ltd.</div>
  </div>

  <div class="meta-box">
    <div class="meta-grid">
      <div><span class="meta-label">Candidate Name:</span> Dipan Mazumder</div>
      <div><span class="meta-label">Role:</span> QA / Automation Engineering</div>
      <div><span class="meta-label">Application Under Test:</span> SauceDemo (https://www.saucedemo.com/)</div>
      <div><span class="meta-label">Framework & Language:</span> Playwright & TypeScript (POM)</div>
      <div><span class="meta-label">GitHub Repository:</span> <a href="https://github.com/dipan313/saucedemo-ai-test-builder">github.com/dipan313/saucedemo-ai-test-builder</a></div>
      <div><span class="meta-label">Test Suite Result:</span> <span class="badge">5 of 5 Automated Tests PASSED</span></div>
    </div>
  </div>

  <h2>1. Problem Statement & Objectives</h2>
  <p>
    The objective of this assignment is to demonstrate a practical testing mindset by leveraging AI as an intelligent assistant for test design, and delivering an enterprise-ready automated test suite using modern tooling (Playwright, Selenium, or Cypress) adhering to the Page Object Model (POM).
  </p>
  <div class="callout">
    <strong>Key Delivery:</strong> While the brief requested automating at least 1 test case, <strong>all 5 AI-assisted test cases have been fully automated</strong> with strict assertions, decoupled fixtures, and GitHub Actions CI integration.
  </div>

  <h2>2. AI-Assisted Test Design Methodology</h2>
  <p>
    To generate meaningful, domain-specific test cases rather than generic placeholders, I utilized the <strong>PCCF (Persona-Context-Constraint-Format)</strong> prompt engineering framework.
  </p>
  <h3>Engineered Prompt Structure:</h3>
  <ul>
    <li><strong>Persona:</strong> Senior SDET & QA Architect specializing in web application security and boundary testing.</li>
    <li><strong>Context:</strong> SauceDemo authentication page (identifying input fields, submit button, and error container).</li>
    <li><strong>Constraints:</strong> Balance of positive (happy path), negative (validation/boundary), and security/state (lockout) tests using known system credentials.</li>
    <li><strong>Format:</strong> Standard ISO/IEC/IEEE 29119 test specifications.</li>
  </ul>

  <h3>Human-in-the-Loop (HITL) Quality Analysis:</h3>
  <p>
    As required by the evaluation criteria (<em>"AI-assisted test design, not AI-generated code alone"</em>), I critically reviewed the AI's draft and corrected several critical blind spots:
  </p>
  <ol>
    <li><strong>Sequential Error Precedence:</strong> AI assumed empty submission would show both username and password warnings. Hands-on inspection revealed SauceDemo validates sequentially (<code>Username is required</code> triggers first).</li>
    <li><strong>Deep Assertion Design:</strong> AI merely checked if the URL changed to <code>/inventory.html</code>. I added assertions verifying that product catalog items actually rendered (<code>itemCount > 0</code>) to prevent false-positive passes.</li>
    <li><strong>Selector Resilience:</strong> AI generated brittle XPath selectors. I hand-crafted the Page Object Model using Playwright's resilient <code>data-test</code> attributes (<code>[data-test="username"]</code>).</li>
  </ol>

  <div class="page-break"></div>

  <h2>3. Test Case Specification Matrix (5 AI-Refined Test Cases)</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 14%;">Test ID</th>
        <th style="width: 22%;">Classification</th>
        <th style="width: 34%;">Objective & Input Data</th>
        <th style="width: 20%;">Expected Result</th>
        <th style="width: 10%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>TC_LOGIN_01</strong></td>
        <td>Positive / Happy Path<br><em>(Primary Showcase)</em></td>
        <td>Valid credentials login<br>User: <code>standard_user</code><br>Pass: <code>secret_sauce</code></td>
        <td>Redirects to <code>/inventory.html</code>, header is "Products", catalog loaded.</td>
        <td><span class="badge">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC_LOGIN_02</strong></td>
        <td>Security / Account State</td>
        <td>Locked-out user login<br>User: <code>locked_out_user</code><br>Pass: <code>secret_sauce</code></td>
        <td>Access rejected; banner shows: <em>"Epic sadface: Sorry, this user has been locked out."</em></td>
        <td><span class="badge">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC_LOGIN_03</strong></td>
        <td>Boundary / Null Input</td>
        <td>Empty credentials submission<br>User: <code>""</code><br>Pass: <code>""</code></td>
        <td>Submission blocked; banner displays: <em>"Epic sadface: Username is required"</em>.</td>
        <td><span class="badge">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC_LOGIN_04</strong></td>
        <td>Validation / Partial</td>
        <td>Username provided with blank password<br>User: <code>standard_user</code><br>Pass: <code>""</code></td>
        <td>Submission blocked; banner displays: <em>"Epic sadface: Password is required"</em>.</td>
        <td><span class="badge">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC_LOGIN_05</strong></td>
        <td>Negative / Auth Failure</td>
        <td>Unregistered credentials<br>User: <code>invalid_user</code><br>Pass: <code>wrong_password</code></td>
        <td>Access denied; banner displays: <em>"Epic sadface: Username and password do not match..."</em></td>
        <td><span class="badge">PASS</span></td>
      </tr>
    </tbody>
  </table>

  <h2>4. Automation Architecture & Page Object Model</h2>
  <p>The solution is architected using clean TypeScript classes and decoupled JSON fixtures:</p>
  <ul>
    <li><strong><code>pages/BasePage.ts</code>:</strong> Common web driver operations (navigation, URL checks, title extraction).</li>
    <li><strong><code>pages/LoginPage.ts</code>:</strong> Encapsulates locators (<code>usernameInput</code>, <code>passwordInput</code>, <code>loginButton</code>, <code>errorMessageContainer</code>) and user actions.</li>
    <li><strong><code>pages/InventoryPage.ts</code>:</strong> Encapsulates catalog dashboard elements and verification assertions.</li>
    <li><strong><code>tests/fixtures/testData.json</code>:</strong> Externalized credential sets and expected error strings.</li>
    <li><strong><code>tests/login.spec.ts</code>:</strong> Executable Playwright test suite.</li>
  </ul>

  <h3>Code Snippet: Primary Test Case Automation (TC_LOGIN_01)</h3>
  <pre><code>test('TC_LOGIN_01 [Positive] - Successful login with valid credentials redirects to inventory', async () => {
  // 1. Perform login action via Page Object
  await loginPage.login(testData.validUser.username, testData.validUser.password);

  // 2. Assert URL redirection
  expect(inventoryPage.getUrl()).toContain('/inventory.html');

  // 3. Assert header title visibility and text
  const titleText = await inventoryPage.getPageTitleText();
  expect(titleText).toBe(testData.validUser.expectedHeader);

  // 4. Assert products are rendered on the page
  const itemCount = await inventoryPage.getItemCount();
  expect(itemCount).toBeGreaterThan(0);
});</code></pre>

  <h2>5. How to Run Locally</h2>
  <pre><code># 1. Clone repository
git clone https://github.com/dipan313/saucedemo-ai-test-builder.git
cd saucedemo-ai-test-builder

# 2. Install dependencies & Playwright browser
npm install
npx playwright install chromium

# 3. Run all tests
npm test

# 4. Run primary test case alone
npm run test:primary

# 5. Open interactive HTML report
npm run test:report</code></pre>

  <h2>6. Summary & GitHub Submission</h2>
  <p>
    The complete codebase, CI/CD pipeline configuration (<code>.github/workflows/playwright.yml</code>), test data, and interactive CLI viewer (<code>npm run ai:preview</code>) are available on GitHub:
    <br>
    <strong>GitHub Link:</strong> <a href="https://github.com/dipan313/saucedemo-ai-test-builder">https://github.com/dipan313/saucedemo-ai-test-builder</a>
  </p>
</body>
</html>
  `;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'load' });
  
  const pdfPath = path.resolve(__dirname, '..', 'Dipan_Mazumder_Assignment_1_Solution.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '15mm',
      bottom: '15mm',
      left: '15mm',
      right: '15mm'
    }
  });
  await browser.close();
  console.log('PDF successfully generated at:', pdfPath);

  // Create ZIP file using PowerShell Compress-Archive
  console.log('Creating ZIP archive...');
  const zipPath = path.resolve(__dirname, '..', 'Dipan_Mazumder_Assignment_1_Files.zip');
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }
  
  const powershellCmd = `Compress-Archive -Path .github, ai-artifacts, pages, tests, scripts, package.json, tsconfig.json, playwright.config.ts, README.md -DestinationPath Dipan_Mazumder_Assignment_1_Files.zip -Force`;
  execSync(`powershell -Command "${powershellCmd}"`, { cwd: path.resolve(__dirname, '..') });
  console.log('ZIP successfully generated at:', zipPath);
}

generateAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
