import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, blogs, setBlogs }) => {
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
    setBlogs(updatedBlogs)
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
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={toggleIsShown}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={toggleIsShown}>view</button>
        </div>
      </div>
    )
  }


}

export default Blog