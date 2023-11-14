export default {
  testEnvironment: "node",
  moduleNameMapper: {
    "^#models/(.*)$": "<rootDir>/models/$1",
    "^#controllers/(.*)$": "<rootDir>/controllers/$1",
  },
  extensionsToTreatAsEsm: [".js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
