
const Header = ({ name }: { name: string }): JSX.Element => {
  return (
    <h1>{name}</h1>
  )
}

interface CourseProps {
  name: string,
  exerciseCount: number
}

const Course = ({ name, exerciseCount }: CourseProps): JSX.Element => {
  return (
    <p>
      {name} {exerciseCount}
    </p>
  )
}

const Content = ({ parts }: { parts: Array<CourseProps> }): JSX.Element => {
  const generateKey = () => {
    return Math.random().toString(36).substring(2, 7);
  }

  return (
    <div>
      {parts.map(p => <Course key={generateKey()} name={p.name} exerciseCount={p.exerciseCount} />)}
    </div>

  )
}

const Total = ({ courses }: { courses: Array<CourseProps> }): JSX.Element => {
  return (
    <p>
      Number of exercises{" "}
      {courses.reduce((acc, cur) => acc + cur.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;