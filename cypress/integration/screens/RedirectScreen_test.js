/* eslint-disable no-undef */
/// <reference types="Cypress" /> 

import "../../support/auth-provider-commands/cognito"

describe("RedirectScreen Tests", function () {

    beforeEach(function () {

     })


    it('shows you "incorrect URL" on an bad URL', () => {
        cy.visit('/Redirect/tommyboy')
        cy.contains('Error: invalid URL', { timeout: 1500 })


    })

    /// <summary>
    /// This test assumes there is a dict entry with id d6829560-f172-11eb-9996-a15b77d1212d that sends you to email-signup/test_Group_1
    /// </summary>
    it('redirects you on a good URL (assumes data)', () => {

        cy.visit('/Redirect/d6829560-f172-11eb-9996-a15b77d1212d')
        cy.url().should('include', 'test_Group_1')

    })



})