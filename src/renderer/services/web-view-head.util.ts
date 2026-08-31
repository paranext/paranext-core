/**
 * Splices `headContent` into `webViewContent` immediately after the opening `<head ...>` tag, which
 * is how a non-URL web view receives its Content-Security-Policy `<meta>`, its `papi` import
 * script, and its stylesheets.
 *
 * Uses native `String` methods rather than the grapheme-aware helpers in `platform-bible-utils`:
 * the needles are ASCII markup, and the indexes are only ever used to splice the same string they
 * came from, so the index space never escapes. Segmenting instead costs roughly a second per
 * megabyte of document — see the measurements in
 * `.context/plans/pt-2626-native-string-call-sites.md` — and web views inline their whole bundled
 * app, so a megabyte or two is ordinary.
 *
 * KNOWN GAP, deliberately preserved: the splice point is "the first `>` at or after the first
 * `<head`", which is not always the end of the opening `<head>` tag.
 *
 * - A document with no `<head` at all leaves the search index at `-1`, which `indexOf` clamps to 0,
 *   so the content is spliced after the first `>` _anywhere_ in the document. A CSP `<meta>` is
 *   only honored inside `<head>`, so such a document ends up with no effective CSP.
 * - An attribute value containing `>` (`<head data-x="a>b">`) splits the opening tag.
 *
 * Guarding either case would change what malformed documents render, so it is a separate decision
 * from the native-`String` conversion that introduced this function; the tests pin today's behavior
 * so a future guard is a visible, deliberate change rather than an accident.
 *
 * @param webViewContent The full web view HTML document
 * @param headContent Markup to insert directly after the opening `<head>` tag
 * @returns `webViewContent` with `headContent` spliced in
 */
export function spliceIntoWebViewHead(webViewContent: string, headContent: string): string {
  const headStart = webViewContent.indexOf('<head');
  const headEnd = webViewContent.indexOf('>', headStart);
  return `${webViewContent.substring(0, headEnd + 1)}${headContent}${webViewContent.substring(headEnd + 1)}`;
}
