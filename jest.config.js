module.exports = {
    clearMocks: true,
    testMatch: ['**/__tests__/**/*.(j|t)s?(x)', '**/?(*.)+(spec|test).(j|t)s?(x)'],
    testPathIgnorePatterns: [
        '(.*)/dist'
    ],
    preset: 'ts-jest',
};