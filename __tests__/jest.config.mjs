import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  testEnvironment: "node",
  globalSetup: path.join(__dirname, "jestConfig/setup.mjs"),
  moduleNameMapper: {
    "^#models/(.*)$": "<rootDir>/models/$1",
    "^#controllers/(.*)$": "<rootDir>/controllers/$1",
  },
  extensionsToTreatAsEsm: [".js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
