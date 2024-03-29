import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from "react-router-dom"
import { useField } from './hooks'

const Menu = ( { anecdotes, addNew, notification, setNotification }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>

      <Notification notification={notification}/>

      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification}/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/:id' element={<Anecdote anecdotes={anecdotes}/>} />
      </Routes>
    </Router>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find(a => a.id === Number(id));

  return (
    <div>
      <h1>{anecdote.content} by {anecdote.author}</h1>
      <p>has {anecdote.votes} votes</p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const { reset: contentReset, ...contentNoReset } = useField('text');
  const { reset: authorReset, ...authorNoReset } = useField('text');
  const { reset: infoReset, ...infoNoReset } = useField('text');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: contentNoReset.value,
      author: authorNoReset.value,
      info: infoNoReset.value,
      votes: 0
    });
    props.setNotification(`a new anecdote ${contentNoReset.value} created!`);
    navigate('/')
    setTimeout(() => {
      props.setNotification('');
    }, 5000);
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentNoReset} />
        </div>
        <div>
          author
          <input {...authorNoReset} />
        </div>
        <div>
          url for more info
          <input {...infoNoReset} />
        </div>
        <button>create</button>
        <button onClick={(e) => { 
          // prevents the button from performing its default functionality as a submit button
          e.preventDefault();
          contentReset();
          authorReset();
          infoReset();
        }}>
          reset
        </button>
      </form>
    </div>
  )

}

const Notification = ({ notification }) => {
  if (notification !== '') {
    return (
      <div>{notification}</div>
    )
  }

  return <></>
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} notification={notification} setNotification={setNotification}/>
      <Footer />
    </div>
  )
}

export default App
