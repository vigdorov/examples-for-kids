module.exports = {
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    reporters: ['default', 'jest-junit'],
    coverageReporters: ['cobertura', 'lcov', 'text'],
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/**/*.test.{js,jsx}', '!src/index.js', '!src/reportWebVitals.js'],
    coverageDirectory: 'coverage',
};
