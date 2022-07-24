import { useState } from "react"

const Blog = ({ blog }) => {
  const [isShown, setIsShown] = useState(false)

  const toggleIsShown = () => {
    setIsShown(!isShown)
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
          likes {blog.likes} <button>like</button>
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