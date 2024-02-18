import React, { useState, useCallback, ChangeEvent } from "react"
import {
  render,
  fireEvent,
  screen,
  getByText,
  getByRole,
  getByTestId,
  findByTestId,
} from "@testing-library/react"
import "@testing-library/jest-dom"
import TextField, { TextFieldProps } from "./TextField"
import Label from "@library/form/Label"
import FormItemResponseProps from "@library/form/FormItemResponseProps"

describe("TextField component", () => {
  const mockOnClick = jest.fn()
  const mockOnChange = jest.fn()
  const mockOnBlur = jest.fn()
  const mockOnFocus = jest.fn()
  const mockOnInput = jest.fn()
  const mockOnKeyUp = jest.fn()
  const mockOnKeyDown = jest.fn()
  const mockOnRightIconClick = jest.fn()

  const renderTextField = (props: React.JSX.IntrinsicAttributes & TextFieldProps) =>
    render(<TextField {...props} />)

  it("", () => {
    const customClassName = "left-8"
    const { getByTestId, getByRole, queryByTestId, findByTestId, getAllByTestId } = render(
      <TextField rightIconName="heart"  />
    )
    const rightIcon = getByTestId("heart")
    expect(rightIcon).toBeInTheDocument()
  })

  it("Button icon clickable ", () => {
    render(
      <TextField
        rightIconName="heart"
        isRightIconClickable
        onRightIconClick={mockOnRightIconClick}
        // value="test"
        // onChange={mockOnChange}
      />
    )
    // renderTextField({ onChange: mockOnChange });

    // const textFieldElement = screen.getByPlaceholderText("")
    const buttonElement = screen.getByTestId("heart")
    fireEvent.click(buttonElement);
    expect(mockOnRightIconClick).toHaveBeenCalledTimes(1)

    // fireEvent.change(textFieldElement, { target: { value: "Go get me water" } })
    // // expect(textFieldElement.value).toBe("Go get me water");

    // expect(mockOnChange).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     data: "Go get me water",
    //     status: 200,
    //   })
      // expect.anything()
    // )
  })
})
