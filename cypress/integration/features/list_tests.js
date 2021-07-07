/* eslint-disable no-undef */
/// <reference types="Cypress" />

import "../../support/auth-provider-commands/cognito"

describe("IndividualPrayerScreen Tests", function () {

    beforeEach(function () {
        cy.loginByCognitoApi(
            Cypress.env('Cognito_Username'),
            Cypress.env('Cogntio_Password')
        )
    })

    //assumes an item with id 079d0a30-ce06-11eb-b232-83b302e62eee exists
    it('loads from URL path', () => {

    })

    it('loads from Dashboard', () => {
     
    })

    
    // it('contains the AddPrayerButton component', () => {
    //     cy.contains("Create Prayer")
    //     cy.get('[data-testid="AddPrayerButton_input_field"]')
    //         .type("hello world")
    //         .should('have.value', 'hello world')
    // })


    
    
})