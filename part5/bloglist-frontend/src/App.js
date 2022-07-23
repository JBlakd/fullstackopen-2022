import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import LoginStatus from './components/LoginStatus'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', isError: false })
  const [newBlogState, setNewBlogState] = useState({ title: '', author: '', url: '' })

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

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

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

  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      if (Object.values(newBlogState).some(value => value === null || value === '')) {
        setNotification({ message: 'All fields must be filled', isError: true })
        setTimeout(() => {
          setNotification({ message: '', isError: false })
        }, 5000)
        return
      }

      const justAddedBlog = await blogService.create(newBlogState)
      console.log(justAddedBlog)
      setBlogs(blogs.concat(justAddedBlog))
      console.log('blogsAfterSet: ', blogs)

      setNotification({ message: `a new blog ${justAddedBlog.title} by ${justAddedBlog.author} added`, isError: false })
      setTimeout(() => {
        setNotification({ message: '', isError: false })
      }, 5000)
    } catch (exception) {
      setNotification({ message: `New Blog exception: ${exception}`, isError: true })
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
        <Notification notification={notification} />
        <LoginStatus user={user} handleLogout={handleLogout} />
        <br></br>
        <NewBlogForm newBlogState={newBlogState} setNewBlogState={setNewBlogState} handleNewBlog={handleNewBlog} />
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
