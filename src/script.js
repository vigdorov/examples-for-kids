const LOCAL_DATA_KEY = 'example-for-kids';
const START_PAGE = 'StartPage';
const GAME_PAGE = 'GamePage';
const RESULT_PAGE = 'ResultPage';
const NO_DISPLAY_CLASS = 'd-none';

const MAX_NUMBER = 10;

const store = {
    page: START_PAGE,
    examples: [],
};

const getRandomNumber = (maxNumber) => Math.round(Math.random() * maxNumber);
const getFirstNumber = () => getRandomNumber(MAX_NUMBER);
const getSecondNumber = (firstNumber) => getRandomNumber(MAX_NUMBER - firstNumber);
const getSum = (first, second) => first + second;
const getExample = () => {
    const first = getFirstNumber();
    const second = getSecondNumber(first);

    return {
        first,
        second,
        sum: getSum(first, second),
    };
};

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

const startPage = document.querySelector(`.${START_PAGE}`);
const gamePage = document.querySelector(`.${GAME_PAGE}`);
const resultPage = document.querySelector(`.${RESULT_PAGE}`);

const renderPage = () => {
    [startPage, gamePage, resultPage].forEach(page => {
        if (page.classList.contains(store.page)) {
            page.classList.remove(NO_DISPLAY_CLASS);
        } else {
            page.classList.add(NO_DISPLAY_CLASS);
        }
    });
};

renderPage();

