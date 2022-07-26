import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import LoginStatus from './components/LoginStatus'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', isError: false })

  // Effect hook to check local storage for previously-acquired token
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Effect hook to fetch blogs if user is logged in
  useEffect(() => {
    if (user === null) {
      return
    } else {
      const fetchData = async () => {
        const blogsReturned = await blogService.getAll()
        console.log('blogsReturned', blogsReturned.data)
        setBlogs(blogsReturned.data.sort((a, b) => b.likes - a.likes))
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

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
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

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (exception) {
      setNotification({ message: `Logout exception: ${exception}`, isError: true })
      setTimeout(() => {
        setNotification({ message: '', isError: false })
      }, 5000)
    }
  }

  const blogFormTogglableRef = useRef()

  if (user === null) {
    // console.log("App notification: ", notification)
    return (
      <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} notification={notification} />
    )
  } else {
    // console.log('user after login: ', user)

    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <LoginStatus user={user} handleLogout={handleLogout} />
        <br></br>
        <Togglable buttonLabel="new blog" ref={blogFormTogglableRef}>
          <NewBlogForm setNotification={setNotification} blogs={blogs} setBlogs={setBlogs} parentTogglableRef={blogFormTogglableRef} />
        </Togglable>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />
          )}
        </div>

      </div>
    )
  }


}

export default App
