import { loginElements } from "../e2e/element-files/loginPageElements";
import { productsPageElements } from "../e2e/element-files/productPageElements";

//Logout From the Application
Cypress.Commands.add('logout', () => {

    cy.get('body').then(($body) => {
        if ($body.find(productsPageElements.menuButton).length > 0) {
            cy.get(productsPageElements.menuButton).should('be.visible').click();
            cy.get(productsPageElements.logoutButton).should('be.visible').click();

            cy.get(loginElements.loginButton).should('be.visible')
        }
    })
})