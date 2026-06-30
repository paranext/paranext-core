import { useStylesheet } from 'platform-bible-react';
import hbkengStyles from './marker-styles/hbkeng.scss?inline';
import tnnStyles from './marker-styles/tnn.scss?inline';
import tndStyles from './marker-styles/tnd.scss?inline';
import commentaryOverrides from './marker-styles/commentary-overrides.scss?inline';

// Keyed on DBL entry UID (lowercase). A locally-installed DBL resource's projectId is the
// dblEntryUid plus a suffix, so we match by `startsWith`. The same UIDs back the C#
// `CommentariesWhiteList` in DblResourcesDataProvider.cs — keep these two lists in sync.
const COMMENTARY_STYLES_BY_DBL_ENTRY_UID: Record<string, string> = {
  '97196133a859179b': hbkengStyles, // HBKENG — UBS Translator's Handbook (English)
  '090f7cbf7924b245': tnnStyles, // TNN    — UBS Translator's Notes
  b58b80b798e22be6: tndStyles, // TND    — UBS Translator's Notes (Deuterocanon)
};

/**
 * Loads the marker stylesheet for a supported commentary (HBKENG, TNN, TND) when the project being
 * displayed in this WebView is one of those commentaries. No-op for any other project.
 *
 * The stylesheet is injected into the WebView's iframe via a `<style>` element, so the rules only
 * affect the current iframe and do not leak into other open WebViews (project editor, other
 * resource panels, etc.). Switching commentaries tears down the previous stylesheet before
 * installing the new one.
 *
 * Stylesheets are imported statically so they ship in the webview bundle — webpack's runtime chunk
 * loader cannot resolve `publicPath` inside an injected-string iframe, so dynamic `import()` of the
 * stylesheets does not work in this environment.
 *
 * Matching is done by `projectId` rather than `platform.name` because the project name is
 * user-editable and not unique, while a locally-installed DBL resource's projectId is prefixed by
 * its DBL entry UID — globally unique and stable.
 *
 * @param projectId The project whose id should be checked against the commentary allowlist. For a
 *   resource panel, pass the _resource's_ project id (the one whose content is actually being
 *   rendered), not the user's project id.
 */
export function useCommentaryMarkerStyles(projectId: string | undefined): void {
  const normalized = (projectId ?? '').toLowerCase();
  const matchedUid = Object.keys(COMMENTARY_STYLES_BY_DBL_ENTRY_UID).find((uid) =>
    normalized.startsWith(uid),
  );
  const css = matchedUid ? COMMENTARY_STYLES_BY_DBL_ENTRY_UID[matchedUid] : undefined;

  // Append hand-authored overrides AFTER the generated stylesheet so they win the cascade (equal
  // specificity, later source order) and survive regeneration of the generated SCSS. Only injected
  // when a commentary actually matched, so it never leaks into other projects/resources.
  useStylesheet(css ? `${css}\n${commentaryOverrides}` : undefined);
}
