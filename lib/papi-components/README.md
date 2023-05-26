# PAPI Components

These components allow developers of Platform.Bible extensions to have the same look and feel as the main application.

## Development

Inspired by https://github.com/jasonsturges/vite-typescript-npm-package

When we publish this npm package, then in the root `package.json`, a version can be given to `papi-components` instead of the existing file link. At that time we will likely need to use `npm link` and `npm unlink` to develop the components ([see here](https://github.com/jasonsturges/vite-typescript-npm-package#development)).

TODO:

- [ ] Decide if this package will be public, if not it will probably need an NPM organization setup to publish it to privately.
- [ ] What NPM user login will we use to publish it (each developer or an app-wide user)?
- [ ] Currently the package is called `papi-components`, perhaps we need to namespace it, e.g. `sil-papi-components` or `ubs-components`?
