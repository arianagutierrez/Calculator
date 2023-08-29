document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("input");
    const buttons = document.querySelectorAll(".btn");
  
    let currentInput = "0";
    let currentOperation = null;
    let firstOperand = null;
    let newCalculation = false;
    
    //funzione Audio
    function playSound() {
      const audio = document.querySelector('#buttonsound');
      audio.play();
    }

    //display screen
    function updateDisplay() {
        display.textContent = currentInput.length > 20 ? "Too Long!" : currentInput;
    }
    
    //AC button
    function clear() {
      currentInput = "0";
      currentOperation = null;
      firstOperand = null;
      newCalculation = false; 
      updateDisplay();
      playSound();
    }
    
    //buttons click
    function numberClick(number) {
        if (newCalculation) {
            currentInput = number.toString();
            newCalculation = false;
        } else {
            if (currentInput === "0") {
              currentInput = number.toString();
            } else {
              currentInput += number.toString();
            }
        }
        updateDisplay();
        playSound();
    }

    // operation buttons
    function operatorBtn(operator) {
      if (currentOperation !== null) {
        calculate();
      }
      currentOperation = operator;
      firstOperand = parseFloat(currentInput);
      newCalculation = false;
      currentInput = "0";
      playSound();
    }

    //calculation
    function calculate() {
      const secondOperand = parseFloat(currentInput);
      if (currentOperation === "+") {
        currentInput = (firstOperand + secondOperand).toString();
      } else if (currentOperation === "-") {
        currentInput = (firstOperand - secondOperand).toString();
      } else if (currentOperation === "*") {
        currentInput = (firstOperand * secondOperand).toString();
      } else if (currentOperation === "/") {
        currentInput = (firstOperand / secondOperand).toString();
      }
      currentOperation = null;
      firstOperand = null;
      updateDisplay();
      newCalculation = true;
    }
    
    //'=' btn
    function equals() {
      if (currentOperation !== null) {
        calculate();
      }
      playSound();
    }
    
    //DE btn
    function deleteBtn() {
      currentInput = currentInput.slice(0, -1);
      if (currentInput === "") {
        currentInput = "0";
      }
      updateDisplay();
      playSound();
    }
    
    //'π' btn
    function pi() {
      currentInput = Math.PI.toString();
      updateDisplay();
      playSound();
    }

    //'.' btn
    function dot() {
      if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
      }
      playSound();
    }

    //activate calculation for each button
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        const buttonValue = this.textContent;

        if (currentInput.length <= 20 || buttonValue === "DE" || buttonValue === "AC") {  
            switch (buttonValue) {
            case "AC":
                clear();
                break;
            case "DE":
                deleteBtn();
                break;
            case "π":
                pi();
                break;
            case "=":
                equals();
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                operatorBtn(buttonValue);
                break;
            case ".":
                dot();
                break;
            default:
                if (!isNaN(buttonValue)) {
                numberClick(buttonValue);
                }
                break;
            }
        };
      });
    });
});