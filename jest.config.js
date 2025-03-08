module.exports = {
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    reporters: ['default', 'jest-junit'],
};
