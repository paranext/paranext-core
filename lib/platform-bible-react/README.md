# Platform.Bible React

A set of React hooks and components that allow developers of Platform.Bible extensions to have the same look and feel as the main application.

## Development

Inspired by https://github.com/jasonsturges/vite-typescript-npm-package

When we publish this npm package, then in the root `package.json`, a version can be given to `platform-bible-react` instead of the existing file link. At that time we will likely need to use `npm link` and `npm unlink` to develop the components ([see here](https://github.com/jasonsturges/vite-typescript-npm-package#development)).

TODO:

- [ ] Decide if this package will be public, if not it will probably need an NPM organization setup to publish it to privately.
- [ ] What NPM user login will we use to publish it (each developer or an app-wide user)?

### Building

#### Setting up

To set up the dev environment to build, you must do a couple of things **in order**:

1. `npm i` (here)
2. `npm i --ignore-scripts` (in `paranext-core` root)

Note: `--ignore-scripts` is only to prevent unnecessary work. You can leave it out if you want.

Note: any time you run any `npm` commands related to installing or uninstalling packages, you must
run `npm i --ignore-scripts` in `paranext-core` root again in order to run commands in here
successfully. This used to be run automatically, but linux developers were experiencing significant
issues with it.

#### Building `platform-bible-react`

Once you have set up your environment, you can run the build command in this folder to build `platform-bible-react`:

```bash
npm run build
```

Or you can build from `paranext-core`:

```bash
npm run build:platform-bible-react
```

If you want a quick build that doesn't lint, run the following:

```bash
npm run build:basic
```

Do not commit changes after running this basic build. Before committing, always run a full build.
