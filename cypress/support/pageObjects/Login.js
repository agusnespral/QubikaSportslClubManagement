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

export const LoginPage = new Login