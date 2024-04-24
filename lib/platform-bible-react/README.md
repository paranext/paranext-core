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

To set up the dev environment to build, you must run the following:

```bash
npm i
```

#### Previewing `platform-bible-react`

Once you have set up your environment, you can run the following command in this folder to preview `platform-bible-react` components (`src\preview\app.component.tsx`):

```bash
npm start
```

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
