const App = () => {
  //Const definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  //Component definitions
  const Header = (props) => {
    return (
      <h1>{props.courseName}</h1>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <p>{props.parts[0].name} {props.parts[0].exercises}</p>
        <p>{props.parts[1].name} {props.parts[1].exercises}</p>
        <p>{props.parts[2].name} {props.parts[2].exercises}</p>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <p>Total exercise count for all parts combined: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
  }

  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts} />
      <Total parts = {course.parts} />
    </div>
  )

}

export default App
