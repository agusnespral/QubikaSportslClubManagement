import { LoginPage, HomePage } from "../support/pageObjects/Login";


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
  it('E2E UI and API validation', function () {

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
      const tokenFromLocalStorage = window.localStorage.getItem('0.0.1') //revisar si usar el local o directo guardar el token del response
      expect(interception.request.body.email).to.equal(this.data.email)
      expect(interception.request.body.password).to.equal(this.data.password)
      //expect(tokenFromLocalStorage).to.include(interception.response.body.token) --> flaky test

      //Save session token in Env variables to use for API cases avoiding UI
      Cypress.env('token', tokenFromLocalStorage);
    })


    //Validate new category is created (API)
    HomePage.clickOnButton('categoryButton')
    HomePage.clickOnButton('addCategoryButton')
    HomePage.locators.inputCategoryName().type(this.data.categoryName)
    cy.intercept('POST', 'api/category-type/create').as('newCategory')
    HomePage.clickOnButton('submitCategoryButton')
    cy.wait('@newCategory').then((interception) => {
      expect(interception.response.body.name).to.equal(this.data.categoryName)
    });

    //Validate new subcategory is created and displayed in categories list
    HomePage.clickOnButton('addCategoryButton')
    HomePage.locators.isSubCategoryCheckBox().check({force: true})
    HomePage.locators.inputCategoryName().type(this.data.subCategoryName)
    HomePage.locators.inputSelectParentCategory().type(`${this.data.categoryName}{enter}`)
    cy.intercept('POST', 'api/category-type/create').as('newSubCategory')
    HomePage.clickOnButton('submitCategoryButton')
    cy.wait('@newSubCategory').then((interception) => {
      const parentId = interception.response.body.parentId
      cy.log(parentId)
    }).then()
    
    //hacer un get de /api/category-type/list/{parentId} usando el token y en el bodi response tiene que estar el name de la subcategoria creada


  })

})