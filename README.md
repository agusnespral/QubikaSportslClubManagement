# QubikaSportClubManagement

Qubika Technical Test - Exercise 3 - UI and API with Cypress-JS

## Step-by-step setup and execution

1. Open your terminal and verify that Node.js and npm are installed:
    ```bash
    node -v
    npm -v
    ```
    If they are not installed, download and install Node.js from [nodejs.org](https://nodejs.org/).

2. Clone the repository by running:
    ```bash
    git clone https://github.com/agusnespral/QubikaSportslClubManagement.git
    ```

3. Navigate into the project directory:
    ```bash
    cd QubikaWebsite
    ```

4. Install all dependencies listed in `package.json`:
    ```bash
    npm install
    ```

5. To run the test suite in headless mode, execute:
    ```bash
    npx cypress run
    ```
    To specify a browser, use:
    ```bash
    npx cypress run --browser chrome
    npx cypress run --browser edge
    npx cypress run --browser firefox
    ```

6. To open the Cypress Test Runner and execute tests interactively:
    ```bash
    npx cypress open
    ```
    * Click on **"E2E Testing"**
    * Select a browser
    * Click on **"Start E2E Testing in..."**
    * Click on `spec.cy.js`

## Solution Overview

The goal of this test was to validate all six steps of the exercise using both UI and API testing. The current state of the suite is a **work in progress** rather than a final version, as some validations were chosen to be performed via UI and others via API to showcase different approaches suitable for the requirements.

The suite registers a new user in the `before` hook, generating a **random email** to ensure a new user is created in each run. Environment variables are used to store and reuse data throughout the test, such as the randomly generated email.

During execution, each required step of the exercise is followed. Comments have been added to improve code readability. At the end of the test, a **DELETE request** is made to remove the categories and subcategories created during execution.

## Framework Choice

Cypress provides an excellent solution for **end-to-end testing**, allowing UI and API validations to be performed simultaneously. One of its key advantages is the ability to **intercept API requests**, which is highly useful in this scenario. Additionally, my previous experience with Cypress influenced my decision to use this framework.

## Potential Enhancements

Given the available time, the priority was to develop a **minimum viable product** that meets the requirements. However, in a real project, this code would not yet be ready for merging.

### Areas for improvement:
- Improve **code readability** by moving API requests and other logic out of the test file and into the Page Object Model (POM) or Utils module.
- Enhance **locator quality** and refine their selection.
- Improve the **E2E coverage**, ensuring that all steps are validated through both UI and API when appropriate.

