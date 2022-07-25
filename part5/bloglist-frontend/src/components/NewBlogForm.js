import { useState } from "react"
import blogService from "../services/blogs"

const NewBlogForm = ({ notification, setNotification, blogs, setBlogs, parentTogglableRef }) => {
  const [newBlogState, setNewBlogState] = useState({ title: '', author: '', url: '' })

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

      // Turn off visibility of parent Togglable
      parentTogglableRef.current.toggleVisibility()

      const justAddedBlog = await blogService.create(newBlogState)
      console.log('justAddedBlog', justAddedBlog)
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

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlogState.title}
            name="Title"
            onChange={({ target }) => {
              const newBlogObject = { ...newBlogState, title: target.value }
              setNewBlogState(newBlogObject)
            }}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlogState.author}
            name="Author"
            onChange={({ target }) => {
              const newBlogObject = { ...newBlogState, author: target.value }
              setNewBlogState(newBlogObject)
            }}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlogState.url}
            name="Url"
            onChange={({ target }) => {
              const newBlogObject = { ...newBlogState, url: target.value }
              setNewBlogState(newBlogObject)
            }}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm