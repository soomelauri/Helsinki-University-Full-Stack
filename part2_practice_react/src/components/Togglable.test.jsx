// Let's create a test for the Togglable Component

// tHe beforeEach is defined in the describe() method
// it makes sure that this functions runs before each test


// the first test 


// first import the render() and screen()
// render is used:
// render(<Togglable toggleVisibilty={} />)

import { beforeEach, expect } from 'vitest'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import { describe } from 'vitest'

// describe a whole block of tests
describe('<Togglable />', () => {
    // create a container
    let container

    // our beforeEach runs this function before each individual test
    // is executed, in this case, we want to clean up the jsDOM


    beforeEach(() => {
        container = render(
            <Togglable buttonLabel="show ...">
                <div className='testDiv'>
                    togglableContent
                </div>
            </Togglable>
        ).container
    })

    // create a test to see if the children of Togglable are rendered

    test('renders its children', async () => {
        await screen.findAllByText('togglableContent')
    })

    // create a test to see if the children are not shown in the 
    // beginning

    // this can be done by first creating the div
    // div is the container.querySelector(.CSSclassName)
    // then check:
    // expect(div).toHaveStyle('none')
    test('the children are not shown at start', () => {
        const div = container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
    })

    // test that after clicking the button, the children are displayed
    // first create the test

    // how to do the button thing?
    // user = userEvent.setup()
    // button = screen.getByText('show ...')
    // have the user click the button

    // make sure the component now doesn't have the display:none

    test('after clicking the children are displayed', async() => {
        const user = userEvent.setup()
        const button = screen.getByText('show ...')

        await user.click(button)
        
        const div = container.querySelector('.togglableContent')

        expect(div).not.toHaveStyle('display: none')
    })

    // one more test to ensure that clicking the button again
    // leads to the content being hidden

    // create the user
    // get the clickable button
    // use await and click the button

    // now the cancel button appears
    // create cancel button to be clicked
    // click the cancel button

    // create div using the querySelector('.className')
    // check that the children don't have the style 

    test('second click hides the children', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show ...')
        await user.click(button)

        const cancelButton = screen.getByText('cancel')
        await user.click(cancelButton)

        const div = container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')

    })


})
