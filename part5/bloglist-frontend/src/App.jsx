import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // states for logging in
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // states for creating a new blog
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    setUser(user)
    blogService.setToken(user.token)
    setUsername('')
    setPassword('')
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // handle blogcreation function
  const createBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    
    const savedBlog = await blogService.create(newBlog)

    setBlogs(blogs.concat(savedBlog))
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const blogForm = () => {
    return (
      <form onSubmit={createBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
        author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
          type="url"
          value={url}
          name="Url"
          onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    )
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
            {blogForm()}
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
            
          </div>
        )
      }
    </div>
  )
}

export default App
