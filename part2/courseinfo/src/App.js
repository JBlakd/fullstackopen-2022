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
  console.log("Total props: ", props)

  return (
    <>
      <h3>
        Total of {props.exercisesArray.reduce((a, b) => a + b)} exercises
      </h3>
    </>
  )
}

const Course = (props) => {
  console.log("Course props: ", props)


  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total exercisesArray={props.course.parts.map(part => part.exercises)} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </>

  )
}

export default App