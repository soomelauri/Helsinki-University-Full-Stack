import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

// Make a test for the new blog form.
// The test should check, that the form calls the
// event handler it received as props with
// the right details when a new blog is created.

test('<BlogForm /> updates with correct details', async () => {
  const createBlogHandler = vi.fn()

  render(<BlogForm createBlog={createBlogHandler}/>)

  const testUser = userEvent.setup()

  const author = screen.getByPlaceholderText('insert author')
  const title = screen.getByPlaceholderText('insert title')
  const url = screen.getByPlaceholderText('insert url')
  const button = screen.getByText('create')

  await testUser.type(author, 'Test Author')
  await testUser.type(title, 'Test Title')
  await testUser.type(url, 'http://localhost:5173')

  await testUser.click(button)

  expect(createBlogHandler.mock.calls).toHaveLength(1)
  expect(createBlogHandler.mock.calls[0][0].title).toBe('Test Title')
  expect(createBlogHandler.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlogHandler.mock.calls[0][0].url).toBe('http://localhost:5173')
})
