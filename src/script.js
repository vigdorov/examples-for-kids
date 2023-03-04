import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    GAME_PAGE,
    START_PAGE,
    RESULT_PAGE,
    FIRST_INPUT_ID,
    SECOND_INPUT_ID,
    SUM_INPUT_ID,
    NAME_INPUT_ID,
    CHECK_BUTTON_ID,
    START_BUTTON_EASY_ID,
    START_BUTTON_NORMAL_ID,
    START_BUTTON_HARD_ID,
    START_MULTI_BUTTON_NORMAL_ID,
    START_MULTI_BUTTON_HARD_ID,
    REPEAT_BUTTON_ID,
    RESULT_CONTAINER_ID,
    SIGN_SPAN_ID,
    TEXT_SUCCESS_CLASS,
    TEXT_DANGER_CLASS,
    NO_DISPLAY_CLASS,
    EXAMPLE_TYPE,
    MAX_COUNT_EXAMPLES,
    EVENTS,
    START_FORM_ID,
    EXAMPLE_FORM_ID,
    RESET_BUTTON_ID,
    DEFAULT_STORE,
    DIFFICULTY,
    KIND,
} from './consts';
import './style.css';

let store = {
    ...DEFAULT_STORE,
};

const startPage = document.querySelector(`.${START_PAGE}`);
const gamePage = document.querySelector(`.${GAME_PAGE}`);
const resultPage = document.querySelector(`.${RESULT_PAGE}`);
const firstInput = document.querySelector(`#${FIRST_INPUT_ID}`);
const secondInput = document.querySelector(`#${SECOND_INPUT_ID}`);
const sumInput = document.querySelector(`#${SUM_INPUT_ID}`);
const nameInput = document.querySelector(`#${NAME_INPUT_ID}`);
const checkButton = document.querySelector(`#${CHECK_BUTTON_ID}`);

const startButtonEasy = document.querySelector(`#${START_BUTTON_EASY_ID}`);
const startButtonNormal = document.querySelector(`#${START_BUTTON_NORMAL_ID}`);
const startButtonHard = document.querySelector(`#${START_BUTTON_HARD_ID}`);

const startButtonMultiNormal = document.querySelector(`#${START_MULTI_BUTTON_NORMAL_ID}`);
const startButtonMultiHard = document.querySelector(`#${START_MULTI_BUTTON_HARD_ID}`);

const repeatButton = document.querySelector(`#${REPEAT_BUTTON_ID}`);
const resetButton = document.querySelector(`#${RESET_BUTTON_ID}`);
const resultContainer = document.querySelector(`#${RESULT_CONTAINER_ID}`);
const signSpan = document.querySelector(`#${SIGN_SPAN_ID}`);
const startForm = document.querySelector(`#${START_FORM_ID}`);
const exampleForm = document.querySelector(`#${EXAMPLE_FORM_ID}`);

const getRandomNumber = maxNumber => Math.round(Math.random() * maxNumber);

const getPlusExample = () => {
    const first = getRandomNumber(store.difficulty);
    const second = getRandomNumber(store.difficulty - first);

    return {
        first,
        second,
        sum: first + second,
        type: EXAMPLE_TYPE.PLUS,
    };
};

const getMinusExample = () => {
    const first = getRandomNumber(store.difficulty);
    const second = getRandomNumber(first);

    return {
        first,
        second,
        sum: first - second,
        type: EXAMPLE_TYPE.MINUS,
    };
};

const getMultiplicationExample = () => {
    const first = getRandomNumber(store.difficulty);
    const second = getRandomNumber(store.difficulty);

    return {
        first,
        second,
        sum: first * second,
        type: EXAMPLE_TYPE.MULTI,
    };
};

const getDivisionExample = () => {
    const first = getRandomNumber(store.difficulty);
    const second = getRandomNumber(store.difficulty);
    const result = first * second;

    return {
        first: result,
        second,
        sum: first,
        type: EXAMPLE_TYPE.DIVISION,
    };
};

const getExample = () => {
    const isPlusMinusKind = store.kind === KIND.PLUS_MINUS;

    const exampleOrder = getRandomNumber(1);

    switch (exampleOrder) {
        case 0:
            return isPlusMinusKind ? getPlusExample() : getMultiplicationExample();
        default:
            return isPlusMinusKind ? getMinusExample() : getDivisionExample();
    }

};

const getDifficultyById = id => {
    return DIFFICULTY[id];
};

const getExampleKindById = id => {
    switch (id) {
        case START_BUTTON_EASY_ID:
        case START_BUTTON_NORMAL_ID:
        case START_BUTTON_HARD_ID: {
            return KIND.PLUS_MINUS;
        }
        default: {
            return KIND.MULTI_DIVISION;
        }
    }
};

const removeRandom = ({first, second, sum, type}) => {
    const miss = getRandomNumber(2);
    return {
        first: miss !== 0 ? first : '',
        second: miss !== 1 ? second : '',
        sum: miss !== 2 ? sum : '',
        type,
    };
};

const setInput = (input, value) => {
    input.value = value;
    input.disabled = value !== '';
    if (value === '') {
        input.focus();
    }
};

const setTextContainer = (container, value) => {
    container.textContent = value;
};

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
    checkButton.disabled = true;
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

    if (store.page === START_PAGE) {
        nameInput.focus();
    }
};

const startGame = id => {
    const userName = nameInput.value;
    if (userName) {
        store = {
            page: GAME_PAGE,
            userName: userName,
            results: [],
            answerCount: 0,
            currentExample: {},
            difficulty: id ? getDifficultyById(id) : store.difficulty,
            kind: getExampleKindById(id),
        };
        renderPage();
        setExample();
        checkButton.disabled = true;
    }
};

const isNotEmptyInputs = ({first, second, sum}) => {
    return first !== '' && second !== '' && sum !== '';
};

const checkInput = () => {
    checkButton.disabled = !isNotEmptyInputs(getInputs());
};

firstInput.addEventListener(EVENTS.INPUT, checkInput);
secondInput.addEventListener(EVENTS.INPUT, checkInput);
sumInput.addEventListener(EVENTS.INPUT, checkInput);

const validateNameInput = () => {
    startButtonEasy.disabled = !nameInput.value;
    startButtonNormal.disabled = !nameInput.value;
    startButtonHard.disabled = !nameInput.value;
    startButtonMultiNormal.disabled = !nameInput.value;
    startButtonMultiHard.disabled = !nameInput.value;
};

nameInput.addEventListener(EVENTS.INPUT, validateNameInput);

startForm.addEventListener(EVENTS.SUBMIT, event => {
    event.preventDefault();
    startGame(event.submitter.id);
});

exampleForm.addEventListener(EVENTS.SUBMIT, event => {
    event.preventDefault();
    const origin = store.currentExample;
    const answer = getInputs();
    if (isNotEmptyInputs(answer)) {
        store.results.push({origin, answer});
        store.answerCount += 1;
        if (store.answerCount < MAX_COUNT_EXAMPLES) {
            setExample();
        } else {
            store.page = RESULT_PAGE;
            renderResult();
            renderPage();
        }
    }
});

repeatButton.addEventListener(EVENTS.CLICK, () => {
    store.page = GAME_PAGE;
    startGame();
    renderPage();
});

resetButton.addEventListener(EVENTS.CLICK, () => {
    store = {
        ...DEFAULT_STORE,
    };
    nameInput.value = '';
    validateNameInput();
    renderPage();
});

renderPage();
