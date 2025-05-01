import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

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

    screen.debug()

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('Title', { exact: false })
    expect(div).toHaveTextContent('Blog Autho', { exact: false})
    expect(div).not.toHaveTextContent('http://localhost:5173')
    expect(div).not.toHaveTextContent('100')
})
