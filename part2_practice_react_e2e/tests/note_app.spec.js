// first test for the note app

// required imports
import { test, expect, describe } from '@playwright/test'

// add a describe block to the beginning to indicate that we are testing the Note app
describe('Note app', () => {

    // create a test that checks whether the front page can be opened
    test('front page can be opened', async ({ page }) => {
    // go to the frontend page
    await page.goto('http://localhost:5173/')

    // create a locater by finding the text 'Notes' on the page
    const locator = await page.getByText('Notes')

    // check if the locator can be seen using expect(locator).toBeVisible()
    await expect(locator).toBeVisible()
    // check that the footer is visible
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
})

    // second test to see if the login form can be opened
    test('login form can be opened', async ( { page }) => {
        // go to the page
        await page.goto('http://localhost:5173/')

        // find the login button and click it
        await page.getByRole('button', { name: 'log in' }).click()

        // when the login form is opened, enter a username
        // use .first() and .last to fill the correct field
        await page.getByRole('textbox').first().fill('try_auth')
        await page.getByRole('textbox').last().fill('try_pass')
        // use .click to login
        await page.getByRole('button', { name: 'login'} ).click()
        // use expect(page.getByText('try_auth logged in')).toBeVisible()
        await expect(page.getByText('try_auth logged in')).toBeVisible()
    } )

})
