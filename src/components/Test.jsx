

import React, { useState } from 'react';
import Buttons from './Buttons';

function Test() {
    const [display, updateDisplay] = useState('');
    const [firstNum, updateFirstNum] = useState('');
    const [secondNum, updateSecondNum] = useState('');

    let state = 'firstOp';

    function buttonInput(pressed) {
        switch (pressed.type) {
            case 'number':
                handleNum(pressed);
                break;
            case 'operator':
                handleOp(pressed);
                break;
            case 'clear':
                handleClear();
                break;
            case 'enter':
                handleCalculate();
                break;
            default:
                break;
        }
    }

    function handleNum(pressed) {
        if (state === 'firstOp') {
            updateFirstNum(firstNum + pressed.text);
            updateDisplay(firstNum + pressed.text);
        } else if (state === 'secondOp') {
            updateSecondNum(secondNum + pressed.text);
            updateDisplay(secondNum + pressed.text);
        }
    }

    function handleOp(pressed) {
        if (state === 'firstOp') {
            updateDisplay(pressed.text); // assuming pressed.text is the operator
            state = 'secondOp';
        }
    }

    function handleCalculate() {
        const num1 = parseFloat(firstNum);
        const num2 = parseFloat(secondNum);
        let result = 0;

        switch (display) { // assuming display holds the operator
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            default:
                return;
        }

        updateDisplay(result.toString());
        updateFirstNum(result.toString());
        updateSecondNum('');
        state = 'firstOp'; // Reset state
    }

    function handleClear() {
        updateDisplay('');
        updateFirstNum('');
        updateSecondNum('');
        state = 'firstOp';
    }

    return (
        <>
            <section className="calculator">
                <h1>Calculator</h1>
                <h2 className="display">{display}</h2>
                <Buttons buttonInput={buttonInput} />
            </section>
        </>
    );
}

export default Test;
