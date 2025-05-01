import { loginWith, createNote } from './helper'
// required imports
import { test, expect, describe, beforeEach } from '@playwright/test'

// add a describe block to the beginning to indicate that we are testing the Note app
describe('Note app', () => {
    // change the beforeEach so that the data is emptied before we run each test

    // add request to reset the DB
    // add request to add a new user to the reset DB
    beforeEach(async ({ page, request }) => {
        // reset DB
        await request.post('/api/testing/reset')
        // add new user to fresh DB
        await request.post('/api/users', {
            data: {
              name: 'Lauri Soome',
              username: 'try_auth',
              password: 'try_pass'
            }
        })
        await page.goto('/')
    })

    // create a test that checks whether the front page can be opened
    test('front page can be opened', async ({ page }) => {

    // create a locater by finding the text 'Notes' on the page
    const locator = await page.getByText('Notes')

    // check if the locator can be seen using expect(locator).toBeVisible()
    await expect(locator).toBeVisible()
    // check that the footer is visible
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
    })

    // second test to see if the login form can be opened
    test('login form can be opened', async ( { page }) => {
        // login with helperfunction
        await loginWith(page, 'try_auth', 'try_pass')
        // use expect(page.getByText('try_auth logged in')).toBeVisible()
        await expect(page.getByText('Lauri Soome logged in')).toBeVisible()
    })

    // test to see that wrong credentials end up not logging you in
    test('wrong credentials fail the login', async ({ page }) => {
        await page.getByRole('button', { name: 'log in' }).click()
        await page.getByTestId('username').fill('try_auth')
        await page.getByTestId('password').fill('wrong')
        // use .click to login
        await page.getByRole('button', { name: 'login'} ).click()
        // check that there is no 'logged in text'
        await expect(page.getByText('Lauri Soome logged in')).not.toBeVisible()

    })

        // add a describe block to actually log in the user
        describe('when logged in', () => {
            // beforeEach to run the log in 
            beforeEach(async ({ page }) => {
                // login with helper function
                await loginWith(page, 'try_auth', 'try_pass')
            })

            // test that adds a new note to the DB:
            test('new note can be added', async ({ page }) => {
                // create note with helper function
                await createNote(page, 'playwright test note')

                // check that the note is visible
                await expect(page.getByText('playwright test note')).toBeVisible()
            })

                // add a describe block to add the note before the next test runs
                describe('and a note exists', () => {
                    // beforeEach to 
                    beforeEach(async ({ page }) => {
                        await createNote(page, 'another playwright note')
                    })

                    // test to check whether the importance of a note can be changed
                    test('importance of a note can be changed', async ({ page }) => {

                        // find the button that says 'make important'
                        await page.getByRole('button', { name: 'make not important'}).click()

                        // check that the button has now changed
                        await expect(page.getByRole('button', { name: 'make important'} )).toBeVisible()
                    })
                })
        })
})
