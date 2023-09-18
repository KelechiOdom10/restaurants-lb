/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["plugin:astro/recommended", "plugin:tailwindcss/recommended"],
  plugins: ["unused-imports", "jsx-a11y", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error",
        "tailwindcss/no-custom-classname": "off",
      },
    },
    {
      files: ["*.mjs", "*.cjs"],
      parser: "@typescript-eslint/parser",
      rules: {
        "import/prefer-default-export": "off",
      },
    },
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx", "!*.stories.tsx"],
      extends: ["plugin:@typescript-eslint/recommended"],
      plugins: ["unused-imports", "import"],
      parser: "@typescript-eslint/parser",
      rules: {
        "unused-imports/no-unused-imports": "error",
        "import/order": [
          1,
          {
            "newlines-between": "always",
            pathGroups: [
              {
                pattern: "components",
                group: "internal",
              },
              {
                pattern: "common",
                group: "internal",
              },
              {
                pattern: "routes/ **",
                group: "internal",
              },
              {
                pattern: "assets/**",
                group: "internal",
                position: "after",
              },
            ],
            pathGroupsExcludedImportTypes: ["internal"],
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
          },
        ],
        "prettier/prettier": "off",
        "unused-imports/no-unused-vars": [
          "warn",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
          },
        ],
        "no-console": "warn",
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
