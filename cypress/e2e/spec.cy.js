import { LoginPage } from "../support/pageObjects/Login";

describe('Technical test - Excercise 3', function () {

  beforeEach(function () {
    cy.fixture('data.json').as('data')
  });
  /* before('Register a new user trough API and save user information', function () {
    
    cy.fixture('data.json').then((data) => {
      this.data = data;

      cy.request({
        method: 'POST',
        url: `${Cypress.env().apiUrl}/auth/register`,

        body: {
          "email": this.data.email,
          "password": this.data.password,
          "roles": [
            this.data.roles
          ]
        }
      })
    });
  }); 
 */
  it('E2E UI and API validation', function() {

    //Validate that the login page is displayed correctly
    cy.visit(Cypress.env().baseUrl);
    cy.url().should('eq', Cypress.env().baseUrl);
    LoginPage.locators.emailPlaceholder().should("be.visible");
    LoginPage.locators.passwordPlaceholder().should("be.visible");

    /*Validate User Email and Pass are sent correctly through API on Login and 
    token from POST response body is the same as the one stored in local */
    LoginPage.locators.emailPlaceholder().type(this.data.email)
    LoginPage.locators.passwordPlaceholder().type(this.data.password)
    cy.intercept('POST', 'api/auth/login').as('userLogin')
    LoginPage.locators.submitButton().click()
    cy.wait('@userLogin').then((interception) => {
      const tokenFromLocalStorage = window.localStorage.getItem('0.0.1') 
      expect(interception.request.body.email).to.equal(this.data.email)
      expect(interception.request.body.password).to.equal(this.data.password)
      expect(tokenFromLocalStorage).to.include(interception.response.body.token)

      //Save session token in Env variables to reuse it for login via API 
      Cypress.env('token', tokenFromLocalStorage);
      
    })
  });
 
})