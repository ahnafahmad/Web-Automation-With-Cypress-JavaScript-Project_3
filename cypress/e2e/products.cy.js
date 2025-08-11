import { addToCart, loginWithCredentials, proceedToCheckout, removeProductFromCart, sortingTheProduct } from "../support/utils";
import { loginData, paths } from "./data-files/loginPageData";
import { productsPageData } from "./data-files/productsPageData";
import { productsPageElements } from "./element-files/productPageElements";

describe('Products Page\'s Features Testing', () => {

    beforeEach(function () {
        cy.visit(paths.homepage)

        //Login Again with the Valid Credentials
        loginWithCredentials(loginData.correctUserName, loginData.correctPassword);
    })

    it('Sorting The Product By Name', () => {
        sortingTheProduct(productsPageElements.itemName, productsPageData.firstSortingCategory);
    })

    it('Sorting The Product By Price', () => {
        sortingTheProduct(productsPageElements.itemPrice, productsPageData.secondSortingCategory);
    })

    it.only('Add, Remove, Checkout Feature Testing', () => {

        //Add Product To The Cart
        addToCart(productsPageData.productQuantity);
        cy.wait(1000)

        //Remove Product From The Cart
        removeProductFromCart();

        //Proceed to Checkout 
        proceedToCheckout()
    })
})
