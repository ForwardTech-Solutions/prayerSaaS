import React from 'react'
import CircleButton from '../common/CircleButton.js'

const myStyle = {
    position: 'fixed',
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
};

const plusB = props => {


    return (
        <CircleButton
            style={myStyle}
        />
    );
}

const PlusButton = plusB;
export default PlusButton