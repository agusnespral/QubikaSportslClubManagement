import { LoginPage, HomePage } from "../support/pageObjects/Login";

describe('Technical test - Excercise 3', function () {

  beforeEach(function () {
    cy.fixture('data.json').as('data');
  });

  before('Register a new user trough API and save user information', function () {
    cy.fixture('data.json').then((data) => {
      this.data = data 

      //create a random email
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      const email = `testuser${randomNumber}@qubika.com`;

      cy.request({
        method: 'POST',
        url: `${Cypress.env().apiUrl}/auth/register`,
        body: {
          "email": email,
          "password": this.data.password,
          "roles": [this.data.roles]
        }
      }).then((response) => {
        Cypress.env('email', response.body.email); //save random email on env to reuse on next cases
      });
    });
  });

  it('E2E UI and API validation', function () {
    // Validate that the login page (URL, email and password placeholders)is displayed correctly 
    cy.visit(Cypress.env().baseUrl);
    cy.url().should('eq', Cypress.env().baseUrl);
    LoginPage.locators.emailPlaceholder().should("be.visible");
    LoginPage.locators.passwordPlaceholder().should("be.visible");

    // Validate User Email and Pass are sent correctly through API and returns status code 200 on Login
    LoginPage.locators.emailPlaceholder().type(Cypress.env('email'));
    LoginPage.locators.passwordPlaceholder().type(this.data.password);
    cy.intercept('POST', 'api/auth/login').as('userLogin');
    LoginPage.locators.submitButton().click();
    cy.wait('@userLogin').then((interception) => {
      expect(interception.request.body.email).to.equal(Cypress.env('email'));
      expect(interception.request.body.password).to.equal(this.data.password);
      expect(interception.response.statusCode).to.equal(200);
      Cypress.env('token', interception.response.body.token); //save token on env to re use it on next request
    });

    // Validate new category is created via UI and verify its creation through API
    HomePage.clickOnButton('categoryButton');
    HomePage.clickOnButton('addCategoryButton');
    HomePage.locators.inputCategoryName().type(this.data.categoryName);
    cy.intercept('POST', 'api/category-type/create').as('newCategory');
    HomePage.clickOnButton('submitCategoryButton');
    cy.wait('@newCategory').then((interception) => {
      expect(interception.response.body.name).to.equal(this.data.categoryName);
      Cypress.env('categoryId', interception.response.body.id); //save categoryId on env
    });

    // Validate new subcategory is created through UI and displayed in categories list (API)
    HomePage.clickOnButton('addCategoryButton');
    HomePage.locators.isSubCategoryCheckBox().check({ force: true });
    HomePage.locators.inputCategoryName().type(`${this.data.subCategoryName}{enter}`);
    HomePage.locators.inputSelectParentCategory().type(`${this.data.categoryName}{enter}`);

    cy.intercept('POST', 'api/category-type/create').as('newSubCategory');
    HomePage.clickOnButton('submitCategoryButton');
    cy.wait('@newSubCategory').then((interception) => {
      Cypress.env('subCategoryId', interception.response.body.id); //save subCategoryId on env
     
    // GET all subcategories related to parent id and verified that new subcategory was created there 
      cy.request({
        method: 'GET',
        url: `${Cypress.env().apiUrl}/category-type/list/${interception.response.body.parentId}`,
        headers: {
          "Authorization": `Bearer ${Cypress.env('token')}`
        }
      }).then((response) => {
        const subCategoryId = Cypress.env('subCategoryId');
        expect(response.body.map(item => item.id)).to.include(subCategoryId);
      });

      //delete category and subcategory to clean the environment
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env().apiUrl}/category-type/delete/${Cypress.env('subCategoryId')}`,
        headers: {
          "Authorization": `Bearer ${Cypress.env('token')}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env().apiUrl}/category-type/delete/${Cypress.env('categoryId')}`,
        headers: {
          "Authorization": `Bearer ${Cypress.env('token')}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    });
  });
});
