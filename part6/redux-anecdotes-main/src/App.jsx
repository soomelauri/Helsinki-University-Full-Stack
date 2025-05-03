import { useSelector, useDispatch } from 'react-redux'
import reducer from './reducers/anecdoteReducer'
import { voteAnecdote } from './reducers/anecdoteReducer'
import NewAnecdote from './components/NewAnecdote'

const App = () => {
  const anecdotes = useSelector(state => state)
  // in order to not mutate the original state, we should create a copy and modify it
  const sortedAnecdotes = [...anecdotes].sort((a, b) => (b.votes - a.votes))
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <NewAnecdote />
    </div>
  )
}

export default App
