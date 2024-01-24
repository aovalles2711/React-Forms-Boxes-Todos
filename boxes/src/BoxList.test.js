/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/jest-dom";
import BoxList from "./src/BoxList";

function addBox(boxList, height = "2", width = "2", color = "peachpuff") {
    const heightInput = boxList.getByLabelText("Height");
    const widthInput = boxList.getByLabelText("Width");
    const backgroundInput = boxList.getByLabelText("Background Color");
    fireEvent.change(backgroundInput, { target: { value: color} });
    fireEvent.change(widthInput, { target: { value: width} });
    fireEvent.change(heightInput, { target: { value: height} });
    const button = boxList.getByLabelText("Add a new box");
    fireEvent.click(button);
}

it("renders without crashing", function() {
    render(<BoxList />);
});

it("matches snapshot", function() {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});

it("can add a new box", function() {
    const boxList = render(<BoxList />);

    expect(boxList.queryByText("Remove the box")).not.toBeInTheDocument();

    addBox(boxList);

    const removeButton = boxList.getByText("Remove the box");
    expect(removeButton).toBeInTheDocument();
    expect(removeButton.previousSibling).toHaveStyle(
        `width: 2em;
        height: 2em;
        background-color: peachpuff`);

        expect(boxList.getAllByDisplayValue("")).toHaveLength(3);
});

it("can remove a box", function() {
    const boxList = render(<boxList />);
    addBox(boxList);

    const removeButton = boxList.getByText("Remove the box");

    fireEvent.click(removeButton);
    expect(removeButton).not.toBeInTheDocument();
});