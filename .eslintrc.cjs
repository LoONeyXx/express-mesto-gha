module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "func-names": ["off", "always"],
    "linebreak-style": 0,
    "no-unused-vars": ["off", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    "import/extensions": ["error", "always"],
    "import/no-import-module-exports": [
      "off",
      {
        exceptions: ["**/*/some-file.js"],
      },
    ],
    "no-underscore-dangle": ["off", { allow: ["foo_", "_bar"] }],
    eqeqeq: "off",
    curly: "error",
    quotes: ["error", "double"],
  },
};
