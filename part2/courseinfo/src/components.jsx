import React from 'react'

// Instead of creating one App component with the components inside it, let's
// create multiple components so that data can flow through

export const Header = ({ name }) =>  {
    return (
      <h1>{name}</h1>
    )
}
  
export const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part}/>
        )}
      </div>
    )
}
  
export const Part = ({ part }) => {
    return (
    <p> {part.name} {part.exercises} </p>
    )
}
  
  
export const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
    
    return (
      <p>Total of {totalExercises} exercises</p>
    );
  };
  
  
export const Course = ({ course }) => {
    return (
      <div>
        <Header name = {course.name} />
        <Content parts = {course.parts} />
        <Total parts = {course.parts} />
      </div>
    )
  }
