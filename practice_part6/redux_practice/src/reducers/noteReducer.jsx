import { createStore } from "redux"

// expand the reducer further, let's include that we 
// also, instead of if, let's use a switch statement

const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            // let's redo this part by using the JS array spread syntax
            // we return array where we use the ... on the state, and then add the action.payload
            return [...state, action.payload]
            // in the case of a new note, return the concat payload
            return state.concat(action.payload)
        case 'TOGGLE_IMPORTANCE': {
            // in the case of TOGGLE IMPORTANCE
            // assign the id to be action.payload.id
            const id = action.payload.id
            // find the state correct state by using the .find(n=> n.id === id)
            const noteToChange = state.find(n => n.id === id)
            // take the changedNote, copy it, and negate the importance
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            // create a return statement, to create a new array, where based on id
            // we replace the old note
            return state.map(note => note.id === id ? changedNote : note
            )
        }
        default:
            return state
    }
}

// create a store using const store = createStore(noteReducer)
const store = createStore(noteReducer)

// use store.dispatch({}) to send stuff to the store
store.dispatch({
    // sending both type and payload is the common way of doing things
    // type defines the type
    // payload defines the data included with the action
    // send the type of NEW NOTE
    type: 'NEW_NOTE',
    // send the object of payload:
    payload: {
        // in the payload object, send content, important, and id
        content: 'First Note Created',
        important: true,
        id: 1
    }
})

// create the App component
const App = () => {
    // the app component returns the stuff inside a div and an unordered list
    return (
        <div>
            <ul>
                {/* loop over a bunch of stuff */}
                {/* use store.getState() to get the stuff */}
                {store.getState().map(note => {
                    <li key={note.id}>{note.content} <strong>{note.important ? 'important' : ''}</strong></li>
                })}
            </ul>
        </div>
    )
}
export default noteReducer
