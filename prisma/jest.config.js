module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "babel-jest",
      { presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"] }
    ],
  },
};
