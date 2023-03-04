import {getNumber} from '../first';

describe('first test', () => {
    it('return 5', () => {
        const min = 0;
        const max = 10;

        const results = Array(100)
            .fill(undefined)
            .map(() => getNumber({min, max}));

        results.forEach(result => {
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });
    });
});
