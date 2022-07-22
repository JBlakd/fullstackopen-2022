import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', isError: false })

  useEffect(() => {
    if (user === null) {
      return
    } else {
      const fetchData = async () => {
        const blogsReturned = await blogService.getAll()
        console.log('blogsReturned', blogsReturned.data)
        setBlogs(blogsReturned.data)
      }
      fetchData()
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      // setUsername('')
      // setPassword('')
    } catch (exception) {
      console.log('login exception: ', exception)
      setNotification({ message: 'Wrong Credentials', isError: true })
      setTimeout(() => {
        setNotification({ message: '', isError: false })
      }, 5000)
    }
  }

  if (user === null) {
    // console.log("App notification: ", notification)
    return (
      <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} notification={notification} />
    )
  } else {
    console.log('user after login: ', user)

    return (
      <div>
        <h2>blogs</h2>
        <div>{user.name} logged in</div>
        <br></br>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>

      </div>
    )
  }


}

export default App
