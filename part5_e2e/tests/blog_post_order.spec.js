// test blog application
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db here
    await request.post('/api/testing/reset')
    // create the user and send it through the post request of login
    await request.post('/api/users', {
        data: {
            name: 'Lauri Soome', username: 'try_path', password: 'try_auth'
        }
    })
    // go to blog app home page
    await page.goto('/')

    // find the username and password input fields
    await page.getByTestId('username-input').fill('try_path')
    await page.getByTestId('password-input').fill('try_auth')

    // find the login button
    await page.getByRole('button', { name: 'login' }).click()

    // find the username and password input fields
    await page.getByTestId('username-input').fill('try_path')
    await page.getByTestId('password-input').fill('try_auth')
    // find the login button
    await page.getByRole('button', { name: 'login' }).click()
    // find the create button
    await page.getByRole('button', { name: 'create' }).click()

    // find the author, url and title based on placeholder text
    await page.getByPlaceholder('insert title').fill('BLOG TITLE')
    await page.getByPlaceholder('insert author').fill('BLOG AUTHOR')
    await page.getByPlaceholder('insert url').fill('http://localhost:5273/')
    await page.getByRole('button', { name: 'create' }).click()
    })
    test('check order of two posts', async ({ page }) => {
        await page.getByRole('button', { name: 'create' }).click()
        await page.getByPlaceholder('insert title').fill('eltit')
        await page.getByPlaceholder('insert author').fill('rohtua')
        await page.getByPlaceholder('insert url').fill('http://localhost:3373/')
        await page.getByRole('button', { name: 'create' }).click()

        // click view for both posts
        await page.getByRole('button', { name: 'view'}).first().click()
        await page.waitForTimeout(200)
        await page.getByRole('button', { name: 'view'}).last().click()
        await page.waitForTimeout(200)
        // click like for the bottom post
        await page.getByRole('button', { name: 'like'}).last().click()
        await page.waitForTimeout(200)
        // get all elements
        const blogs = await page.locator('.blog').all();
        
        // make sure last post is now first
        const firstBlogText = await blogs[0].textContent();
        expect(firstBlogText).toContain('eltit');
    })
})
