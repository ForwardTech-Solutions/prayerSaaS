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


    
    ///<summary>
    /// this test assumes theres a list with id 6ad60f20-d8f6-11eb-948a-ab706763a651 and title 'Rolls Royce Pull up'
    ///</summary>
    it('loads from URL path (assumes data)', () => {
        cy.visit('/list/6ad60f20-d8f6-11eb-948a-ab706763a651')

        cy.wait(1500)

        //how you know its individual_list_screen
        cy.get('[data-testid="thisList_title"]')
            .contains('Rolls Royce Noice')





        cy.visit('/')
        cy.contains('Rolls Royce Noice')
            .click()

        cy.wait(1500)

        //how you know its individual_list_screen
        cy.get('[data-testid="thisList_title"]')
            .contains('Rolls Royce Noice')

    })


   


    it("can create a new list", function () {

        cy.window().then(($win) => {
            cy.stub($win, 'prompt').returns('Test Name New List')
        })

        //cy.visit('/')
        cy.get("[data-testid='List_newListButton']")
            .click()

        cy.contains('Test Name New List', { timeout: 10000 })

    })

    ///<summary>
    /// this test assumes theres a emailGroup called test_Group_1
    ///</summary>
    it("the send email blast workflow is functional", function () {

        //intercept network requests
        cy.intercept("POST","https://45al5921x1.execute-api.us-east-1.amazonaws.com/dev/send-email", {})
        


        //cy.visit('/')
        cy.contains('Test Name New List')
            .click()

        cy.contains('Send this List to Email Group')
            .click()
        
        cy.contains('Send to which Email Group')
        cy.get("[data-testid='test_Group_1_send_button']")
            .click()

        cy.contains('Emails sent')
    })





    var newListName = "Test"
    it('can change the list name', () => {
        //cy.visit('/')
        cy.contains('Test Name New List')
            .click()

        newListName = newListName +  Math.floor(Math.random() * 1000).toString()
        
        cy.window().then(($win) => {
            cy.stub($win, 'prompt').returns(newListName)
        })

        cy.get("[data-testid='thisList_title']")
            .contains('Test Name New List')

        //change list name
        cy.contains("Edit Name")
            .click()

        cy.contains(newListName)

    })

    it("can add prayer to the list -> remove prayer from the list -> delete the list", () => {
        //cy.visit('/')

        cy.contains(newListName)
            .click()


        //should have no prayers in the list
        cy.get("[data-testid='LinedList_PrayerCard']").should('not.exist')


        //add a prayer
        cy.contains("Add to This List")
            .click()   
        cy.get("[data-testid='IndividualList_AddPrayer_Modal']")
            .get('[type="checkbox"]')
            .first()
            .check()
        cy.contains("Add Selected to This List")
            .click()

        //should have one prayer in the list
        cy.get("[data-testid='LinedList_PrayerCard']")

        

        //remove that one prayer
        cy.wait(1000)
        cy.get('[type="checkbox"]')
            .first()
            .check()
        cy.contains("Remove Selected from This List")
            .click()

        //should have no prayers in the list
        cy.get("[data-testid='LinedList_PrayerCard']").should('not.exist')




        //delete list
        cy.contains('Delete this List')
            .click()

        cy.contains(newListName).should('not.exist')
    })


    // it("can delete the list" , () => {
    //     //cy.visit('/')

    //     cy.contains(newListName)
    //         .click()



    // })
   

    






    
})