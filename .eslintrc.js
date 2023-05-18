/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["formatjs", "@typescript-eslint"],
  rules: {
    "formatjs/no-offset": "error",
  },
  root: true,
};
