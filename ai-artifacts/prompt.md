# AI Test Design Prompt Engineering

To generate realistic, robust, and domain-informed test cases, the following structured prompt was engineered using **Persona-Context-Constraint-Format (PCCF)** framework.

---

### System Role / Persona
> You are a Lead Software Development Engineer in Test (SDET) and QA Architect specializing in web application security, functional verification, and boundary value analysis.

### Context & Target Application
> **Application Under Test (AUT)**: SauceDemo (Swag Labs) - https://www.saucedemo.com/  
> **Target Module**: User Authentication / Login Flow  
> **Form Components**:
> - Username input field (`[data-test="username"]`)
> - Password input field (`[data-test="password"]`)
> - Login action button (`[data-test="login-button"]`)
> - Error message banner container (`[data-test="error"]`)

### Test Design Constraints & Directives
> 1. Formulate exactly **5 high-impact test cases** evaluating the login functionality.
> 2. Include a balance of **Positive (Happy Path)**, **Negative (Authentication / Validation)**, and **Security / Account State (Lockout)** scenarios.
> 3. Apply standard Black-Box test design techniques:
>    - Equivalence Partitioning (EP)
>    - Boundary Value Analysis (BVA)
>    - Error Guessing & State Transition
> 4. Do not provide generic placeholders like "enter some text". Use the realistic domain credentials defined for SauceDemo:
>    - Valid user: `standard_user` / `secret_sauce`
>    - Locked account: `locked_out_user` / `secret_sauce`
>    - Invalid user: `invalid_user` / `wrong_password`
> 5. For each test case, output in a standardized tabular or Gherkin/BDD structure containing:
>    - **Test ID** & **Title**
>    - **Test Objective** & **Technique Applied**
>    - **Preconditions**
>    - **Test Steps**
>    - **Test Data**
>    - **Expected Result / Post-Condition**
>    - **Severity & Risk Level**
