import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewTodoForm from "./src/NewTodoForm";

it("renders without crashing", function() {
    render(<NewTodoForm />);
});

it("matches snapshot", function() {
    const { asFragment } = render(<NewTodoForm />);
    expect(asFragment()).toMatchSnapshot();
});

it("runs the create function on form submit", function() {
    const createMock = jest.fn();
    const { getbyText } = render(<NewTodoForm create Todo={createMock} />);
    const createButton = getbyText("Add a todo");
    fireEvent.click(createButton);
    expect(createMock).toHaveBeenCalled();
});