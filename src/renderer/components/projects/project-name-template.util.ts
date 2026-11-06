import { formatReplacementStringToArray, PROJECT_NAME_SEPARATOR } from 'platform-bible-utils';

/** How a localized `{shortName}`/`{fullName}` template lays its two fields out. */
export type ProjectNameTemplateLayout = {
  /** Whether the full name reads before the short name in this template. */
  isFullNameFirst: boolean;
  /** The literal text the template puts between the two names. */
  separator: string;
};

/**
 * The layout a surface falls back to when a template does not name both fields exactly once: the
 * shared helper's own order and separator.
 */
const DEFAULT_LAYOUT: ProjectNameTemplateLayout = {
  isFullNameFirst: false,
  separator: PROJECT_NAME_SEPARATOR,
};

/** Sentinels substituted for the two placeholders; identity is what locates them in the result. */
const SHORT_NAME_SLOT = { slot: 'shortName' };
const FULL_NAME_SLOT = { slot: 'fullName' };

/**
 * Reads the field order and separator out of a localized project-name format string such as
 * `'{shortName} - {fullName}'`.
 *
 * A surface that renders the two names as separate nodes — so each can shrink on its own — cannot
 * substitute into the template directly, but it still has to agree with the template about order
 * and punctuation, or its own tooltip contradicts it the moment a locale reorders the pair. Parsing
 * the template is what keeps the one string authoritative for both.
 *
 * Only the text BETWEEN the two placeholders is reported. A two-node surface renders the two names
 * and that separator alone, so literal text a template puts before the first name or after the
 * second does not reach the visible label — it survives only in the joined form
 * ({@link formatReplacementString}) such a surface shows in its tooltip.
 *
 * Falls back to {@link PROJECT_NAME_SEPARATOR} and short-name-first whenever the template does not
 * contain exactly one `{shortName}` and one `{fullName}` — a mistranslation that drops or repeats a
 * placeholder yields a readable label rather than a broken one.
 *
 * @param template Format string containing `{shortName}` and `{fullName}` placeholders.
 * @returns The order the two names read in and the text between them.
 */
export function parseProjectNameTemplate(template: string): ProjectNameTemplateLayout {
  const parts = formatReplacementStringToArray<object>(template, {
    shortName: SHORT_NAME_SLOT,
    fullName: FULL_NAME_SLOT,
  });

  const shortNameIndex = parts.indexOf(SHORT_NAME_SLOT);
  const fullNameIndex = parts.indexOf(FULL_NAME_SLOT);
  if (shortNameIndex < 0 || fullNameIndex < 0) return DEFAULT_LAYOUT;
  if (parts.lastIndexOf(SHORT_NAME_SLOT) !== shortNameIndex) return DEFAULT_LAYOUT;
  if (parts.lastIndexOf(FULL_NAME_SLOT) !== fullNameIndex) return DEFAULT_LAYOUT;

  const [firstIndex, secondIndex] =
    shortNameIndex < fullNameIndex
      ? [shortNameIndex, fullNameIndex]
      : [fullNameIndex, shortNameIndex];

  // Adjacent literals are already concatenated into one entry, so anything between the two slots is
  // a single string — or nothing at all, for a template that abuts them.
  const between = parts.slice(firstIndex + 1, secondIndex);
  const separator = between.length === 1 && typeof between[0] === 'string' ? between[0] : '';

  return { isFullNameFirst: fullNameIndex < shortNameIndex, separator };
}

export default parseProjectNameTemplate;
