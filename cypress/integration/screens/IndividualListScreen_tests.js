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


    

    //this test assumes theres a list with id 6ad60f20-d8f6-11eb-948a-ab706763a651 and title 'Rolls Royce Pull up'
    it('loads from URL path', () => {
        cy.visit('/list/6ad60f20-d8f6-11eb-948a-ab706763a651')

        //how you know its individual_list_screen
        cy.get('[data-testid="thisList_title"]')
            .contains('Rolls Royce Noice')
    })


    //this test assumes theres a list with id 6ad60f20-d8f6-11eb-948a-ab706763a651 and title 'Rolls Royce Pull up'
    it('loads from Dashboard', () => {
        //cy.visit('/')
        cy.contains('Rolls Royce Noice')
            .click()


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

        cy.contains('Test Name New List')

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