module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ["airbnb", "airbnb/hooks"],
  globals: {},
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "import", "react-hooks","jsx-a11y"],
  ignorePatterns: ["node_modules/"],
  rules: {"react/prop-types": 0, "no-underscore-dangle":  ["error", { "allow": ["_id"] }],
    "import/prefer-default-export": "off", "react/jsx-props-no-spreading": "off", 'react/jsx-fragments': ['off', 'element'], },
  settings: {
    react: {
      version: "latest",
    },
  },
};
