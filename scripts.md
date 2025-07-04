# NPM Script Patterns and Standardization in paranext-core

This document describes the patterns and best practices for npm scripts in the paranext-core monorepo. It explains how and why scripts are structured the way they are, and how to maximize the benefits of npm workspaces for development, formatting, linting, testing, and automation.

---

## Summary Table of Key Scripts

| Script             | Where     | What it does                                  |
| ------------------ | --------- | --------------------------------------------- |
| build              | root, all | Build the package                             |
| lint               | root, all | Lint the package                              |
| format:check       | root, all | Check formatting                              |
| test               | root, all | Run tests                                     |
| typecheck          | all       | TypeScript type checking                      |
| lint:staged        | root      | Lint staged files (used in pre-commit)        |
| pre-commit (husky) | .husky    | Runs lint:staged and yalc check before commit |

---

## Patterns for NPM Scripts in a Monorepo

### 1. Consistent Script Names Across Packages

**Pattern:** Every package (root and subprojects) should define the same set of core scripts: `build`, `lint`, `format:check`, `test`, and `typecheck`.

**Why:**

- Enables workspace-wide commands like `npm run -ws build` to work seamlessly.
- Makes it easy for developers to know what scripts are available everywhere.
- Simplifies CI/CD and automation.

**Example:**

```json
{
  "scripts": {
    "build": "...",
    "lint": "...",
    "format:check": "...",
    "test": "...",
    "typecheck": "..."
  }
}
```

### 2. Chaining and Composing Scripts

**Pattern:** Scripts can chain together multiple steps using `&&` or by calling other npm scripts.

**Why:**

- Keeps scripts DRY and maintainable.
- Allows for complex workflows (e.g., build, then lint, then test) with a single command.

**Example:**

```json
{
  "scripts": {
    "build": "npm run build:basic && npm run lint-fix && npm run test -- --run"
  }
}
```

### 3. Using npm Workspaces for Bulk Operations

**Pattern:** Use `npm run -ws <script>` to run a script in all workspaces that define it.

**Why:**

- Efficiently runs builds, lints, or tests across all packages.
- Reduces duplication and manual effort.

**Example:**

```sh
npm run -ws build
npm run -ws lint
npm run -ws format:check
npm run -ws test
```

### 4. Pre-commit and Pre-push Automation

**Pattern:** Use Husky and `lint-staged` to enforce formatting and linting before code is committed.

**Why:**

- Prevents style and formatting issues from entering the codebase.
- Ensures code quality at the earliest point.

**Example:** `.husky/pre-commit` runs `npm run lint:staged` and `npx yalc check`.

### 5. Standardizing Linting and Formatting

**Pattern:** All packages should use the same tools and config for linting and formatting (e.g., Prettier, ESLint, Stylelint).

**Why:**

- Ensures a consistent code style across the monorepo.
- Makes it easy to run checks everywhere with the same commands.

### 6. Naming Conventions for Documentation Scripts

**Use `docs:build`.** Both `build:docs` and `docs:build` are script names commonly found in `package.json` files in JavaScript/TypeScript projects. They are used to automate the process of building project documentation.

- **`build:docs`:**  
  This script name follows the convention of "action:target" (i.e., build the docs). It's commonly used in single-package repositories.

  ```json
  "scripts": {
    "build:docs": "typedoc src"
  }
  ```

- **`docs:build`:**  
  This script name follows the "target:action" convention (i.e., docs build). It's often seen in monorepos or projects where documentation is a top-level concern, possibly alongside other doc-related scripts (like `docs:serve`, `docs:deploy`).

  ```json
  "scripts": {
    "docs:build": "docusaurus build"
  }
  ```

Since this is a monorepo, it uses `docs:build`.

---

## Opportunities for Increased Standardization

- **Ensure all packages define the core scripts:** If any subproject is missing `build`, `lint`, `format:check`, `test`, or `typecheck`, add them.
- **Align script implementations:** Where possible, use the same commands and tools for each script across all packages.
- **Document script responsibilities:** Make it clear in each package what each script is responsible for (e.g., does `build` also lint and test, or just build?).
- **Centralize config:** Use shared config files for tools like Prettier, ESLint, and Stylelint to avoid drift.
- **Use workspace commands for CI/CD:** Prefer `npm run -ws <script>` in CI/CD pipelines to ensure all packages are checked.

---

## Why These Patterns Matter

- **Predictability:** Developers know what to expect in every package.
- **Efficiency:** Workspace commands save time and reduce errors.
- **Scalability:** As the monorepo grows, standardized scripts make it easier to add new packages and onboard new contributors.
- **Automation:** Consistent scripts enable robust automation for testing, building, and releasing.

---

## Example Usage

- **Build all packages:**
  ```sh
  npm run -ws build
  ```
- **Lint all packages:**
  ```sh
  npm run -ws lint
  ```
- **Format check all packages:**
  ```sh
  npm run -ws format:check
  ```
- **Test all packages:**
  ```sh
  npm run -ws test
  ```

---

For more details, see the npm workspaces documentation: https://docs.npmjs.com/cli/v10/using-npm/workspaces
