const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':

            return [...state, action.payload]

        case 'TOGGLE_IMPORTANCE': {

            const id = action.payload.id

            const noteToChange = state.find(n => n.id === id)

            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note => note.id === id ? changedNote : note
            )
        }
        default:
            return state
    }
}

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
    return {
        type: 'NEW_NOTE',
        payload: {
        content,
        important: false,
        id: generateId()
        }
    }
}

export const toggleImportanceOf = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        payload: { id }
    }
}

export default noteReducer

// noteReducer.jsx is responsible for:

// creating the noteReducer which:
// defines the reducer function, taking an action and a state as params and returning new state
// defines createNote function that takes content and returns the type + payload
// defines toggleImportanceOf function that triggers the negation in the reducer
