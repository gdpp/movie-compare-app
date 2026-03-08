export default {
  testEnvironment: "node",
  transform: {},
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js"],
  moduleFileExtensions: ["js"],
  testMatch: [
    "**/tests/unit/**/*.test.js",
    "**/tests/integration/**/*.test.js",
  ],
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
