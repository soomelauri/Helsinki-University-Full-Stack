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

// let's change which notes are shown
// the idea is that if the filter is selected, we map through the array to see which notes will be shown
// if filter says 'ALL' -> return ALL
// if filter says 'IMPORTANT' -> return IMPORTANT
// if filter says 'NONIMPORTANT' -> return NONIMPORTANT

// check for state.filters, if all -> return ALL
// 

// destructure the parameters

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(({ filter, notes }) => {
        if (filter === 'ALL') {
            return notes
        }
    return filter === 'IMPORTANT'
        ? notes.filter(note => note.important)
        : notes.filter(note => !note.important)
    })


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
