describe('Technical test - Excercise 3', function () {


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
  }); */

  it('', () => {
    cy.visit(Cypress.env().baseUrl)
  });

  
})