import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user._id
    }
    updateBlog(blog.id, updatedBlog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible &&
      <div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes} <button onClick={handleLikes}>like</button>
        </div>
        <div>
          {blog.user ? blog.user.username : 'unknown'}
        </div>
      </div>}
    </div>
)}

export default Blog
