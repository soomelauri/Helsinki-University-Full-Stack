import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

// adding to the App component, we will create a new function that first logs the chosen value from the radiobutton to console
// now, when the input type is set to radio and the name of the buttons is set to filter
// we need to now connect the radio button's onChange function to the filterSelected function

// having the name component be the same for the radio buttons, that allows only one to be selected at a time

const App = () => {
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App

// App.jsx imports all components and puts them together => main.jsx
