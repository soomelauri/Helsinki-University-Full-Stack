// let's create the filterReducer the same way we previously created the noteReducer
// starting off, let's initialize it
// a reducer takes two arguments, an initial state and an action
// set the initial state to 'ALL'

// we'll use the switch statement regarding the action type in order to identify how the reducer operates

const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload

        default:
            return state
    }
}

// we'll also create a new action creator function
// this function returns type and the payload
// it takes in filter and returns { type and payload}

export const filterChange = filter => {
    return {
        type: 'SET_FILTER',
        payload: 'IMPORTANT'
    }
}

export default filterReducer
