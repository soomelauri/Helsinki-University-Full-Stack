import { useState } from "react"

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState('')

    const handleChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        // second thing it does, is uses the passed down createNote
        createNote({content: newNote,
                    important: true
        })
        setNewNote('')
    }
    return (
        // add the CSS-.className here to be used in testing
        <div className="formDiv">
            <h2>Create a new note</h2>
                <form onSubmit={addNote}>
                <input value={newNote}
                    onChange={handleChange}
                    data-testid='note-input'
                    // added placeholder here that was
                    // used in testing with
                    // screen.getByPlaceholderText('...')
                    placeholder="write note content here"
                    // we can also define an id to the input
                    // test finds it using:
                    // {container}=render(<NoteForm createNote={createNote} />)
                    // const input = container.querySelector('#node-input')
                    id = 'note-input'
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default NoteForm
