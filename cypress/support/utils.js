import { checkoutPageData, CheckoutPageTitle } from "../e2e/data-files/checkoutPageData";
import { loginData, message, title } from "../e2e/data-files/loginPageData";
import { productsPageData } from "../e2e/data-files/productsPageData";
import { checkoutPageElements } from "../e2e/element-files/checkoutPageElements";
import { commonElements } from "../e2e/element-files/commonElements";
import { loginElements } from "../e2e/element-files/loginPageElements";
import { productsPageElements } from "../e2e/element-files/productPageElements";

//Login Without Credentials Function
export function loginWithoutCredentials() {

    //Assert The Login Page Title
    cy.get(loginElements.loginPageTitle).should('be.visible').contains(title.appTitle)

    //Required Messages Assertion for the username
    cy.get(loginElements.loginButton).should('be.visible').click()
    cy.get(loginElements.errorMessage).should('be.visible').contains(message.usernameValidationMessage)
    cy.wait(500)

    cy.get(loginElements.userName).should('be.visible').type(loginData.correctUserName);

    //Required Messages Assertion for the Password
    cy.get(loginElements.loginButton).should('be.visible').click()
    cy.get(loginElements.errorMessage).should('be.visible').contains(message.passwordValidationMessage)
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
export function removeProductFromCart(firstItemPriceElement, secondItemPriceElement) {
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
export function proceedToCheckout() {
    cy.get(productsPageElements.checkoutButton).should('be.visible').click();

    //Assert The Checkout Page Title
    cy.get(commonElements.title).should('be.visible').contains(CheckoutPageTitle.checkOutTitle);

    //Fill up all the Field's Information
    cy.get(checkoutPageElements.firstName).should('be.visible').type(checkoutPageData.firstName);
    cy.get(checkoutPageElements.lastName).should('be.visible').type(checkoutPageData.lastName);
    cy.get(checkoutPageElements.postalCode).should('be.visible').type(checkoutPageData.postalCode);

    cy.get(checkoutPageElements.continueButton).should('be.visible').click();

    cy.get(commonElements.title).should('be.visible').contains(CheckoutPageTitle.checkoutOverviewTitle);

    const firstItemPrice = Number(Cypress.env("firstItemPrice"));
    const secondItemPrice = Number(Cypress.env("secondItemPrice"));

    const itemTotal = firstItemPrice + secondItemPrice;
    const tax = +(itemTotal * 0.08).toFixed(2);
    const grandTotal = +(itemTotal + tax).toFixed(2);

    cy.get(checkoutPageElements.itemTotalPrice).should('contain', itemTotal.toFixed(2));
    cy.get(checkoutPageElements.itemTax).should('contain', tax.toFixed(2));
    cy.get(checkoutPageElements.grandTotalPrice).should('contain', grandTotal.toFixed(2));

}
