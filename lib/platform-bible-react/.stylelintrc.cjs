module.exports = {
  extends: ['../../.stylelintrc.js', '@dreamsicle.io/stylelint-config-tailwindcss'],
  overrides: [
    {
      files: ['src/scoped-preflight.css'],
      rules: {
        // scoped-preflight.css wraps Tailwind's preflight inside .pr-twp using CSS nesting.
        // The `&` selectors (e.g. `& *`, `& ::after`) are required for scoping and are not redundant.
        'scss/selector-no-redundant-nesting-selector': null,
        // Vendor-prefixed properties are copied verbatim from Tailwind's official preflight.
        'property-no-vendor-prefix': null,
      },
    },
  ],
};
