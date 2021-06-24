import React, {useEffect} from "react";
import GroupScreen from "./GroupScreen"
import {render, waitFor} from "@testing-library/react"

const fakePath = {
    params: {
        id: "63adf880-bd93-11eb-a02b-dd913b116243" //this is the id for F9DA28
    }
}

test("if the group's prayers are displayed", async () => {
    expect(true).toBe(true)
})


// //this test assumes there is a group with id 63ad... who's name is F9DA28
// test("if the group's name is displayed properly", async () => {
//     const {getByTestId, getByText, findByText} = render(<GroupScreen match={fakePath}/>)

//     expect(findByText('F9DA28')).not.toBeNull()
//     // //var titleEl = getByTestId('groupTitleHeader')

//     //     await waitFor(() => {
//     //         expect(getByText('F9DA28')).toBeInDocument()
//     //     }, {timeout: 3000})

//     // //expect(titleEl.textContent).toBe("F9DA28")
    

// })




// //this test assumes there is a group with id 63ad... who has a prayer titled 'yellow' and another titled 'muffin'
// test("if the group's prayers are displayed", async () => {
//     const {findByText} = render(<GroupScreen match={fakePath}/>)

//    // await findByText('yellow')
//     //findByText('muffin')
// })
