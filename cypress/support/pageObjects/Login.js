class Login {

    locators = {
        emailPlaceholder: () => cy.get("input[placeholder='Usuario o correo electrónico']"),
        passwordPlaceholder: () => cy.get("input[placeholder='Contraseña']"),
        submitButton: () => cy.get('.btn').contains('Autenticar')
        
    }

    //methods

    clickQubikaLogo() {
        this.locators.qubikaLogo().click();
    };

}

class Home {

    locators = {
        categoryButton: () => cy.get(':nth-child(3) > .nav-link'),
        addCategoryButton: () => cy.get('.btn.btn-primary'),
        inputCategoryName: () => cy.get('#input-username'),
        submitCategoryButton: () => cy.get('button[type="submit"]'),
        isSubCategoryCheckBox: () => cy.get('#customCheckMain'),
        inputSelectParentCategory: () => cy.get('.custom.ng-select')
    }

    //methods

    clickOnButton(button) {
        this.locators[button]().click();
    };

}

export const LoginPage = new Login()
export const HomePage = new Home()

