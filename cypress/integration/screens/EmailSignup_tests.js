/* eslint-disable no-undef */
/// <reference types="Cypress" />

import "../../support/recaptchaCommands"


describe("MyPrayerScreen Tests", function () {

    beforeEach(function () {
        cy.visit('/email-signup/test_Group_1')

    })

    /// <summary>
    /// This test assumes there is a group named test_Group_1 that accepts prayer requests
    /// Scenario: User can sign up for a new account
    /// </summary>
    it('loads elements correctly', () => {

        cy.get('[data-testid="EmailSignup_title"]')         //title (text doesnt matter)
        cy.get('[id="EmailSignup_email_form"]')    //form
        cy.contains("Sign Up")                              //sign up button

    })

    
    it('has a form can be filled out', () => {
        cy.contains("Sign Up")                              //sign up button

        cy.get('[id="EmailSignup_email_form"]')    //form
            .type("hello")
            .should('have.value', 'hello')
            .type("{backspace}{backspace}{backspace}{backspace}{backspace}")
        
        
    })

   it('validates email correctly via REGEX', () => {
        
    
        //intercept network requests
        cy.intercept("POST","https://45al5921x1.execute-api.us-east-1.amazonaws.com/dev/email", {})
        

        ///// catches bad email
            //fill in "hello"
            cy.get('[id="EmailSignup_email_form"]')    //form
                .type("hello")
                .should('have.value', 'hello')
            
            //click recapcha
            cy.clickGoogleReCAPTCHA()

            //click
            cy.contains("Sign Up")                     //sign up button
                .click()

            //error message appears
            cy.contains("Email address invalid")


        ///// allows good email

            //fill in "supertom500@gmail.com" (after deleting 'hello')
            cy.get('[id="EmailSignup_email_form"]')    //form
                .type("{backspace}{backspace}{backspace}{backspace}{backspace}supertom500@gmail.com")
                .should('have.value', 'supertom500@gmail.com')

            //click
            cy.contains("Sign Up")                              //sign up button
                .click()

            //success messsage appears
            cy.contains("Successfully")
            
    })
    
    
})