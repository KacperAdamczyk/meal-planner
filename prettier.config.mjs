const config = {
  singleQuote: true,
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn'],
  overrides: [
    {
      files: 'components/ui/**/*',
      options: {
        singleQuote: false,
        semi: false,
        trailingComma: 'es5',
      },
    },
  ],
};

export default config;
