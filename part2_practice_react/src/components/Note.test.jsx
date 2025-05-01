// let's first write a test that verifies that the component 
// renders the contents of the note.

// Notice that we created the <componentName>.test.jsx in
// the same directory as the <componentName>
// first we import the render and the screen functions
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
// then we import the actual <componentName>
import Note from './Note'
import { expect } from 'vitest'

// then we create a test that renders the component, using the
// test header, giving it a string and a call-back function
// that sets the component's content and importance
test('test that renders the component', async () => {
    const note = {
        content: 'this content is rendered by a test',
        important: true
    }

    const mockHandler = vi.fn()

    render(
        <Note note={note} toggleImportance={mockHandler} />
    )

    const user = userEvent.setup()

    const button = screen.getByText('make not important')

    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)

    // define a new session for user using:
    // const user = userEvent.setup()

    // find a button that states 'make not important'
    // const button = screen.getByText('make not important')

    // finally, 
    // make the async call for user to 'click()' the button
    // await user.click(button)

    // expect(mockHandler.mock.calls).toHaveLength(1)
    // this means that after executing the async function,
    // we check that the mockHandler has made a mock call




    // create a mock function using Vitest
    // const mockHandler = vi.fn()

    // add this mockHandler in the Note component
    // render(<Note note={note} toggleImportance={mockHandler} />)

    // 

    // then it renders it using render(<componentName component={component} />)

    // create the element by using screen.getByText('given text')
    // expect(element).toBeDefined()
    const element = screen.getByText('this content is rendered by a test', {'exact': false})

    screen.debug(element)


    expect(element).toBeDefined()

    // { screen } has a method 'debug()' to print the HTML of 
    // a component to the terminal

    // clicking Buttons when testing:
    // Let's add some more functinality,
    // first import userEvent

    // Then, let's make the testing function async


    // actually, this expect(element).toBeDefined() is not even needed as 
    // if the screen.getByText() fails, the test fails

    // We could also use CSS-selectors to find the rendered
    // elements by using the querySelector of the object container
    // that is one of the fields returned by the render



    // when we use the render method to store the container
    // const { container } = render(<Note note={note} />)

    // const div = container.querySelector('.note')
    // expect(div).toHaveTextContent('this content is rendered by a test')

    // we can then create a div that uses container.
    // querySelector('.className')
    // and then expect(div).toHaveTextContent('this content...')


})

// better way would be to define a data-attribute:
// data attribute is specifically defined for testing purposes
// <li data-id="13123" />
// then we can use getByTestId on that data-id

test('does not render this', () => {
    // this queryByText() returns a promise, and does not cause
    // an exception if it's not found
    const note = {
        content: 'This is a reminder',
        important: true
    }
    render(<Note note={note} />)

    const element = screen.queryByText('do not want this thing to be rendered')
    expect(element).toBeNull()
})
