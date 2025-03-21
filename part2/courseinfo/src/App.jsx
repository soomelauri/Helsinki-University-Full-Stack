// Instead of creating one App component with the components inside it, let's
// create multiple components so that data can flow through

const Header = ({ name }) =>  {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part}/>
      )}
    </div>
  )
}

const Part = ({ part }) => {
  return (
  <p> {part.name} {part.exercises} </p>
  )
}
//correctly used the reduce method on an object by taking the part and accessing the exercises with .
const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  
  return (
    <p>Total of {totalExercises} exercises</p>
  );
};


const Course = ({ course }) => {
  return (
    <div>
      <Header name = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
