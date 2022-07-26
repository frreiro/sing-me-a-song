/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
