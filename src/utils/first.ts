enum Operator {
    Amount = '+',
    Subtract = '-',
    Multiply = '*',
    Divide = '/',
}

type NumberOption = {
    min: number;
    max: number;
};

type GenerateOptions = {
    operators: Array<Operator>;
    numbers: NumberOption;
    result: NumberOption;
};

export const getNumber = (options: NumberOption) => {
    const {min, max} = options;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const generateExpression = (options: GenerateOptions) => {
    const {
        operators, 
        numbers, 
        result,
    } = options;

    const operator = operators[Math.floor(Math.random() * operators.length)];

    const firstNumber = getNumber(numbers);

    const secondNumber = getNumber({
        min: numbers.min,
        max: 90,
    })

    let min = 0;
    let max = 10;
    
    // Generate two random numbers within the given range
    var num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    var num2 = Math.floor(Math.random() * (max - min + 1)) + min;

    // Generate a random operator (+, -, *, /)
    

    // Ensure that division results in a whole number
    if (operator === '/') {
        while (num1 % num2 !== 0) {
            num1 = Math.floor(Math.random() * (max - min + 1)) + min;
            num2 = Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    // Calculation of the expression
    var result2 = 0;
    if (operator === '+') {
        result2 = num1 + num2;
    } else if (operator === '-') {
        result2 = num1 - num2;
    } else if (operator === '*') {
        result2 = num1 * num2;
    } else if (operator === '/') {
        result2 = num1 / num2;
    }

    // limit the input parameters min and max to the result of the calculation
    if (result2 < min) {
        min = result2;
    }
    if (result2 > max) {
        max = result2;
    }
    // Build and return the expression as a string
    var expression = num1 + ' ' + operator + ' ' + num2;
    return expression;
}
