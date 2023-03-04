export const LOCAL_DATA_KEY = 'example-for-kids';

export const START_PAGE = 'StartPage';
export const GAME_PAGE = 'GamePage';
export const RESULT_PAGE = 'ResultPage';

export const NO_DISPLAY_CLASS = 'd-none';
export const TEXT_SUCCESS_CLASS = 'text-success';
export const TEXT_DANGER_CLASS = 'text-danger';
export const NAME_INPUT_ID = 'startPageNameInput';

export const START_BUTTON_EASY_ID = 'start-button-easy';
export const START_BUTTON_NORMAL_ID = 'start-button-normal';
export const START_BUTTON_HARD_ID = 'start-button-hard';

export const START_MULTI_BUTTON_NORMAL_ID = 'start-multi-button-normal';
export const START_MULTI_BUTTON_HARD_ID = 'start-multi-button-hard';

export const CHECK_BUTTON_ID = 'check-button';
export const REPEAT_BUTTON_ID = 'repeat-button';
export const RESET_BUTTON_ID = 'reset-button';

export const START_FORM_ID = 'start-form';
export const EXAMPLE_FORM_ID = 'form-example';

export const FIRST_INPUT_ID = 'first-input';
export const SECOND_INPUT_ID = 'second-input';
export const SUM_INPUT_ID = 'sum-input';
export const RESULT_CONTAINER_ID = 'result-container';
export const SIGN_SPAN_ID = 'sign-span';

export const KIND = {
    PLUS_MINUS: 'PLUS_MINUS',
    MULTI_DIVISION: 'MULTI_DIVISION',
};

export const EXAMPLE_TYPE = {
    PLUS: '+',
    MINUS: '-',
    MULTI: '*',
    DIVISION: '/',
};

export const EVENTS = {
    CLICK: 'click',
    INPUT: 'input',
    SUBMIT: 'submit',
};

export const DIFFICULTY = {
    [START_BUTTON_EASY_ID]: 10,
    [START_BUTTON_NORMAL_ID]: 20,
    [START_BUTTON_HARD_ID]: 100,
    [START_MULTI_BUTTON_NORMAL_ID]: 10,
    [START_MULTI_BUTTON_HARD_ID]: 20,
};

export const MAX_COUNT_EXAMPLES = 10;

export const DEFAULT_STORE = {
    page: START_PAGE,
    results: [],
    userName: '',
    answerCount: 0,
    currentExample: {},
};
