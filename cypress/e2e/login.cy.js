import { loginWithCredentials, loginWithoutCredentials } from "../support/utils"
import { loginData, message, paths, title } from "./data-files/loginPageData"
import { commonElements } from "./element-files/commonElements"
import { loginElements } from "./element-files/loginPageElements"

describe('Login Feature Testing', () => {

    beforeEach(function () {
        cy.visit(paths.homepage)
    })

    it('Login Without Any Credentials', () => {

        //Login Without Credentials
        loginWithoutCredentials(loginData.correctUserName,message.usernameValidationMessage, message.passwordValidationMessage, title.appTitle);

    })

    it('Login Failed With Wrong Credentials', () => {

        //Login with the Invalid Credentials
        loginWithCredentials(loginData.wrongUserName, loginData.wrongPassword);

        //Required Messages Assertion for the Invalid Credentials
        cy.get(loginElements.errorMessage).should('be.visible').contains(message.wrongCredentialsErrorMessage)

        //Cancel the Required Message
        cy.get(loginElements.CancelButton).should('be.visible').click()
    })

    it('Login successful with valid credentials', () => {

        //Login Again with the Valid Credentials
        loginWithCredentials(loginData.correctUserName, loginData.correctPassword);

        //Assert The Product Page Title after Logged in
        cy.get(loginElements.appLogo).should('be.visible').contains(title.appTitle)
        cy.get(commonElements.title).should('be.visible').contains(title.productsPageTitle)

    })
})