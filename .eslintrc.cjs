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
    "import/extensions": ["error", "always"],
    "import/no-import-module-exports": [
      "off",
      {
        exceptions: ["**/*/some-file.js"],
      },
    ],
    "no-underscore-dangle": ["off", { allow: ["_id"] }],
    eqeqeq: "off",
    curly: "error",
    quotes: ["error", "double"],
  },
};
