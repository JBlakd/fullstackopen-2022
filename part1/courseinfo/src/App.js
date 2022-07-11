const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <p>
          {props.partName} {props.numExercises}
      </p>
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
  const course = 'Half Stack application development'
  const parts = [
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


  return (
    <div>
      <Header course={course}/>
      {parts.map((part, i) => (
        <Content key={i} partName={part.partName} numExercises={part.numExercises}/>
      ))}
      <Total exercisesArray={parts.map(part => part.numExercises)} />
    </div>
  )
}

export default App