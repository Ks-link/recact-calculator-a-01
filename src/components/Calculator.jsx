import React from 'react'
import { useState } from 'react'
import Buttons from './Buttons'

function Calculator() {
    const [display, updateDisplay] = useState('');
    const [firstNum, updateFirstNum] = useState('');
    const [secondNum, updateSecondNum] = useState('');
    const [op, updateOp] = useState('');
    const [calcStage, updateCalcStage] = useState('firstOp');


    function buttonInput(pressed) {
        switch (pressed.type) {
            case 'number':
                console.log('wow!');
                handleNum(pressed);
                break;

            case 'operator':
                handleOp(pressed);
                break;

            case 'clear':
                handleClear(pressed);
                break;

            case 'enter':
                handleCalculate();
                break;

            default:
                break;
        }
    }

    function handleNum(pressed) {
        if (calcStage === 'firstOp') {
            updateFirstNum(firstNum + pressed.text);
            updateDisplay(firstNum + pressed.text);
        } else if (calcStage === 'secondOp') {
            updateSecondNum(secondNum + pressed.text);
            updateDisplay(secondNum + pressed.text);
        }
    }

    function handleOp(pressed) {
        if (calcStage === 'firstOp') {
            // updateDisplay(pressed.text);
            updateOp(pressed.value);
            updateCalcStage('secondOp');
        }
    }

    function handleCalculate() {
        const num1 = Number(firstNum);
        const num2 = Number(secondNum);
        let result = 0;

        switch (op) {
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
    }

    function handleClear(pressed) {
        if (pressed.text === 'AC') {
            updateDisplay('');
            updateFirstNum('');
            updateSecondNum('');
            updateOp('');
            updateCalcStage('firstOp');
        } else if (pressed.text === 'C') {
            updateDisplay('');
            if (calcStage === 'firstOp') {
                updateFirstNum('');
            } else if (calcStage === 'secondOp') {
                updateSecondNum('');
            }
        }
    }

    return (
        <>
            <h1 className='title'>A React Calculator That Reacts To Your Calculations</h1>
            <section className='calculator'>
                <h2 className='display'>{display}</h2>
                <Buttons buttonInput={buttonInput} />
            </section>
        </>
    )
}

export default Calculator