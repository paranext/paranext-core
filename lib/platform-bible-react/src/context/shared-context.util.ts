import { Context, createContext } from 'react';

/**
 * Names of the contexts {@link getSharedContext} keeps, each stored on `globalThis` under
 * `Symbol.for('platform-bible-react.context.<name>')`.
 *
 * An extension's web view bundles its own copy of `platform-bible-react`, while the platform
 * renders the providers for these contexts from its own copy. A plain `createContext` would give
 * each copy a separate context, so a provider the platform renders would never reach a component
 * from an extension's copy. Platform.Bible copies these slots from the main window into each web
 * view's frame before the web view's code runs, so every copy finds the same context.
 *
 * The value each context holds is shared between copies built from different versions of this
 * library, so a change to its shape must stay readable by older and newer copies;
 * `shared-context.util.test.tsx` pins the names and shapes so such a change shows in review. Only
 * this library and Platform.Bible write these slots; an extension must not.
 *
 * @experimental This export is unstable and may change or disappear without notice
 */
export const SHARED_CONTEXT_NAMES = Object.freeze([
  'inTooltip',
  'shortcutKeysLocalization',
] as const);

/** One of {@link SHARED_CONTEXT_NAMES} */
export type SharedContextName = (typeof SHARED_CONTEXT_NAMES)[number];

/**
 * Gets the `globalThis` key a shared context is stored under. Platform.Bible uses it to copy the
 * slots into each web view's frame; extensions do not need it.
 *
 * @param name The shared context's name
 * @returns The `Symbol.for` key of its slot
 * @experimental This function is unstable and may change or disappear without notice
 */
export function getSharedContextKey(name: SharedContextName): symbol {
  return Symbol.for(`platform-bible-react.context.${name}`);
}

/**
 * Gets the context stored under `name` on `globalThis`, creating and storing it with `defaultValue`
 * if no copy of this library has yet. See {@link SHARED_CONTEXT_NAMES}.
 */
export function getSharedContext<T>(name: SharedContextName, defaultValue: T): Context<T> {
  const key = getSharedContextKey(name);
  // `globalThis` has no symbol index signature, and the slot is only ever written here or copied
  // from another frame's slot of the same name, so it always holds a context of this type
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const registry = globalThis as unknown as Record<symbol, Context<T> | undefined>;
  const existing = registry[key];
  if (existing) return existing;
  const context = createContext(defaultValue);
  registry[key] = context;
  return context;
}
