import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {

    const [visible, setVisible] = useState(false)

    const showWhenVisible = {display: visible ? '' : 'none'}
    const hideWhenVisible = {display: visible ? 'none' : ''}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>
                    {props.buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable


// let's add the CSS-classname to Togglable
// we want to put this in the content that will only be visible
// after it's toggled
