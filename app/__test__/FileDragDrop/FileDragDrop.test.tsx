import React from "react"
import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import FileDragDrop from "@library/form/FileDragDrop"
import "@testing-library/jest-dom"

//+ Initiates a new test suit which makes test cases easier to organize
describe("FileDragDrop", () => {
  
  const getFilesMock = jest.fn()

  //+ In Jest, the history of interactions with each mock function is stored across every test run within a test suite. This history includes details such as how many times the mock function was called, what arguments were passed to it on each call, and what values (if any) were returned. Hence, it is necessary to clear up the mocks before any testsuit run
  beforeEach(() => {
    getFilesMock.mockClear()
  })

  // - Check Whether it renders or crashes
  it("should render without crashing", () => {
    render(<FileDragDrop getFiles={getFilesMock} />)
  })

  it("should render with correct text", () => {
    const textDragDropArea = "Drag & drop files here"
    const btnText = "Upload"
    render(<FileDragDrop getFiles={getFilesMock} textDragDropArea={textDragDropArea} btnText={btnText} />)

    expect(screen.getByText(textDragDropArea)).toBeInTheDocument()
    expect(screen.getByText(btnText)).toBeInTheDocument()
  })

  it("should handle file drop", async () => {
    const file = new File(["hello"], "hello.txt", { type: "text/plain" })
    render(<FileDragDrop getFiles={getFilesMock} allowedFileTypes="text/plain" />)

    const dropzone = screen.getByText("Drag & drop files here")
    fireEvent.dragOver(dropzone)
    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } })

    await waitFor(() => {
      expect(getFilesMock).toHaveBeenCalledWith([file])
    })
  })

  it("should handle single file upload", async () => {
    const file = new File(["hello"], "hello.txt", { type: "text/plain" })
    render(<FileDragDrop getFiles={getFilesMock} allowedFileTypes="text/plain" />)

    const input = screen.getByTestId("file-input")
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => {
      expect(getFilesMock).toHaveBeenCalledWith([file])
    })
  })

  it('should handle multiple file uploads', async () => {
    //- Create multiple mock files
    const files = [
      new File(['contents'], 'file1.txt', { type: 'text/plain' }),
      new File(['contents'], 'file2.txt', { type: 'text/plain' })
    ];
  
    //- Render your component
    render(<FileDragDrop getFiles={getFilesMock} allowedFileTypes="text/plain" />);
  
    //- Get the file input element
    const input = screen.getByTestId('file-input');
  
    //- Simulate the file select event with multiple files
    fireEvent.change(input, { target: { files } });
  
    //- Wait for the expected outcome
    await waitFor(() => {
      //- Check if the mock function was called with the array of files
      expect(getFilesMock).toHaveBeenCalledWith(files);
    });
  });
  
})
