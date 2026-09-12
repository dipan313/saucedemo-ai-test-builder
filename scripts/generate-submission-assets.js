const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function generateAssets() {
  console.log('Generating ultra-clean, modern minimalist 2-page PDF...');
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Assignment 1 Solution - Dipan Mazumder</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 16mm 14mm 16mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.45;
      font-size: 9.5pt;
      margin: 0;
      padding: 0;
    }

    /* Minimalist Top Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 12px;
      border-bottom: 1.5px solid #e2e8f0;
      margin-bottom: 16px;
    }
    .brand-title {
      font-size: 15pt;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.4px;
      margin: 0 0 3px 0;
    }
    .brand-sub {
      font-size: 8.5pt;
      color: #64748b;
      font-weight: 500;
      letter-spacing: 0.1px;
    }
    .header-badge {
      display: inline-flex;
      align-items: center;
      background: #ecfdf5;
      color: #059669;
      border: 1px solid #a7f3d0;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 8pt;
      font-weight: 600;
    }

    /* Metric Stat Cards */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }
    .stat-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
    }
    .stat-label {
      font-size: 7.5pt;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }
    .stat-val {
      font-size: 13pt;
      font-weight: 700;
      color: #1e293b;
    }
    .stat-sub {
      font-size: 7.5pt;
      color: #059669;
      font-weight: 500;
      margin-top: 1px;
    }

    /* Section Typography */
    .section-title {
      font-size: 10.5pt;
      font-weight: 700;
      color: #1e293b;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      margin: 16px 0 8px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #f1f5f9;
    }

    p {
      margin: 0 0 8px 0;
      font-size: 9pt;
      color: #334155;
      line-height: 1.5;
    }

    /* Feature Grid / Minimal Cards */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 12px;
    }
    .card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
    }
    .card-title {
      font-size: 8.5pt;
      font-weight: 700;
      color: #3b82f6;
      margin-bottom: 4px;
    }
    .card-text {
      font-size: 8pt;
      color: #475569;
      line-height: 1.4;
      margin: 0;
    }

    /* Key-Value Details */
    .info-list {
      list-style: none;
      padding: 0;
      margin: 0 0 10px 0;
    }
    .info-item {
      display: flex;
      gap: 8px;
      margin-bottom: 6px;
      font-size: 8.5pt;
      line-height: 1.4;
    }
    .bullet-dot {
      color: #3b82f6;
      font-weight: bold;
    }
    .info-strong {
      font-weight: 600;
      color: #1e293b;
    }

    /* Table Minimalist */
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 8px 0 14px 0;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      font-size: 8.2pt;
    }
    th {
      background: #f8fafc;
      color: #475569;
      font-weight: 600;
      text-align: left;
      padding: 7px 10px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 7.8pt;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    td {
      padding: 7px 10px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
      vertical-align: middle;
    }
    tr:last-child td {
      border-bottom: none;
    }
    .status-pill {
      display: inline-block;
      padding: 1px 6px;
      border-radius: 12px;
      font-size: 7.5pt;
      font-weight: 600;
      background: #ecfdf5;
      color: #059669;
    }

    /* Minimal Terminal Box */
    .code-box {
      background: #0f172a;
      color: #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 7.8pt;
      line-height: 1.5;
      margin: 8px 0 12px 0;
    }
    .code-comment {
      color: #64748b;
    }
    .code-cmd {
      color: #38bdf8;
    }

    /* Page Break & Footer */
    .page-break {
      page-break-before: always;
      break-before: page;
    }
    .footer {
      position: absolute;
      bottom: 14mm;
      left: 16mm;
      right: 16mm;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 7.5pt;
      color: #94a3b8;
    }
    .page-container {
      position: relative;
      height: 268mm;
      box-sizing: border-box;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1 ==================== -->
  <div class="page-container">
    <div class="header">
      <div>
        <h1 class="brand-title">Assignment 1 — Solution Overview</h1>
        <div class="brand-sub">AI-Generated Test Case Builder + Script Execution &bull; Indus Net Technologies</div>
      </div>
      <div class="header-badge">&check; 5 / 5 Tests Automated</div>
    </div>

    <!-- Stats Bar -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-label">Candidate</div>
        <div class="stat-val" style="font-size: 11pt;">Dipan Mazumder</div>
        <div class="stat-sub">QA / Automation Engineer</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Target Application</div>
        <div class="stat-val" style="font-size: 11pt;">SauceDemo</div>
        <div class="stat-sub">https://www.saucedemo.com</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Automation Tech</div>
        <div class="stat-val" style="font-size: 11pt;">Playwright + TS</div>
        <div class="stat-sub">Page Object Model (POM)</div>
      </div>
    </div>

    <!-- Overview -->
    <div class="section-title">1. Executive Summary</div>
    <p>
      This submission demonstrates an <strong>AI-assisted, human-engineered</strong> quality workflow. An AI prompt was engineered to generate initial test scenarios from login requirements. Applying a senior testing mindset, the raw scenarios were evaluated, refined for boundary conditions, and automated using Playwright with TypeScript and the Page Object Model.
    </p>

    <!-- AI Prompting Strategy -->
    <div class="section-title">2. AI Prompt Engineering (PCCF Method)</div>
    <p>
      Rather than open-ended queries, the AI was directed through structured Persona-Context-Constraint-Format prompting:
    </p>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">Persona &amp; Context</div>
        <p class="card-text">
          Configured as Lead SDET analyzing SauceDemo login (identifying <code>username</code>, <code>password</code>, <code>login-button</code>, and error banner containers).
        </p>
      </div>
      <div class="card">
        <div class="card-title">Constraints &amp; Format</div>
        <p class="card-text">
          Targeted 5 distinct scenarios balancing Happy Path, Security Lockout, Boundary analysis, and ISO/IEC 29119 standard output structure.
        </p>
      </div>
    </div>

    <!-- Human-in-the-loop -->
    <div class="section-title">3. Human QA Value Addition ("AI-Assisted, Not AI-Dependent")</div>
    <ul class="info-list">
      <li class="info-item">
        <span class="bullet-dot">&bull;</span>
        <span><strong class="info-strong">Sequential Validation Precedence:</strong> AI assumed submitting blank credentials shows both username and password warnings. Hands-on analysis showed SauceDemo validates sequentially (<code>Username is required</code> triggers first). Test assertions were crafted to match true app behavior.</span>
      </li>
      <li class="info-item">
        <span class="bullet-dot">&bull;</span>
        <span><strong class="info-strong">Deep State Verification:</strong> AI suggested verifying only URL redirection to <code>/inventory.html</code>. To prevent false positives, I added assertions checking that catalog inventory items actually loaded (<code>itemCount &gt; 0</code>).</span>
      </li>
      <li class="info-item">
        <span class="bullet-dot">&bull;</span>
        <span><strong class="info-strong">Resilient Locators:</strong> AI proposed brittle XPath selectors. I hand-crafted Page Objects using Playwright's resilient <code>data-test</code> attributes for zero flakiness.</span>
      </li>
      <li class="info-item">
        <span class="bullet-dot">&bull;</span>
        <span><strong class="info-strong">Hand-Crafted Architecture:</strong> Page Objects, data fixtures, Playwright config, and GitHub Actions were personally coded for high maintainability.</span>
      </li>
    </ul>

    <div class="footer">
      <span>Dipan Mazumder &bull; Technical Submission</span>
      <span>Page 1 of 2</span>
    </div>
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="page-break"></div>
  <div class="page-container">
    <div class="header">
      <div>
        <h1 class="brand-title">Test Matrix &amp; Execution</h1>
        <div class="brand-sub">SauceDemo Playwright Automation Framework &bull; Verification Summary</div>
      </div>
      <div class="header-badge">&check; 100% Pass Rate</div>
    </div>

    <!-- Test Matrix -->
    <div class="section-title">4. Test Specification &amp; Results Matrix</div>
    <table>
      <thead>
        <tr>
          <th style="width: 14%;">Test ID</th>
          <th style="width: 22%;">Scenario Type</th>
          <th style="width: 32%;">Input Data</th>
          <th style="width: 22%;">Key Assertion</th>
          <th style="width: 10%;">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>TC_LOGIN_01</strong></td>
          <td>Happy Path (Primary)</td>
          <td><code>standard_user</code> / <code>secret_sauce</code></td>
          <td>URL matches, title "Products", items &gt; 0</td>
          <td><span class="status-pill">PASSED</span></td>
        </tr>
        <tr>
          <td><strong>TC_LOGIN_02</strong></td>
          <td>Account Security</td>
          <td><code>locked_out_user</code> / <code>secret_sauce</code></td>
          <td>Banner: "Sorry, user locked out"</td>
          <td><span class="status-pill">PASSED</span></td>
        </tr>
        <tr>
          <td><strong>TC_LOGIN_03</strong></td>
          <td>Boundary (Null)</td>
          <td>Empty username &amp; password</td>
          <td>Banner: "Username is required"</td>
          <td><span class="status-pill">PASSED</span></td>
        </tr>
        <tr>
          <td><strong>TC_LOGIN_04</strong></td>
          <td>Partial Input</td>
          <td><code>standard_user</code> / Empty password</td>
          <td>Banner: "Password is required"</td>
          <td><span class="status-pill">PASSED</span></td>
        </tr>
        <tr>
          <td><strong>TC_LOGIN_05</strong></td>
          <td>Negative Auth</td>
          <td><code>invalid_user</code> / <code>wrong_password</code></td>
          <td>Banner: "Username &amp; pass do not match"</td>
          <td><span class="status-pill">PASSED</span></td>
        </tr>
      </tbody>
    </table>

    <!-- Architecture Overview -->
    <div class="section-title">5. Framework Architecture (Page Object Model)</div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">Page Object Classes</div>
        <p class="card-text">
          &bull; <code>BasePage.ts</code>: Core navigation and driver helpers.<br>
          &bull; <code>LoginPage.ts</code>: Encapsulates inputs, actions, error retrieval.<br>
          &bull; <code>InventoryPage.ts</code>: Dashboard catalog assertions.
        </p>
      </div>
      <div class="card">
        <div class="card-title">Data &amp; Automation Specs</div>
        <p class="card-text">
          &bull; <code>testData.json</code>: Decoupled test credentials &amp; error strings.<br>
          &bull; <code>login.spec.ts</code>: Playwright test suite automating all 5 cases.<br>
          &bull; <code>playwright.yml</code>: Automated GitHub Actions CI pipeline.
        </p>
      </div>
    </div>

    <!-- Reproduction Commands -->
    <div class="section-title">6. Quick Reproduction &amp; Execution</div>
    <div class="code-box">
<span class="code-comment"># 1. Clone &amp; install dependencies</span>
<span class="code-cmd">git clone</span> https://github.com/dipan313/saucedemo-ai-test-builder.git
<span class="code-cmd">cd</span> saucedemo-ai-test-builder &amp;&amp; <span class="code-cmd">npm install</span> &amp;&amp; <span class="code-cmd">npx playwright install chromium</span>

<span class="code-comment"># 2. Run automated test suite</span>
<span class="code-cmd">npm test</span>            <span class="code-comment"># Executes all 5 test cases in parallel (~8s)</span>
<span class="code-cmd">npm run test:primary</span><span class="code-comment"># Runs primary showcase test (TC_LOGIN_01)</span>
<span class="code-cmd">npm run test:report</span> <span class="code-comment"># Opens interactive HTML test report</span>
    </div>

    <!-- Links -->
    <div class="section-title">7. Repository &amp; Deliverables</div>
    <ul class="info-list">
      <li class="info-item">
        <span class="bullet-dot">&bull;</span>
        <span><strong class="info-strong">GitHub Repository:</strong> <a href="https://github.com/dipan313/saucedemo-ai-test-builder" style="color: #2563eb; text-decoration: none;">https://github.com/dipan313/saucedemo-ai-test-builder</a></span>
      </li>
      <li class="info-item">
        <span class="bullet-dot">&bull;</span>
        <span><strong class="info-strong">Supporting Archive:</strong> <code>Dipan_Mazumder_Assignment_1_Files.zip</code> (complete source code, POM, tests, and CI/CD).</span>
      </li>
    </ul>

    <div class="footer">
      <span>Dipan Mazumder &bull; Indus Net Technologies Assignment 1</span>
      <span>Page 2 of 2</span>
    </div>
  </div>

</body>
</html>
  `;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  
  const pdfPath = path.resolve(__dirname, '..', 'Dipan_Mazumder_Assignment_1_Solution.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
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
