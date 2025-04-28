import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('loggedBlogappUser')
    setUser(user)
  }, [])
  

  const handleLogin = async (event) => {
    event.preventDefault()

    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    setUser(user)
    setUsername('')
    setPassword('')
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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
            <p>{user.name} logged-in</p>
            {logoutForm()}
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
