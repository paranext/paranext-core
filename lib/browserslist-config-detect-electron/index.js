/**
 * This file tells browserslist which version of electron we use by looking at our package.json.
 * However, browserslist does not support parsing beta versions of electron, so we need to strip the
 * beta suffix.
 *
 * Thanks to browserlist-config-erb for the idea.
 *
 * Changes from browserslist-config-erb:
 *
 * - Chopped off the version info after the hyphen
 * - Removed peer dependency on electron >=12.0.0 because it was also having trouble with the beta
 */
// This class is CJS, so we must use `require`
// eslint-disable-next-line global-require
module.exports = [`electron ${require('electron/package.json').version.split('-')[0]}`];
