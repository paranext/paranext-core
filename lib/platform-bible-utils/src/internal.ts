// Unstable API surface for platform-bible-utils.
//
// Everything exported here is importable from `platform-bible-utils/internal`
// but carries NO stability guarantee — symbols may change shape, move, or
// disappear at any time without a deprecation cycle. Extensions may use
// it, but should accept the maintenance burden of breaking changes.
//
// Stable exports live in `./index.ts`. The two entry points are maintained
// as separate, independent API surfaces with different support levels.

export { DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS } from './scripture/scripture-util';
