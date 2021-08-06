/* eslint-disable no-undef */
/// <reference types="Cypress" />

import "../../support/auth-provider-commands/cognito"

describe("createAndDelete.js: Create a prayer from dashboard, load it, and delete it", function () {

    beforeEach(function () {
        cy.loginByCognitoApi(
            Cypress.env('Cognito_Username'),
            Cypress.env('Cogntio_Password')
        )
    })

    // create a new prayer name with random number between 1 and 1000
    var prayerName = "TestPrayer" + Math.floor(Math.random() * 1000)

    it('creates the prayer', () => {
        //cy.visit('/')
        cy.get('[data-testid="AddPrayerButton_input_field"]')
            .type(prayerName)
        cy.contains('Create Prayer').click()

        

        //confirm that the prayer was created
        cy.contains(prayerName)
        cy.wait(2000)   // give time for prayer to sumbmit before next tests
    })

    it('loads the prayer and delete the prayer', () => {
        
        // cy.pause()
        //finds and loads the prayer
        cy.contains(prayerName)
            .click()

        //clicks the delete button
        cy.contains('Delete this')
            .click()

        //confirms deletion
        cy.contains(prayerName).should('not.exist')

    })

    
    // it('contains the AddPrayerButton component', () => {
    //     cy.contains("Create Prayer")
    //     cy.get('[data-testid="AddPrayerButton_input_field"]')
    //         .type("hello world")
    //         .should('have.value', 'hello world')
    // })


    
    
})