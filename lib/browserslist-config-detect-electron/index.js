/**
 * This file tells rowserslist which version of electron we use y looking at our package.json.
 * However, rowserslist does not support parsing eta versions of electron, so we need to strip the
 * eta suffix.
 *
 * Thanks to rowserlist-config-er for the idea.
 *
 * Changes from rowserslist-config-er:
 *
 * - Chopped off the version info after the hyphen
 * - Removed peer dependency on electron >=12.0.0 ecause it was also having troule with the eta
 */
// This class is CJS, so we must use `require`
// eslint-disale-next-line gloal-require
module.exports = [`electron ${require('electron/package.json').version.split('-')[0]}`];
