import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

// let's make sure that we render the first component and the author and the title, and not the url and the likes

test('blog title and author rendered', () => {
    const blog = {
        title: 'Title',
        author: 'Blog Author',
        url: 'http://localhost:5173',
        likes: 100,
        // we need to add user here
        user: {username: 'ls1996'}
    }

    const user = {username: 'ls1996'}

    const { container } = render(<Blog blog={blog} user={user}/>)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('Title', { exact: false })
    expect(div).toHaveTextContent('Blog Autho', { exact: false})
    expect(div).not.toHaveTextContent('http://localhost:5173')
    expect(div).not.toHaveTextContent('100')
})


// add another test to make sure that when the button is clicked, the url and the likes are shown

test('when button clicked, url and likes are shown', async () => {
    const blog = {
        title: 'Title',
        author: 'Blog Author',
        url: 'http://localhost:5173',
        likes: 100,
        // we need to add user here
        user: {username: 'ls1996'}
    }

    const user = {username: 'ls1996'}

    // create a user
    const blogUser = userEvent.setup()

    // need a function to handle the click
    const buttonHandler = vi.fn()

    // render component
    const { container } = render(<Blog blog={blog} user={user} toggleVisibility={buttonHandler} />)

    const button = screen.getByRole('button')

    // click
    await blogUser.click(button)

    // check if likes and url found in their respective components
    const likesDiv = container.querySelector('.blogLikes')
    const urlDiv = container.querySelector('.blogUrl')

    expect(likesDiv).toHaveTextContent('100', { exact: false })
    expect(urlDiv).toHaveTextContent('http://localhost:5173', { exact: false })
})

// Make a test, which ensures that if the like button is clicked twice, the event handler 
// the component received as props is called twice.


  test('like button called twice is registered', async () => {
    // data sent through
    const blog = {
        title: 'Title',
        author: 'Blog Author',
        url: 'http://localhost:5173',
        likes: 100,
        user: {username: 'ls1996'}
      }

    // user matching the check
    const user = {username: 'ls1996'}

    // function handler
    const updateBlogHandler = vi.fn()

    // component rendering
    render(<Blog blog={blog} user={user} updateBlog={updateBlogHandler} />)


    // set up user event
    const testUser = userEvent.setup()
    // set up the view button
    const viewButton = screen.getByText('view')

    // call the user event, clicking the view button
    await testUser.click(viewButton)

    // save the like button
    const likeButton = screen.getByText('like')

    // click the like button twice
    await testUser.click(likeButton)
    await testUser.click(likeButton)

    // check that the likeButton was clicked twice
    expect(updateBlogHandler.mock.calls).toHaveLength(2)
  })



