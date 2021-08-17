const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  // replace the current displayvalue if the first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    //   if current display value is 0 then replace it else add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : number + displayValue;
  }
}

function addDecimal() {
  // if  operator pressed dont add decimal
  if (awaitingNextValue) return;
  // if no decimal add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// calculate first and second values depending on operators
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  //   to prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  // assign first value if there is no value

  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log(firstValue, operatorValue, currentValue);
    const calculation = calculate[operatorValue](firstValue, currentValue);
    console.log("calculation", calculation);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }

  // ready for next value ,store operator
  awaitingNextValue = true;
  // boolean is triggered after we press operator
  operatorValue = operator;
}

// add event listeners for SVGAnimatedNumberList,operators,decimal

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length == 0) {
    //for number buttons since they dont have a css class
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});
// runs function for each elment in our array

// reset all values ,display
function restAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// event listener
clearBtn.addEventListener("click", restAll);
