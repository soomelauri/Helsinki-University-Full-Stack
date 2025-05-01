// 1. let's write a CSS className for the Note component
// find the div responsible for rendering the blog.author and blog.title and add 'className={blog}'

import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const isOwner = user.username === blog.user.username

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
      user: blog.user
    }
    updateBlog(blog.id, updatedBlog)
  }

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
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
          {isOwner && (
            <div>
              <button onClick={() => deleteBlog(blog.id)}>
              delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )}

export default Blog
