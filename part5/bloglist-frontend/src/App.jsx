import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // states for logging in
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // state for handling Notification message with style
  const [notificationMessage, setNotificationMessage] = useState(null)
  // create a ref for the blog form
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])
  

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setNotificationMessage(`${user.name} logged in`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    } catch (error) {
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // handle blog creation
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNotificationMessage(`Successfully created ${returnedBlog.title} written by ${returnedBlog.author}`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000);
  }

  // handle blog update
  const updateBlog = async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject)

    setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog).sort((a, b) => b.likes - a.likes))
  }

  // handle blog deletion by the owning user
  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find(blog => blog.id === id)
    if (window.confirm(`Delete ${blogToDelete.title} by ${blogToDelete.author}`)) {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input type="password"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    )
  }

  const logoutForm = () => {
    return (
      <form onSubmit={handleLogout}>
      <button type='submit'>logout</button>
      </form>
    )
  }

  return (
    <div>
      <Notification notificationMessage={notificationMessage} />
      {user === null 
        ?
          (
          <div>
            <h2>Log in to application</h2>
            {loginForm()}
          </div>
        )
        :
        (
          <div>
            <h2>blogs</h2>
            {user.name} logged in {logoutForm()}
            <Togglable buttonLabel="create" ref={blogFormRef}>
              <BlogForm
                createBlog={addBlog}

              />
            </Togglable>
            {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
            )}
          </div>
        )
      }
    </div>
  )
}

export default App
