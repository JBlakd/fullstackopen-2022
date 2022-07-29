
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

interface CoursePartBaseWithDescriptions extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseWithDescriptions {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseWithDescriptions {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseWithDescriptions {
  type: "special",
  requirements: Array<string>
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case "normal":
      return (
        <p>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong> <br></br>

        </p>
      )
    case "groupProject":
      return (
        <p>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong> <br></br>
          project exercises {coursePart.groupProjectCount}
        </p>
      )
    case "submission":
      return (
        <p>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong> <br></br>
          <em>{coursePart.description}</em> <br></br>
          {coursePart.exerciseSubmissionLink}
        </p>
      )
    case "special":
      return (
        <p>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong> <br></br>
          required skills: {coursePart.requirements.map((r, i) => {
            return (i === coursePart.requirements.length - 1) ? r : `${r}, `;
          })}
        </p>
      )
    default:
      break;
  }

  return (<></>)
}

const Content = ({ parts }: { parts: Array<CoursePart> }): JSX.Element => {
  const generateKey = () => {
    return Math.random().toString(36).substring(2, 7);
  }

  return (
    <div>
      {parts.map(p => <Part key={generateKey()} coursePart={p} />)}
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
      description: "This is the leisurely course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hardest course part",
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
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
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