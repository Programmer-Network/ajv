module.exports = {
  arrowParens: "avoid",
  bracketSpacing: true,
  jsxSingleQuote: true,
  printWidth: 80,
  proseWrap: "always",
  quoteProps: "as-needed",
  semi: true,
  singleQuote: false,
  trailingComma: "none",
  useTabs: false,
  endOfLine: "auto",
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")]
};
