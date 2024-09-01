# React + TypeScript + Vite Setup

This template provides a minimal setup to get React working with TypeScript in Vite, featuring Hot Module Replacement (HMR) and ESLint rules. It includes configurations for efficient development and type-safe linting.

## Project Setup

### Official Plugins

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)**: Uses [Babel](https://babeljs.io/) for Fast Refresh.
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)**: Uses [SWC](https://swc.rs/) for Fast Refresh.

## ESLint Configuration

For a production application, it's recommended to enable type-aware lint rules. Configure ESLint to ensure type safety and code quality:

1. **Configure ESLint with TypeScript:**

   Update the `parserOptions` in your ESLint configuration to include type checking:

   ```js
   // eslint.config.js
   import { defineConfig } from "eslint";
   import react from "eslint-plugin-react";
   import typescript from "eslint-plugin-typescript";

   export default defineConfig({
     parserOptions: {
       project: ["./tsconfig.json"],
       tsconfigRootDir: __dirname,
     },
     plugins: {
       react,
       typescript,
     },
     settings: {
       react: {
         version: "18.3",
       },
     },
     rules: {
       ...react.configs.recommended.rules,
       ...react.configs["jsx-runtime"].rules,
       // Additional TypeScript rules
       "typescript/explicit-module-boundary-types": "warn",
       "typescript/no-explicit-any": "warn",
     },
   });
   ```

2. **Install Required ESLint Plugins::**

   Ensure you have the necessary ESLint plugins installed:

   ```
   npm install eslint eslint-plugin-react eslint-plugin-typescript --save-dev
   ```
