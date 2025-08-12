import { checkoutPageData, CheckoutPageMessage, CheckoutPageTitle } from "../e2e/data-files/checkoutPageData";
import { checkoutPageElements } from "../e2e/element-files/checkoutPageElements";
import { commonElements } from "../e2e/element-files/commonElements";
import { loginElements } from "../e2e/element-files/loginPageElements";
import { productsPageElements } from "../e2e/element-files/productPageElements";

//Login Without Credentials Function
export function loginWithoutCredentials(username, usernameValidationMessage, passwordValidationMessage, apptitle) {

    //Assert The Login Page Title
    cy.get(loginElements.loginPageTitle).should('be.visible').contains(apptitle)

    //Required Messages Assertion for the username
    cy.get(loginElements.loginButton).should('be.visible').click()
    cy.get(loginElements.errorMessage).should('be.visible').contains(usernameValidationMessage)
    cy.wait(500)

    cy.get(loginElements.userName).should('be.visible').type(username);

    //Required Messages Assertion for the Password
    cy.get(loginElements.loginButton).should('be.visible').click()
    cy.get(loginElements.errorMessage).should('be.visible').contains(passwordValidationMessage)
    cy.wait(500)

    //Cancel the Required Message
    cy.get(loginElements.CancelButton).should('be.visible').click()
}

//Login With Credentials Function
export function loginWithCredentials(email, password) {

    cy.get(loginElements.userName).should('be.visible').type(email)
    cy.get(loginElements.password).should('be.visible').type(password)
    cy.get(loginElements.loginButton).should('be.visible').click()
    cy.wait(500)
}

//Sorting The Product
export function sortingTheProduct(selector, sortCategory) {

    cy.get(productsPageElements.sortingDropdownField).should('be.visible').select(sortCategory).wait(500);

    const isNameSort = sortCategory.includes("Name");

    cy.get(selector).then(($items) => {
        const actualValues = [...$items].map(item =>
            isNameSort
                ? item.innerText.trim()
                : parseFloat(item.innerText.replace(/[^0-9.]/g, ""))
        );

        const sortedValues = [...actualValues].sort((a, b) => {
            if (isNameSort) {
                return sortCategory.includes("(A to Z)")
                    ? a.localeCompare(b)
                    : b.localeCompare(a);
            }
            return sortCategory.includes("low to high") ? a - b : b - a;
        });

        expect(actualValues).to.deep.equal(sortedValues);
    });
}

//Add To Cart Function
export function addToCart(quantity) {
    for (let i = 0; i < quantity; i++) {
        cy.get(productsPageElements.addToCartButton).eq(i).should('be.visible').click();
    }
}
//Remove The Product From The Cart Function
export function removeProductFromCart() {
    cy.get(productsPageElements.cartButton).should('be.visible').click();
    cy.wait(2000)

    //Remove the 2nd Product from The Cart
    cy.get(productsPageElements.removeItemButton).eq(1).should('be.visible').click();

    return cy.get(productsPageElements.itemPrice).eq(0).invoke('text').then((priceText1) => {
        const firstItemPrice = parseFloat(priceText1.replace(/[^0-9.]/g, ""));
        Cypress.env("firstItemPrice", firstItemPrice);

        return cy.get(productsPageElements.itemPrice).eq(1).invoke('text').then((priceText2) => {
            const secondItemPrice = parseFloat(priceText2.replace(/[^0-9.]/g, ""));
            Cypress.env("secondItemPrice", secondItemPrice);
        });
    });
}

//Proceed to Checkout
export function proceedToCheckout(firstName, lastName, postalCode, checkoutPageTitle, checkoutOverviewTitle, totalPriceLabel) {
    cy.get(productsPageElements.checkoutButton).should('be.visible').click();

    //Assert The Checkout Page Title
    cy.get(commonElements.title).should('be.visible').contains(checkoutPageTitle);

    //Fill up all the Field's Information
    cy.get(checkoutPageElements.firstName).should('be.visible').type(firstName);
    cy.get(checkoutPageElements.lastName).should('be.visible').type(lastName);
    cy.get(checkoutPageElements.postalCode).should('be.visible').type(postalCode);

    cy.get(checkoutPageElements.continueButton).should('be.visible').click();

    cy.get(commonElements.title).should('be.visible').contains(checkoutOverviewTitle);

    const firstItemPrice = Cypress.env("firstItemPrice");
    const secondItemPrice = Cypress.env("secondItemPrice");

    const itemTotal = firstItemPrice + secondItemPrice;
    const tax = +(itemTotal * 0.08).toFixed(2);
    const grandTotal = +(itemTotal + tax).toFixed(2);

    cy.get(checkoutPageElements.totalPriceLabel).should('be.visible').contains(totalPriceLabel);
    cy.get(checkoutPageElements.itemTotalPrice).should('contain', itemTotal.toFixed(2));
    cy.get(checkoutPageElements.itemTax).should('contain', tax.toFixed(2));
    cy.get(checkoutPageElements.grandTotalPrice).should('contain', grandTotal.toFixed(2));

    cy.get(checkoutPageElements.finishButton).should('be.visible').click();

    cy.get(checkoutPageElements.successfullMessage).should('be.visible').contains(CheckoutPageMessage.successfullMessage);
    cy.get(checkoutPageElements.backHomeButton).should('be.visible').click();

}
