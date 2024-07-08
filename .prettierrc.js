module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  endOfLine: 'lf',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html',
      },
    },
  ],
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson',
    'prettier-plugin-two-style-order',
  ],
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: "auto",
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
  vueIndentScriptAndStyle: false,
  endOfLine: "auto"
};
