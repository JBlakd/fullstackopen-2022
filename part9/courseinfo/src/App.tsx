
const Header = ({ name }: { name: string }): JSX.Element => {
  return (
    <h1>{name}</h1>
  )
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  description: string;
  exerciseSubmissionLink: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

const Course = ({ name, exerciseCount, type }: CoursePartBase): JSX.Element => {
  return (
    <p>
      {name} {exerciseCount} {type}
    </p>
  )
}

const Content = ({ parts }: { parts: Array<CoursePartBase> }): JSX.Element => {
  const generateKey = () => {
    return Math.random().toString(36).substring(2, 7);
  }

  return (
    <div>
      {parts.map(p => <Course key={generateKey()} name={p.name} exerciseCount={p.exerciseCount} type={p.type} />)}
    </div>

  )
}

const Total = ({ courses }: { courses: Array<CoursePartBase> }): JSX.Element => {
  return (
    <p>
      Number of exercises{" "}
      {courses.reduce((acc, cur) => acc + cur.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;