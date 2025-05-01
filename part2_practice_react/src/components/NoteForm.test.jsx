// let's create a new test for this NoteForm
// this time it's just one test() block
// for this form, we want to fill it out and then click the button

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from './NoteForm'

// make sure that the NoteForm component updates the parent state
// and calls the onSubmit function

test('<NoteForm /> updates the parent state and calls onSubmit', async () => {
    // we first create the handlerfunction using vitest vi.fn()
    // the handlerfunction will be named the same as the real one
    // createNote that's passed to the NoteForm component
    const createNote = vi.fn()

    // create the user event using const user = 
    // userEvent.setup()
    const user = userEvent.setup()

    // render the component with it's handler function
    render(<NoteForm createNote={createNote}/>)

    // use screen to save the actual buttons and the input
    // input will be screen.getByRole('textbox')
    // button will be screen.getByText('save')
    const input = screen.getByPlaceholderText('write note content here')
    const button = screen.getByText('save')

    // then we need to write the actual input using the user
    // that was defined above through userEvent.setup()
    await user.type(input, 'testing a form ...')
    // click the button
    await user.click(button)

    console.log(createNote.mock.calls)



    // expect that the function has been called exactly once
    // expect(createNote.mock.calls).toHaveLength(1)
    // expect the content to be 'testing a form ...'
    // expect(createNote.mock.calls[0][0].content).toBe('testing a form ...')
    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form ...')
})

