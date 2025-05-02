import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const action = {
      type: 'NEW_NOTE',
      payload: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.payload)
  })
})

// test to see if toggleImportance works:
// we want to make sure that toggleImportance returns a new state
test('returns a new state with action TOGGLE_IMPORTANCE', () => {
    const state = [
        {
          content: 'the app state is in redux store',
          important: true,
          id: 1
        },
        {
          content: 'state changes are made with actions',
          important: false,
          id: 2
        }]
    
      const action = {
        type: 'TOGGLE_IMPORTANCE',
        payload: {
          id: 2
        }
      }
    // deepFreeze the state
    deepFreeze(state)

    // create a new state by using the reducer on the action and the state
    const newState = noteReducer(state, action)
    // check whether the length of the newState is 2
    expect(newState).toHaveLength(2)
    // check whether the first state is found in the newState
    expect(newState).toContainEqual(state[0])
    // check whether the newState includes a given state:
    expect(newState).toContainEqual(
        {
            content: 'state changes are made with actions',
            important: false,
            id: 2
        })
})
