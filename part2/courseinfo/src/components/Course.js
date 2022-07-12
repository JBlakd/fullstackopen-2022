import React from 'react'

const Header = (props) => {
  return (
    <>
      <h2>{props.course}</h2>
    </>
  )
}

const Part = (props) => {
  // console.log("Part props: ", props)

  return (
    <>
      <p>
        {props.partName} {props.numExercises}
      </p>
    </>
  )
}

const Content = (props) => {
  // console.log("Content props: ", props)

  return (
    <>
      {
        props.parts.map((part) => (
          <Part key={part.id} partName={part.name} numExercises={part.exercises} />
        ))
      }
    </>
  )
}

const Total = (props) => {
  // console.log("Total props: ", props)

  return (
    <>
      <h3>
        Total of {props.exercisesArray.reduce((a, b) => a + b)} exercises
      </h3>
    </>
  )
}

const Course = (props) => {
  // console.log("Course props: ", props)

  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total exercisesArray={props.course.parts.map(part => part.exercises)} />
    </div>
  )
}

export default Course