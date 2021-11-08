module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "no-console": 0,
    "quotes": [1, "double", { "avoidEscape": true }],
    "semi": [1, "always"],
  },
  env: {
    browser: true,
    node: true,
  },
};