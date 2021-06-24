//////  COMPONENT TESTS

import React, {useEffect} from "react";
import PrayerList from "./PrayerList"
import {render} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { BrowserRouter } from 'react-router-dom';

let getByTestId;
let rerender;
let getAllByTestId;
let queryAllByTestId;
let getByText;

const examplePrayer = {
    "prayergroup": "F9DA28",
    "prayer": "croisant",
    "username": "d76a38ce-dc73-4733-8a08-e5ea038b03f1",
    "id": "d34a91d0-ce05-11eb-b232-83b302e62eee"
}
  


beforeEach(() => {
    const component = render(
        <BrowserRouter>
            <PrayerList prayersList={[]}/>
        </BrowserRouter> 
    );

    getByTestId = component.getByTestId;
    rerender = component.rerender
    getAllByTestId = component.getAllByTestId
    queryAllByTestId = component.queryAllByTestId
    getByText = component.getByText
})


//the cards are displaying
test("displays as many items as given in prayerList prop", () => {

    //no prayerCards at first
    const emptyPrayerCards = queryAllByTestId("prayerCard")
    expect(emptyPrayerCards.length).toBe(0)


    //add some prayers
    const _pList = [examplePrayer, examplePrayer,examplePrayer ]
    rerender(    <BrowserRouter>
                    <PrayerList prayersList={_pList}/>
                </BrowserRouter> )

    
    //should be prayerCards now
    const prayerCards = getAllByTestId("prayerCard")
    expect(prayerCards.length).toBe(3)

})


//display all the expected information (name, author, group) of each prayer
test("that all the prayers information is displayed on the card", () => {
    //add a prayer
    const _pList = [examplePrayer ]
    rerender(    <BrowserRouter>
                    <PrayerList prayersList={_pList}/>
                </BrowserRouter> )

    //according to Docs, getByText "throws a descriptive error if no elements match or if more than one match is found"
    const title = getByText("croisant")
    const group = getByText("in:F9DA28")
    const username = getByText("by:d76a38ce-dc73-4733-8a08-e5ea038b03f1")

    expect(title).not.toBeNull()
    expect(group).not.toBeNull()
    expect(username).not.toBeNull()


})



// TODO: Move this to MyPrayerList.test.js (when i make it)

// //the title of the list changes appropriately
// test("if the title changes to reflect the user's username", () => {
//     var title = getByTestId("myPrayerList_title")
//     expect(title.textContent).toBe(" Prayers ")
    
//     rerender( <PrayerList _currentUser = {{username: "tommy"}} prayersList={[]}/>)

//     title = getByTestId("myPrayerList_title")
//     expect(title.textContent).toBe("tommy's Prayers ")

// })




// TODO: Delete this i guess

// test("Add Prayer Button renders with correct text when group is focused", () => {
//     rerender(<AddPrayerButton inGroupName="in ABC123" />)
//     const buttonEl = getByTestId("button")

//     expect(buttonEl.textContent).toBe("Create Prayer in ABC123")
//     expect(buttonEl.textContent).not.toBe("Create Prayer ")

//     rerender(<AddPrayerButton inGroupName="in XYZ789" />)

//     expect(buttonEl.textContent).toBe("Create Prayer in XYZ789")

// })

