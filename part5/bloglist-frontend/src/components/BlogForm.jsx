import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // create the function triggered by form
  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  // add a handler for the title setting
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  // add a handler for author setting
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  // add a handler for url setting
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
            title
          <input value={title}
            onChange={handleTitleChange}
            placeholder='insert title'
          />
        </div>
        <div>
            author
          <input value={author}
            onChange={handleAuthorChange}
            placeholder='insert author'
          />
        </div>
        <div>
            url
          <input type="url"
            value={url}
            onChange={handleUrlChange}
            placeholder='insert url'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
