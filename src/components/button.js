import PropTypes from 'prop-types'


const Button = ( {buttonText, onClick} ) => {

    return (
        <button className = "btn" onClick = {() => onClick(buttonText)}>
            {buttonText}
        </button>
    )
}

Button.propTypes = {
    buttonText: PropTypes.string,
    onClick: PropTypes.func
}

export default Button;