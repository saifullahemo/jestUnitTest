import React from "react"
import { render,screen, fireEvent, getByTestId } from "@testing-library/react"
import "@testing-library/jest-dom"
// import Alert from "./Alert"
import Alert, { AlertProps } from './Alert';

describe("Alert Component", () => {

  const defaultProps: AlertProps = {
    title: 'Test Alert',
    body: 'This is a test alert.',
    isIconClicked: jest.fn(),
  };

  test('renders alert with default props', () => {
    render(<Alert {...defaultProps} />);

    const alert = screen.getByTestId('alert');

    // Check if the component renders with default props
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Test Alert');
    expect(alert).toHaveTextContent('This is a test alert.');
    expect(alert).toHaveClass('border-sky-500 bg-sky-100 text-sky-900');
  });

  // test("renders with default props", () => {
  //   const { getByText, getByTestId } = render(
  //     <Alert title="Test Alert" body="This is a test alert." isIconClicked={undefined} />
  //   )
  //   expect(getByText("Test Alert")).toBeInTheDocument()
  //   expect(getByText("This is a test alert.")).toBeInTheDocument()
  //   expect(getByTestId("alert")).toHaveClass("border-sky-500 bg-sky-100 text-sky-900")
  // })

  // it("renders with custom variant", () => {
  //   const { getByTestId } = render(
  //     <Alert title="Test Alert" body="This is a test alert." variant="danger" isIconClicked={undefined} />
  //   )

  //   expect(getByTestId("alert")).toHaveClass("border-rose-500 bg-rose-100 text-rose-900")
  // })

  // it("calls isIconClicked when close icon is clicked", () => {
  //   const isIconClicked = jest.fn()
  //   const { getByTestId } = render(
  //     <Alert title="Test Alert" body="This is a test alert." isIconClicked={isIconClicked} />
  //   )

  //   const closeButton = getByTestId("close-button")
  //   fireEvent.click(closeButton)
  //   expect(isIconClicked).toHaveBeenCalled()
  // })

  // it("calls isBtnClicked when button is clicked", () => {
  //   const isBtnClicked = jest.fn()
  //   const { getByText } = render(
  //     <Alert
  //       title="Test Alert"
  //       body="This is a test alert."
  //       showBtn={true}
  //       btnText="Test Button"
  //       isBtnClicked={isBtnClicked}
  //       isIconClicked={undefined}
  //     />
  //   )

  //   const button = getByText("Test Button")
  //   fireEvent.click(button)
  //   expect(isBtnClicked).toHaveBeenCalled()
  // })
})
