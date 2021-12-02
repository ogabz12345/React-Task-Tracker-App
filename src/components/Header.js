import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAdd }) => {

    const location = useLocation();
    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === '/' &&
                <Button onClick={onAdd} color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'}></Button>
            } </header>
    )
}

/**
 * Default props for header.
 */
Header.defaultProps = {
    title: 'Tracker Application'
}

/**
 * Default props for button.
 */
Button.defaultProps = {
    color: 'steelblue',
    text: 'Added'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

/**
 * To style inline dynamically you use style={headerStyling}
 */
const headerStyling = {
    color: 'red',
    backgroundColor: 'black'
}
export default Header
