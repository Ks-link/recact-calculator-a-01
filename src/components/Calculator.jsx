import React from 'react'
import { useState } from 'react'
import Buttons from './Buttons'

function Calculator() {
    const [display, updateDisplay] = useState('0');
    const [firstNum, updateFirstNum] = useState('');
    const [secondNum, updateSecondNum] = useState('');
    const [memory, updateMemory] = useState('');
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

            case 'memory':
                handleMem(pressed);
                break;

            case 'decimal':
                handleDecimal();
                break;

            case 'sign':
                handleSign();
                break;

            case 'sp-operator':
                handleSpOperator(pressed);
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
            updateOp(pressed.value);
            updateCalcStage('secondOp');
        }
    }

    function handleCalculate() {
        const num1 = Number(firstNum);
        const num2 = Number(secondNum);
        let result = 0;

        switch (op) {
            case 'Add':
                result = num1 + num2;
                break;
            case 'Subtract':
                result = num1 - num2;
                break;
            case 'Multiply':
                result = num1 * num2;
                break;
            case 'Divide':
                result = num1 / num2;
                break;

            default:
                return;
        }

        updateDisplay(result.toString());
    }

    function handleMem(pressed) {
        const num1 = Number(display);
        const num2 = Number(memory);
        let result = 0;

        switch (pressed.text) {
            case 'MS':
                updateMemory(display);
                break;

            case 'MC':
                updateMemory('');
                break;

            case 'MR':
                updateDisplay(memory);
                break;

            case 'M+':
                result = num1 + num2;
                updateMemory(result);
                break;

            case 'M-':
                result = num2 - num1;
                updateMemory(result);
                break;

            default:
                break;
        }
    }

    function handleClear(pressed) {
        if (pressed.text === 'AC') {
            updateDisplay('0');
            updateFirstNum('');
            updateSecondNum('');
            updateOp('');
            updateCalcStage('firstOp');
        } else if (pressed.text === 'C') {
            updateDisplay('0');
            if (calcStage === 'firstOp') {
                updateFirstNum('0');
            } else if (calcStage === 'secondOp') {
                updateSecondNum('0');
            }
        }
    }

    function handleDecimal() {
        if (calcStage === 'firstOp') {
            updateFirstNum(firstNum + '.')
            updateDisplay(firstNum + '.');
        } else if (calcStage === 'secondOp') {
            updateSecondNum(secondNum + '.')
            updateDisplay(secondNum + '.');
        }
        updateDisplay(display + '.');
    }

    function handleSign() {
        if (calcStage === 'firstOp') {
            if (Array.from(firstNum)[0] === '-') {
                updateFirstNum(Array.from(firstNum)[0] = '' + firstNum);
                updateDisplay(Array.from(firstNum)[0] = '' + firstNum);
            } else {
                updateFirstNum('-' + firstNum)
                updateDisplay('-' + firstNum);
            }
        } else if (calcStage === 'secondOp') {
            if (Array.from(secondNum)[0] === '-') {
                updateSecondNum(Array.from(secondNum)[0] = '' + secondNum);
                updateDisplay(Array.from(secondNum)[0] = '' + secondNum);
            } else {
                updateSecondNum('-' + secondNum)
                updateDisplay('-' + secondNum);
            }
        }
    }

    function handleSpOperator(pressed) {
        const num1 = Number(firstNum);
        const num2 = Number(secondNum);
        let result = 0;
        if (pressed.value === 'Percent') {

            if (calcStage === 'firstOp') {
                result = num1 / 100;
                updateFirstNum(result.toString());
                updateDisplay(result.toString());
            } else if (calcStage === 'secondOp') {
                result = num2 / 100;
                updateSecondNum(result.toString());
                updateDisplay(result.toString());
            }
        } else if (pressed.value === 'Square Root') {

            if (calcStage === 'firstOp') {
                result = Math.sqrt(num1);
                updateFirstNum(result.toString());
                updateDisplay(result.toString());
            } else if (calcStage === 'secondOp') {
                result = Math.sqrt(num2);
                updateSecondNum(result.toString());
                updateDisplay(result.toString());
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