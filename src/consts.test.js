import {DIFFICULTY, START_BUTTON_EASY_ID} from './consts';

describe('getDifficultyById', () => {
    it('should return correct difficulty', () => {
        expect(DIFFICULTY[START_BUTTON_EASY_ID]).toBe(10);
    });
});
