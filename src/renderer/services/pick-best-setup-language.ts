/**
 * Picks the best setup-dialog language for an OS/browser locale, or `undefined` if none qualifies.
 *
 * Maximizes likely subtags first (so region-only locales resolve to their script — `zh-CN` →
 * `zh-Hans-CN`, `zh-TW` → `zh-Hant-TW`), then matches progressively shorter forms of the tag
 * case-insensitively against `qualifyingTags`, returning the qualifying tag with its own casing.
 * Region is effectively ignored via the fallback (`fr-CA` → `fr`). POSIX-style locales (`en_US`,
 * `fr_CA.UTF-8@modifier`) are normalized to BCP-47 shape first.
 *
 * @param osLocale The OS/browser locale (e.g. from `getCurrentLocale()`), any BCP-47-ish string.
 * @param qualifyingTags The tags that have enough setup-dialog localization (raw locale-file tags,
 *   e.g. `zh-hans`), typically `Object.keys(await getSetupDialogLanguages())`.
 * @returns The matching qualifying tag (its own casing), or `undefined` if none matches.
 */
export function pickBestSetupLanguage(
  osLocale: string,
  qualifyingTags: string[],
): string | undefined {
  const byLowerTag = new Map(qualifyingTags.map((tag) => [tag.toLowerCase(), tag]));

  // Normalize POSIX shapes that Intl.Locale rejects: `_` subtag separators, and a trailing
  // `.charset` / `@modifier` (e.g. `en_US.UTF-8@euro` → `en-US`).
  const normalized = osLocale.replace(/[.@].*$/, '').replace(/_/g, '-');

  let maximized = normalized;
  try {
    maximized = new Intl.Locale(normalized).maximize().toString();
  } catch {
    // Invalid/empty locale — fall back to matching the normalized input as-is.
  }

  const subtags = maximized.toLowerCase().split('-');
  for (let end = subtags.length; end > 0; end -= 1) {
    const match = byLowerTag.get(subtags.slice(0, end).join('-'));
    if (match) return match;
  }
  return undefined;
}

export default pickBestSetupLanguage;
