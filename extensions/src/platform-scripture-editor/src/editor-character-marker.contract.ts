/*
 * Compile-time checks of the character-marker slice of `EditorRef` against the INSTALLED
 * `@eten-tech-foundation/platform-editor`. Nothing imports this module: this extension's
 * `npm run typecheck` compiles it, and a change to any signature below fails that compile.
 *
 * Every character-marker suite supplies its own `EditorRef` stub, so those tests pass no matter
 * what the package actually ships, and `replaceCharacterMarker` and `extendCharacterMarker` are not
 * called anywhere yet. Without these checks, an operation can sit referenced-but-unreachable behind
 * an older editor pin with nothing noticing.
 *
 * Types cannot see parameter names, so a swap of `replaceCharacterMarker`'s two `string` parameters
 * would still compile. See `ChangeCharacterMarker` for why that order matters.
 */

import type { EditorRef } from '@eten-tech-foundation/platform-editor';

/** `true` only when `A` and `B` are the same type, not merely assignable one way or the other */
type IsExactly<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

/** Compiles only when `T` is `true` */
type Expect<T extends true> = T;

/** The character-marker operations this extension relies on, with the exact signatures it needs */
export type EditorRefCharacterMarkerContract = [
  // Called by `use-remove-character-marker.hook.ts`. The `boolean` matters: it is the outcome
  // signal that tells a declined removal from a real one.
  Expect<IsExactly<EditorRef['removeCharacterMarker'], (marker?: string) => boolean>>,
  // The operation `ChangeCharacterMarker` adapts: `(toMarker, fromMarker?)`.
  Expect<
    IsExactly<
      EditorRef['replaceCharacterMarker'],
      (toMarker: string, fromMarker?: string) => boolean
    >
  >,
  // The character-marker menu has no extend option yet (TODO(PT-4394)); pinned so the
  // partial-coverage row can be wired against a known shape rather than a guess.
  Expect<
    IsExactly<
      EditorRef['extendCharacterMarker'],
      (marker: string, conflictingMarkers?: readonly string[]) => boolean
    >
  >,
];
