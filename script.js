import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
// TODO скрыть переменные

const LOCAL_DATA_KEY = 'example-for-kids';
const START_PAGE = 'StartPage';
const GAME_PAGE = 'GamePage';
const RESULT_PAGE = 'ResultPage';
const NO_DISPLAY_CLASS = 'd-none';
const TEXT_SUCCESS_CLASS = 'text-success';
const TEXT_DANGER_CLASS = 'text-danger';
const NAME_INPUT_ID = 'startPageNameInput';

const START_BUTTON_ID = 'start-button';
const CHECK_BUTTON_ID = 'check-button';
const REPEAT_BUTTON_ID = 'repeat-button';

const FIRST_INPUT_ID = 'first-input';
const SECOND_INPUT_ID = 'second-input';
const SUM_INPUT_ID = 'sum-input';
const RESULT_CONTAINER_ID = 'result-container';
const SIGN_SPAN_ID = 'sign-span';

const EXAMPLE_TYPE = {
    PLUS: '+',
    MINUS: '-',
};

const EVENTS = {
    CLICK: 'click',
};

const MAX_NUMBER = 10;
const MAX_COUNT_EXAMPLES = 10;

let store = {
    page: START_PAGE,
    results: [],
    userName: '',
    answerCount: 0,
    currentExample: {},
};

const startPage = document.querySelector(`.${START_PAGE}`);
const gamePage = document.querySelector(`.${GAME_PAGE}`);
const resultPage = document.querySelector(`.${RESULT_PAGE}`);
const firstInput = document.querySelector(`#${FIRST_INPUT_ID}`);
const secondInput = document.querySelector(`#${SECOND_INPUT_ID}`);
const sumInput = document.querySelector(`#${SUM_INPUT_ID}`);
const nameInput = document.querySelector(`#${NAME_INPUT_ID}`);
const checkButton = document.querySelector(`#${CHECK_BUTTON_ID}`);
const startButton = document.querySelector(`#${START_BUTTON_ID}`);
const repeatButton = document.querySelector(`#${REPEAT_BUTTON_ID}`);
const resultContainer = document.querySelector(`#${RESULT_CONTAINER_ID}`);
const signSpan = document.querySelector(`#${SIGN_SPAN_ID}`);

const getRandomNumber = (maxNumber) => Math.round(Math.random() * maxNumber);
const getFirstNumber = () => getRandomNumber(MAX_NUMBER);
const getSecondNumber = (firstNumber) => getRandomNumber(MAX_NUMBER - firstNumber);
const getSum = (first, second) => first + second;

const getPlusExample = () => {
    const first = getRandomNumber(MAX_NUMBER);
    const second = getRandomNumber(MAX_NUMBER - first);

    return {
        first,
        second,
        sum: first + second,
        type: EXAMPLE_TYPE.PLUS,
    };
};

const getMinusExample = () => {
    const first = getRandomNumber(MAX_NUMBER);
    const second = getRandomNumber(first);

    return {
        first,
        second,
        sum: first - second,
        type: EXAMPLE_TYPE.MINUS
    };
};

const getExample = () => {
    const exampleOrder = getRandomNumber(1);
    switch (exampleOrder) {
        case 0:
            return getPlusExample();
        case 1:
            return getMinusExample();
    }
}

const getData = (defaultData) => {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_DATA_KEY)) || defaultData;
    } catch (e) {
        return defaultData;
    }
};
const setData = (data) => {
    localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(data));
};

const removeRandom = ({first, second, sum, type}) => {
    const miss = getRandomNumber(2);
    return {
        first: miss !== 0 ? first : '',
        second: miss !== 1 ? second : '',
        sum: miss !== 2 ? sum : '',
        type,
    };
}

const setInput = (input, value) => {
    input.value = value;
    input.disabled = value !== '';
};

const setTextContainer = (container, value) => {
    container.textContent = value;
}

const setInputs = ({first, second, sum, type}) => {
    setInput(firstInput, first);
    setInput(secondInput, second);
    setInput(sumInput, sum);
    setTextContainer(signSpan, type);
};

const getInputs = () => {
    return {
        first: firstInput.value,
        second: secondInput.value,
        sum: sumInput.value,
        type: signSpan.textContent,
    };
};

const setExample = () => {
    const {first, second, sum, type} = getExample();
    store.currentExample = {first, second, sum, type};
    setInputs(removeRandom({first, second, sum, type}));
};

const isEqual = (origin, answer) => {
    return Object.entries(origin).every(([key, value]) => {
        return `${value}` === `${answer[key]}`;
    });
};

const makeExampleDiv = ({first, second, sum, type}) => {
    const div = document.createElement('div');
    div.textContent = `${first} ${type} ${second} = ${sum}`;
    return div;
};

const renderResult = () => {
    resultContainer.innerHTML = '';
    let count = 0;
    store.results.forEach(({origin, answer}) => {
        const originDiv = makeExampleDiv(origin);
        const answerDiv = makeExampleDiv(answer);
        const success = isEqual(origin, answer);
        answerDiv.textContent += success ? ' Верно!' : ' Ошибка';
        const div = document.createElement('div');
        div.appendChild(originDiv);
        div.appendChild(answerDiv);
        if (success) {
            count += 1;
            answerDiv.classList.add(TEXT_SUCCESS_CLASS);
        } else {
            answerDiv.classList.add(TEXT_DANGER_CLASS);
        }

        resultContainer.appendChild(div);
    });

    const resultDiv = document.createElement('div');
    resultDiv.textContent = `${store.userName}, у тебя ${count} правильных ответов из ${MAX_COUNT_EXAMPLES}. Молодец!`;
    resultDiv.classList.add(TEXT_SUCCESS_CLASS, 'mt-3');
    resultContainer.appendChild(resultDiv);
};

const renderPage = () => {
    [startPage, gamePage, resultPage].forEach(page => {
        if (page.classList.contains(store.page)) {
            page.classList.remove(NO_DISPLAY_CLASS);
        } else {
            page.classList.add(NO_DISPLAY_CLASS);
        }
    });
};

const startGame = () => {
    const userName = nameInput.value;
    if (userName) {
        store = {
            page: GAME_PAGE,
            userName: userName,
            results: [],
            answerCount: 0,
            currentExample: {},
        };
        renderPage();
        setExample();
    }
};

startButton.addEventListener(EVENTS.CLICK, () => {
    startGame();
});

checkButton.addEventListener(EVENTS.CLICK, () => {
    const origin = store.currentExample;
    const answer = getInputs();
    store.results.push({origin, answer});
    store.answerCount += 1;
    if (store.answerCount < MAX_COUNT_EXAMPLES) {
        setExample();
    } else {
        store.page = RESULT_PAGE;
        renderResult();
        renderPage();
    }
});

repeatButton.addEventListener(EVENTS.CLICK, () => {
    store.page = GAME_PAGE;
    startGame();
    renderPage();
});

renderPage();
