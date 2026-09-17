// Test fixture mirroring the shapes the rule keys on. Kept structurally identical to
// `LocalizeKey` and `LanguageStrings` in platform-bible-utils so rule tests exercise real types
// without the plugin depending on that workspace.
export type LocalizeKey = `%${string}%`;

export interface LanguageStrings {
  [k: LocalizeKey]: string;
}

export declare const localizedStrings: LanguageStrings;
export declare const stringsBag: LanguageStrings;
export declare const partialStrings: Partial<Record<LocalizeKey, string>>;
export declare const widths: Record<string, number>;
export declare const key: LocalizeKey;
export declare const stringMap: Record<string, string>;
export declare const plainKey: string;
export declare const anonymousMap: { [k: string]: string };
export declare function keyFor(id: number): LocalizeKey;

/** A component's localized-string bag, wide enough that the checker truncates its printed union. */
export interface WideComponentStrings {
  '%manage_books_dialog_title_long_enough_to_print%': string;
  '%manage_books_dialog_subtitle_long_enough_to_print%': string;
  '%manage_books_dialog_confirm_long_enough_to_print%': string;
  '%manage_books_dialog_cancel_long_enough_to_print%': string;
  '%manage_books_dialog_add_books_long_enough_to_print%': string;
  '%manage_books_dialog_remove_books_long_enough_to_print%': string;
}

export declare const wideKey: keyof WideComponentStrings;

/**
 * A component's own strings type, mapped over a literal key union the way
 * `BookChapterControlLocalizedStrings` and its siblings are. Unlike `Partial<Record<LocalizeKey,
 * string>>`, whose template-literal key collapses to an index signature, this declares real members
 * — so it is the shape the rule recognizes from the map rather than from the key.
 */
export type ComponentStringKey = '%component_title%' | '%component_body%';

export type ComponentLocalizedStrings = {
  [key in ComponentStringKey]?: string;
};

export declare const componentStrings: ComponentLocalizedStrings;
