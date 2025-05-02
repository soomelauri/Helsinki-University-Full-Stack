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

  })

  test('Login form is shown', async ({ page }) => {
    const userInput = page.getByTestId('username-input')
    const passwordInput = page.getByTestId('password-input')
    expect(userInput).toBeVisible()
    expect(passwordInput).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        // find the username and password input fields
        await page.getByTestId('username-input').fill('try_path')
        await page.getByTestId('password-input').fill('try_auth')

        // find the login button
        await page.getByRole('button', { name: 'login' }).click()

        // make sure the logged in user is greeted
        await expect(page.getByText('Lauri Soome logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        // set incorrect user and pass
        await page.getByTestId('username-input').fill('try_path')
        await page.getByTestId('password-input').fill('wrong')

        // find the login button
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })
})
