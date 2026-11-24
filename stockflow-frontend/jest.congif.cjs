/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',

    testEnvironment: 'jsdom',

    roots: ['<rootDir>/src'],

    testMatch: [
        '**/?(*.)+(spec|test).[tj]s?(x)'
    ],

    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

    clearMocks: true,

    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.test.{ts,tsx}',
        '!src/**/*.spec.{ts,tsx}'
    ],

    coverageDirectory: 'coverage'
};
