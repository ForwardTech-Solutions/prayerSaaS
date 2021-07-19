/* eslint-disable no-undef */
/// <reference types="Cypress" />


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
    
    
})