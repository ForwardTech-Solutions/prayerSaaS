/* eslint-disable no-undef */
/// <reference types="Cypress" />

import "../../support/auth-provider-commands/cognito"

describe("MyPrayerScreen Tests", function () {

    beforeEach(function () {
        cy.loginByCognitoApi(
            Cypress.env('Cognito_Username'),
            Cypress.env('Cogntio_Password')
        )
    })

    it('loads from URL path', () => {
        cy.visit('/prayer')
        cy.contains("Prayers")

    })

    it('loads from Dashboard', () => {
        cy.get('[data-testid="MyPrayers_link"]')
            .click()

        cy.url().should('include', '/prayer')
        cy.contains("Prayers")
        
    })

    
    it('contains the AddPrayerButton component', () => {
        cy.contains("Create Prayer")
        cy.get('[data-testid="AddPrayerButton_input_field"]')
            .type("hello world")
            .should('have.value', 'hello world')
    })


    
    
})