import { describe, expect, test } from 'vitest';
import { indexOf, substring } from 'platform-bible-utils';
import { spliceIntoWebViewHead } from '@renderer/services/web-view-head.util';

const INJECTED = '<meta http-equiv="Content-Security-Policy" content="default-src \'none\';">';

/**
 * The grapheme-aware implementation `spliceIntoWebViewHead` replaced. Every case below asserts the
 * two agree, so the test fails if a conversion ever mixes a UTF-16 index with a grapheme-indexed
 * `substring` — the failure mode that motivated converting the whole expression as a unit.
 */
function spliceIntoWebViewHeadWithGraphemeHelpers(
  webViewContent: string,
  headContent: string,
): string {
  const headStart = indexOf(webViewContent, '<head');
  const headEnd = indexOf(webViewContent, '>', headStart);
  return `${substring(webViewContent, 0, headEnd + 1)}${headContent}${substring(webViewContent, headEnd + 1)}`;
}

/** Documents whose text around `<head>` makes grapheme count and UTF-16 length disagree */
const documents: [name: string, document: string][] = [
  ['plain ASCII', '<html><head><title>Hi</title></head><body>Hello</body></html>'],
  [
    'astral characters before the head tag',
    '<!-- \u{1F984}\u{1F469}‍\u{1F467} --><html><head><title>Hi</title></head><body>x</body></html>',
  ],
  [
    'astral characters after the head tag',
    '<html><head><title>\u{1F984}</title></head><body>\u{1F469}‍\u{1F467}\u{1F984}</body></html>',
  ],
  [
    'combining marks on both sides of the head tag',
    '<!-- Amélie --><html><head><title>Amélie</title></head><body>éé</body></html>',
  ],
  [
    'a CRLF pair, which is one grapheme cluster but two code units',
    '<html>\r\n<head>\r\n<title>Hi</title>\r\n</head>\r\n<body>x</body>\r\n</html>',
  ],
  ['attributes on the head tag', '<html><head lang="\u{1F984}"><title>Hi</title></head></html>'],
];

describe('spliceIntoWebViewHead', () => {
  test.each(documents)('inserts after the opening head tag: %s', (_name, document) => {
    const spliced = spliceIntoWebViewHead(document, INJECTED);

    const openingTagEnd = document.indexOf('>', document.indexOf('<head')) + 1;
    expect(spliced).toBe(
      `${document.substring(0, openingTagEnd)}${INJECTED}${document.substring(openingTagEnd)}`,
    );
    // Nothing but the injected markup may differ from the original document
    expect(spliced.replace(INJECTED, '')).toBe(document);
  });

  test.each(documents)(
    'is byte-identical to the grapheme-aware implementation: %s',
    (_name, document) => {
      expect(spliceIntoWebViewHead(document, INJECTED)).toBe(
        spliceIntoWebViewHeadWithGraphemeHelpers(document, INJECTED),
      );
    },
  );

  // These pin the known gaps documented on `spliceIntoWebViewHead` rather than endorsing them. A
  // change here is a deliberate behavior change on malformed documents, not a refactor.
  describe('documents with no usable opening head tag', () => {
    test('splices after the first `>` anywhere when there is no head tag, leaving the CSP outside any head', () => {
      const document = '<html><body>\u{1F984} no head here</body></html>';

      const spliced = spliceIntoWebViewHead(document, INJECTED);

      expect(spliced).toBe(`<html>${INJECTED}<body>\u{1F984} no head here</body></html>`);
      expect(spliced).toBe(spliceIntoWebViewHeadWithGraphemeHelpers(document, INJECTED));
    });

    test('splices inside the opening tag when an attribute value contains `>`', () => {
      const document = '<html><head data-x="a>b"><title>Hi</title></head></html>';

      const spliced = spliceIntoWebViewHead(document, INJECTED);

      expect(spliced).toBe(`<html><head data-x="a>${INJECTED}b"><title>Hi</title></head></html>`);
      expect(spliced).toBe(spliceIntoWebViewHeadWithGraphemeHelpers(document, INJECTED));
    });
  });
});
