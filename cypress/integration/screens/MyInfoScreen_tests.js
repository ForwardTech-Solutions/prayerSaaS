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
        cy.visit('/me')
        cy.contains("Here's what we know about you")

    })

    it('loads from Dashboard', () => {
        cy.get('[data-testid="MyInfo_link"]')
            .click()

        cy.url().should('include', '/me')
        cy.contains("Here's what we know about you")
        
    })

    
    it('contains all expected fields', () => {
        cy.visit('/me')

        cy.contains("awsID")
        cy.contains("pSaaS User")
        cy.contains("id")
        cy.contains("username")

    })


    
    
})