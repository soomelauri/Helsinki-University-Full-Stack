// here we are creating a component that will me responsible for
// the list of notes and displaying a single note

import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <p>
                <strong>{note.important ? 'important' : ''}</strong>
            </p>
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state)

    return (
        <ul>
            {notes.map(note => 
                <Note key={note.id} note={note} handleClick={() => {
                    dispatch(toggleImportanceOf(note.id))
                }}/>
            )}
        </ul>
    )
}
export default Notes


// Notes.jxs defines Note and Notes
// Note is used to return 
