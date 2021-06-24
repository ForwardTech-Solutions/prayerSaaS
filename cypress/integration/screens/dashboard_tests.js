/* eslint-disable no-undef */
/// <reference types="Cypress" />

import "../../support/auth-provider-commands/cognito"

describe("Dashboard Tests", function () {

    beforeEach(function () {
        cy.loginByCognitoApi(
            Cypress.env('Cognito_Username'),
            Cypress.env('Cogntio_Password')
        )
    })


    it('finds the standard Dashboard elements', () => {
        //arrange - setup initial app state
        //  - visit a web page

        cy.contains("PrayerSaaS")   //logo text
        cy.get('[data-testid="PrayerSaaS_logo_image"]') //logo image
        cy.contains("Home") //home button on sidebar nav
        cy.contains("Sign out") //AWS sign out button

    })


    it('finds the non-standard Dashboard elements', () => {
        //arrange - setup initial app state
        //  - visit a web page

        cy.contains("MyPrayers")   //logo text

        cy.contains("Groups")

        cy.contains("My Info")

    })


    


})