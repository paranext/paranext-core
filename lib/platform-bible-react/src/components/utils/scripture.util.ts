export type Scope = 'selectedText' | 'verse' | 'chapter' | 'book' | 'selectedBooks';
/** Same as `Scope` plus a verse-range option. Used by `ScopeSelector` when range mode is enabled. */
export type ScopeWithRange = Scope | 'range';
