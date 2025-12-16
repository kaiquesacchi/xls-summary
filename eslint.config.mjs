import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import eslintPluginZodX from "eslint-plugin-zod-x";
import cspell from "@cspell/eslint-plugin/recommended";
import prettier from "eslint-plugin-prettier/recommended";
import typescript from "typescript-eslint";

// eslint-disable-next-line @typescript-eslint/no-deprecated
export default typescript.config([
  typescript.configs.strictTypeChecked,
  typescript.configs.stylisticTypeChecked,
  cspell,
  eslintPluginZodX.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat["jsx-runtime"],
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [],
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": eslintPluginReactRefresh,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,
      "@typescript-eslint/consistent-type-definitions": ["error", "type"]
    },
  },
  prettier, // Must be the last one
]);
