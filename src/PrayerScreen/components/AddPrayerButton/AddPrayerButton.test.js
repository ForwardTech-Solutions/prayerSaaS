//////  COMPONENT TESTS

import React from "react";
import AddPrayerButton from "./AddPrayerButton"
import {render} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

let getByTestId;
let rerender;

beforeEach(() => {
    const component = render(<AddPrayerButton />);
    getByTestId = component.getByTestId;
    rerender = component.rerender
})



test("Add Prayer Button renders with correct text when NO group is focused", () => {
    const buttonEl = getByTestId("button")

    expect(buttonEl.textContent).toBe("Create Prayer ")
})


test("Add Prayer Button renders with correct text when group is focused", () => {
    rerender(<AddPrayerButton inGroupName="in ABC123" />)
    const buttonEl = getByTestId("button")

    expect(buttonEl.textContent).toBe("Create Prayer in ABC123")
    expect(buttonEl.textContent).not.toBe("Create Prayer ")

    rerender(<AddPrayerButton inGroupName="in XYZ789" />)

    expect(buttonEl.textContent).toBe("Create Prayer in XYZ789")

})

