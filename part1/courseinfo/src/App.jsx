const App = () => {
  // const definitions
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  // component definitions
  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }

  const Part = (props) => {
    return (
      <p>"{props.part}" has a total of {props.exercise} exercises.</p>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part part={part1} exercise={exercises1}></Part>
        <Part part={part2} exercise={exercises2}></Part>
        <Part part={part3} exercise={exercises3}></Part>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <p>Number of total exercises for all three parts: {exercises1 + exercises2 + exercises3}</p>
    )
  }


  return (
    <div>
      <Header course={course} />
      <Content />
      <Total />
    </div>
  )
}



export default App
