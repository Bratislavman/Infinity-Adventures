module.exports = {
  rules: {
    "@typescript-eslint/no-inferrable-types": "off",
  },
  parser: "vue-eslint-parser",
  parserOptions: {
       "parser": "@typescript-eslint/parser",
      "ecmaVersion": 2020,
      "sourceType": "module"
  }
};