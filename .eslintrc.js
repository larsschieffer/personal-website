/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:jsx-a11y/recommended",
    "plugin:jsx-a11y/strict",
    "plugin:@typescript-eslint/recommended",
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "plugin:vitest/all",
    "prettier",
  ],
  plugins: ["formatjs", "@typescript-eslint", "prefer-arrow", "vitest"],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict",
      ],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  root: true,
  rules: {
    "@typescript-eslint/explicit-function-return-type": "error",
    "prefer-arrow/prefer-arrow-functions": [
      "warn",
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    "@typescript-eslint/typedef": [
      "error",
      {
        arrayDestructuring: false,
        arrowParameter: true,
        memberVariableDeclaration: false,
        objectDestructuring: false,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: false,
      },
    ],
    "no-console": "error",
    "vitest/no-hooks": "off",
  },
};
