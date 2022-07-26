import { useState } from 'react'
import blogService from '../services/blogs'

const DeleteButton = ({ isDeleteButtonShown, handleDelete }) => {
  if (isDeleteButtonShown) {
    return (
      <button onClick={handleDelete}>delete</button>
    )
  } else {
    return <></>
  }
}

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [isShown, setIsShown] = useState(false)

  const toggleIsShown = () => {
    setIsShown(!isShown)
  }

  const handleLike = async () => {
    const response = await blogService.update(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.user.name,
      title: blog.title,
      url: blog.url
    })

    console.log('handleLike response: ', response)

    // update blogs
    const updatedBlogs = blogs.map(b => {
      if (b.id === response.id) {
        return { ...b, likes: response.likes }
      }
      return b
    })
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }

  const handleDelete = async () => {
    const status = await blogService.erase(blog.id)
    console.log('delete blog status: ', status)
    if (status === 204) {
      // delete blog from state
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } else {
      console.error('delete blog failed with status code', status)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (isShown) {
    return (
      <div style={blogStyle} className={'blog'}>
        <div>
          {blog.title} {blog.author} <button onClick={toggleIsShown} className={'toggleIsShownButton'}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={handleLike} className={'likeButton'}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <DeleteButton isDeleteButtonShown={user.username === blog.user.username} handleDelete={handleDelete} />
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className={'blog'}>
        <div>
          {blog.title} {blog.author} <button onClick={toggleIsShown} className={'toggleIsShownButton'}>view</button>
        </div>
        <DeleteButton isDeleteButtonShown={user.username === blog.user.username} handleDelete={handleDelete} />
      </div>
    )
  }


}

export default Blog