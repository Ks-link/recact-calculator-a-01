import React from 'react'
import { calculatorButtons } from '../globals/calculator-button-data'

function Buttons({ buttonInput }) {

    const allButtons = calculatorButtons.map((button, i) => {
        return <button
            onClick={() => {
                buttonInput(button)
            }}
            key={i}
            type={button.type}
            className={button.className}
            value={button.value}
        >{button.text}</button>
    });

    return (
        <>
            <div className='all-buttons'>
                {allButtons}
            </div>
        </>
    )
}

export default Buttons