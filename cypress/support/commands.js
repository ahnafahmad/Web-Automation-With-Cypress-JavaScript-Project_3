Cypress.Commands.add('elementExists', (selector) => {
    cy.wait(3000);
    return cy.window().then($window => $window.document.querySelector(selector));
});