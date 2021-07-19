/* eslint-disable no-undef */
/// <reference types="Cypress" />

import "../../support/auth-provider-commands/cognito"


describe("GroupAcceptPrayerScreen Tests", function () {

    beforeEach(function () {
    })

    /// <summary>
    /// This test assumes there is a group with id 63adf880-bd93-11eb-a02b-dd913b116243 that accepts prayer requests
    /// </summary>
    it('loads elements correctly', () => {
        cy.visit('/GroupAcceptPrayerScreen/63adf880-bd93-11eb-a02b-dd913b116243')

        cy.get('[data-testid="PrayerAccept_title"]')        //title (text doesnt matter)
        cy.get('[id="PrayerScreen_prayer_form"]')           //prayer form
        cy.get('[id="PrayerScreen_name_form"]')             //name form
        cy.contains("Submit")                              //sign up button

        
    })

    
    it('has forms that can be filled out', () => {
        cy.contains("Submit")                              //sign up button

        cy.get('[id="PrayerScreen_name_form"]')           //name form
            .type("TestName")

        cy.get('[id="PrayerScreen_prayer_form"]')    //form
            .type("hello")
            .should('have.value', 'hello')
            .type("{backspace}{backspace}{backspace}{backspace}{backspace}")
        

        cy.get('[id="PrayerScreen_prayer_form"]')    //form
            .type("hello")
            .should('have.value', 'hello')
            .type("{backspace}{backspace}{backspace}{backspace}{backspace}")   
        
    })

   it('validates no bad words correctly', () => {
        
    
        //intercept network requests
        cy.intercept("POST","https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/prayer/unauthorized", {})
        

        ///// catches bad email
            //fill in "slut"
            cy.get('[id="PrayerScreen_prayer_form"]')    //form
                .type("slut")
                .should('have.value', 'slut')
            
            //click
            cy.contains("Submit")                     //Submit button
                .click()

            //error message appears
            cy.contains("bad word")


        ///// allows good email

            //fill in "For this test to pass" (after deleting 'slut')
            cy.get('[id="PrayerScreen_prayer_form"]')    //form
                .type("{backspace}{backspace}{backspace}{backspace}{backspace}For this test to pass")
                .should('have.value', 'For this test to pass')

            //click
            cy.contains("Submit")                              //Submit button
                .click()

            //success messsage appears
            cy.contains("Successfully")
            
    })
    

    /// <summary>
    /// Test assumes there is a group with id 63adf880-bd93-11eb-a02b-dd913b116243 that accepts prayer requests
    /// Test assumes there is a group with id b4df2f00-bf26-11eb-81da-2b6b2a640c68 that does NOT accept prayer requests
    /// </summary>
    it('validates that the group link is valid', () => {
            
        cy.visit('/GroupAcceptPrayerScreen/63adf880-bd93-11eb-a02b-dd913b116243')
            cy.contains("Submit")                              //sign up button

        cy.visit('/GroupAcceptPrayerScreen/b4df2f00-bf26-11eb-81da-2b6b2a640c68')
            cy.contains("not accepting prayer")

        cy.visit('/GroupAcceptPrayerScreen/invalidName')
            cy.contains("does not exist")

            
    })



    it('proves that leaving the name field blank results in fullName being "Anonymous"', () => {
            
        var prayerBody = "TestPrayer" + Math.floor(Math.random() * 1000)

        //enter in the prayer without a name (unauthorized)
        cy.visit('/GroupAcceptPrayerScreen/63adf880-bd93-11eb-a02b-dd913b116243')          

            cy.get('[id="PrayerScreen_prayer_form"]')    //form
                .type(prayerBody)

            cy.contains("Submit")                              //sign up button
                .click()


        cy.loginByCognitoApi(
            Cypress.env('Cognito_Username'),
            Cypress.env('Cogntio_Password')
        )

        //visit home authorized, and click on the prayer
        cy.visit('/')
            cy.contains(prayerBody)
                .click()

        //should contain "Anonymous"
        cy.contains("Anonymous")

        cy.contains('Delete')
            .click()

    })


    it('proves that system works with a name included', () => {
            
        var prayerBody = "TestPrayer" + Math.floor(Math.random() * 1000)

        //enter in the prayer without a name (unauthorized)
        cy.visit('/GroupAcceptPrayerScreen/63adf880-bd93-11eb-a02b-dd913b116243')          

            cy.get('[id="PrayerScreen_prayer_form"]')    //form
                .type(prayerBody)

            cy.get('[id="PrayerScreen_name_form"]')    //form
                .type('testName')

            cy.contains("Submit")                              //sign up button
                .click()


        cy.loginByCognitoApi(
            Cypress.env('Cognito_Username'),
            Cypress.env('Cogntio_Password')
        )

        //visit home authorized, and click on the prayer
        cy.visit('/')
            cy.contains(prayerBody)
                .click()

        //should contain "Anonymous"
        cy.contains("testName")
        cy.contains(prayerBody)

        cy.contains('Delete')
            .click()

    })
    
})