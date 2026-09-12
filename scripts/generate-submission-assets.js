const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function generateAssets() {
  console.log('Generating compact 2-page PDF report...');
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Assignment 1 Solution - Dipan Mazumder</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 10mm 12mm;
    }
    * {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      color: #1f2328;
      line-height: 1.35;
      font-size: 9.5pt;
      margin: 0;
      padding: 0;
    }
    .header {
      border-bottom: 2px solid #0969da;
      padding-bottom: 6px;
      margin-bottom: 10px;
    }
    .header h1 {
      color: #0969da;
      margin: 0 0 3px 0;
      font-size: 16pt;
      letter-spacing: -0.3px;
    }
    .header .subtitle {
      font-size: 10pt;
      color: #57606a;
      font-weight: 500;
    }
    .meta-box {
      background-color: #f6f8fa;
      border: 1px solid #d0d7de;
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 10px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 4px;
      column-gap: 16px;
      font-size: 9pt;
    }
    .meta-label {
      font-weight: 600;
      color: #24292f;
    }
    h2 {
      color: #1f2328;
      border-bottom: 1px solid #d8dee4;
      padding-bottom: 2px;
      margin-top: 10px;
      margin-bottom: 6px;
      font-size: 11.5pt;
    }
    h3 {
      font-size: 10pt;
      color: #0969da;
      margin-top: 8px;
      margin-bottom: 4px;
    }
    p, li {
      font-size: 9.2pt;
      margin-top: 2px;
      margin-bottom: 4px;
    }
    ul, ol {
      margin-top: 2px;
      margin-bottom: 6px;
      padding-left: 18px;
    }
    .callout {
      border-left: 3px solid #0969da;
      background: #f0f7ff;
      padding: 6px 10px;
      border-radius: 0 4px 4px 0;
      margin: 6px 0;
      font-size: 9pt;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 6px 0;
      font-size: 8.5pt;
    }
    th, td {
      border: 1px solid #d0d7de;
      padding: 5px 7px;
      text-align: left;
      vertical-align: top;
    }
    th {
      background-color: #f6f8fa;
      font-weight: 600;
    }
    .badge {
      display: inline-block;
      padding: 1px 5px;
      font-size: 8pt;
      font-weight: 600;
      border-radius: 3px;
      background: #dafbe1;
      color: #1a7f37;
      border: 1px solid #aceebb;
    }
    pre {
      background: #f6f8fa;
      border: 1px solid #d0d7de;
      border-radius: 4px;
      padding: 6px 8px;
      font-size: 8pt;
      font-family: Consolas, monospace;
      margin: 4px 0;
      white-space: pre-wrap;
      word-break: break-word;
      line-height: 1.3;
    }
    .page-break {
      page-break-before: always;
      break-before: page;
    }
    .footer {
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px solid #d0d7de;
      font-size: 8pt;
      color: #656d76;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1 ==================== -->
  <div class="header">
    <h1>Technical Assessment Solution: Assignment 1</h1>
    <div class="subtitle">AI-Generated Test Case Builder + Script Execution | Indus Net Technologies Ltd.</div>
  </div>

  <div class="meta-box">
    <div class="meta-grid">
      <div><span class="meta-label">Candidate Name:</span> Dipan Mazumder</div>
      <div><span class="meta-label">Target Application:</span> SauceDemo (https://www.saucedemo.com/)</div>
      <div><span class="meta-label">Framework:</span> Playwright & TypeScript (Page Object Model)</div>
      <div><span class="meta-label">Execution Status:</span> <span class="badge">5 of 5 Automated Tests PASSED</span></div>
      <div><span class="meta-label">GitHub Repo:</span> <a href="https://github.com/dipan313/saucedemo-ai-test-builder">github.com/dipan313/saucedemo-ai-test-builder</a></div>
      <div><span class="meta-label">CI/CD:</span> Automated GitHub Actions Pipeline</div>
    </div>
  </div>

  <h2>1. Problem Statement & Delivery Highlights</h2>
  <p>
    <strong>Requirement:</strong> Use an AI tool to generate test cases from a login requirement, then automate at least 1 test case using Playwright/Selenium/Cypress with a basic Page Object Model and practical QA mindset.
  </p>
  <div class="callout">
    <strong>Key Differentiator:</strong> While the brief required automating at least 1 test case, <strong>all 5 AI-assisted test cases have been fully automated</strong> in Playwright TypeScript with zero flakiness, Page Object abstractions, and CI/CD integration.
  </div>

  <h2>2. AI-Assisted Test Design (PCCF Prompt Framework)</h2>
  <p>
    Rather than generic conversational queries, test generation was driven by the structured <strong>Persona-Context-Constraint-Format (PCCF)</strong> framework:
  </p>
  <ul>
    <li><strong>Persona:</strong> Lead SDET / QA Architect specializing in web security, boundary values, and state transitions.</li>
    <li><strong>Context:</strong> SauceDemo authentication page with specific DOM selectors (<code>data-test="username"</code>, <code>data-test="password"</code>, <code>data-test="login-button"</code>, <code>data-test="error"</code>).</li>
    <li><strong>Constraints:</strong> Balance of positive (happy path), negative (validation/boundary), and security/account state (lockout) tests using authentic domain credentials.</li>
    <li><strong>Format:</strong> Standard ISO/IEC/IEEE 29119 test specifications (Preconditions, Steps, Data, Expected Results, Severity).</li>
  </ul>

  <h2>3. Human-in-the-Loop QA Analysis ("AI-Assisted, Not AI-Dependent")</h2>
  <p>
    AI accelerates initial scenario brainstorming, but human QA domain expertise is indispensable for realistic automation:
  </p>
  <ol>
    <li><strong>Sequential Validation Precedence:</strong> AI assumed empty inputs show both username and password errors. Hands-on inspection revealed SauceDemo validates sequentially (<code>Username is required</code> takes precedence). The test suite was structured to reflect this real behavior.</li>
    <li><strong>Deep Assertion Design:</strong> AI suggested merely asserting URL redirection to <code>/inventory.html</code>. A senior QA mindset recognizes this as a shallow assertion. I implemented deep assertions verifying that product catalog items actually rendered (<code>itemCount > 0</code>).</li>
    <li><strong>Selector Resilience:</strong> AI proposed brittle XPath selectors. I hand-crafted the Page Objects using Playwright's best-practice resilient <code>data-test</code> attributes (<code>[data-test="username"]</code>), ensuring immunity against layout changes.</li>
    <li><strong>Production Architecture:</strong> I hand-coded the Page Object Model, decoupled JSON fixtures, Playwright config, and GitHub Actions CI workflow to adhere to SOLID design principles.</li>
  </ol>

  <div class="footer">
    <span>Candidate: Dipan Mazumder</span>
    <span>Page 1 of 2</span>
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="page-break"></div>

  <h2>4. Test Case Specification Matrix (5 AI-Refined & Automated Cases)</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 14%;">Test ID</th>
        <th style="width: 20%;">Type</th>
        <th style="width: 32%;">Objective & Input Data</th>
        <th style="width: 24%;">Expected Assertion</th>
        <th style="width: 10%;">Result</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>TC_LOGIN_01</strong></td>
        <td>Positive / Happy Path<br><em>(Primary Target)</em></td>
        <td>Valid credentials login<br>User: <code>standard_user</code> / Pass: <code>secret_sauce</code></td>
        <td>URL has <code>/inventory.html</code>, title is "Products", catalog <code>itemCount &gt; 0</code></td>
        <td><span class="badge">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC_LOGIN_02</strong></td>
        <td>Security / Account State</td>
        <td>Locked-out user login<br>User: <code>locked_out_user</code> / Pass: <code>secret_sauce</code></td>
        <td>Banner: <em>"Epic sadface: Sorry, this user has been locked out."</em></td>
        <td><span class="badge">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC_LOGIN_03</strong></td>
        <td>Boundary / Null Input</td>
        <td>Blank credentials submission<br>User: <code>""</code> / Pass: <code>""</code></td>
        <td>Banner: <em>"Epic sadface: Username is required"</em></td>
        <td><span class="badge">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC_LOGIN_04</strong></td>
        <td>Validation / Partial</td>
        <td>Username with blank password<br>User: <code>standard_user</code> / Pass: <code>""</code></td>
        <td>Banner: <em>"Epic sadface: Password is required"</em></td>
        <td><span class="badge">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC_LOGIN_05</strong></td>
        <td>Negative / Auth Failure</td>
        <td>Unregistered credentials<br>User: <code>invalid_user</code> / Pass: <code>wrong_password</code></td>
        <td>Banner: <em>"Epic sadface: Username and password do not match..."</em></td>
        <td><span class="badge">PASS</span></td>
      </tr>
    </tbody>
  </table>

  <h2>5. Automation Architecture & Page Object Implementation</h2>
  <p>
    Framework follows strict Page Object Model separation: <code>BasePage</code> &rarr; <code>LoginPage</code>, <code>InventoryPage</code>, with test data externalized to <code>testData.json</code>.
  </p>
  <pre><code>// Primary Automated Test Case (tests/login.spec.ts)
test('TC_LOGIN_01 [Positive] - Successful login with valid credentials redirects to inventory', async () => {
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  expect(inventoryPage.getUrl()).toContain('/inventory.html');
  expect(await inventoryPage.getPageTitleText()).toBe(testData.validUser.expectedHeader);
  expect(await inventoryPage.getItemCount()).toBeGreaterThan(0);
});

// Negative Lockout Validation (TC_LOGIN_02)
test('TC_LOGIN_02 [Negative] - Locked-out account triggers specific lockout banner', async () => {
  await loginPage.login(testData.lockedOutUser.username, testData.lockedOutUser.password);
  expect(await loginPage.getErrorMessage()).toBe(testData.lockedOutUser.expectedErrorMessage);
});</code></pre>

  <h2>6. Local Execution & Reproduction Steps</h2>
  <pre><code># 1. Clone repository & install dependencies
git clone https://github.com/dipan313/saucedemo-ai-test-builder.git
cd saucedemo-ai-test-builder && npm install && npx playwright install chromium

# 2. Run automated tests (headless / headed / primary showcase)
npm test                # Executes all 5 test cases in parallel (~8s)
npm run test:primary    # Runs TC_LOGIN_01 showcase test
npm run test:report     # Opens interactive Playwright HTML report
npm run ai:preview      # Interactive terminal AI prompt & test matrix viewer</code></pre>

  <h2>7. Deliverables & Submission Links</h2>
  <p>
    • <strong>GitHub Repository:</strong> <a href="https://github.com/dipan313/saucedemo-ai-test-builder">https://github.com/dipan313/saucedemo-ai-test-builder</a><br>
    • <strong>CI/CD Workflow:</strong> Pre-configured GitHub Actions (<code>.github/workflows/playwright.yml</code>) running automated tests on push/PR.<br>
    • <strong>Supporting Archive:</strong> <code>Dipan_Mazumder_Assignment_1_Files.zip</code> containing complete codebase, Page Objects, fixtures, and configurations.
  </p>

  <div class="footer">
    <span>Candidate: Dipan Mazumder | Indus Net Technologies Assignment 1</span>
    <span>Page 2 of 2</span>
  </div>

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
      top: '10mm',
      bottom: '10mm',
      left: '12mm',
      right: '12mm'
    }
  });
  await browser.close();
  console.log('PDF successfully generated at:', pdfPath);

  // Update ZIP archive
  console.log('Updating ZIP archive...');
  const zipPath = path.resolve(__dirname, '..', 'Dipan_Mazumder_Assignment_1_Files.zip');
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }
  
  const powershellCmd = `Compress-Archive -Path .github, ai-artifacts, pages, tests, scripts, package.json, tsconfig.json, playwright.config.ts, README.md, .gitignore -DestinationPath Dipan_Mazumder_Assignment_1_Files.zip -Force`;
  execSync(`powershell -Command "${powershellCmd}"`, { cwd: path.resolve(__dirname, '..') });
  console.log('ZIP successfully generated at:', zipPath);
}

generateAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
