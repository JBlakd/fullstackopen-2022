const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
          {props.partName} {props.numExercises}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map((part, i) => (
        <Part key={i} partName={part.partName} numExercises={part.numExercises}/>
      ))}
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>
          Number of exercises {props.exercisesArray.reduce((a,b) => a + b)}
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        "partName": 'Fundamentals of React',
        "numExercises": 10
      },
      {
        "partName": 'Using props to pass data',
        "numExercises": 7
      },
      {
        "partName": 'State of a component',
        "numExercises": 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total exercisesArray={course.parts.map(part => part.numExercises)} />
    </div>
  )
}

export default App