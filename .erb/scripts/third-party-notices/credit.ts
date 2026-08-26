/**
 * Reads a package's own copyright notice out of the licence text this pipeline already has.
 *
 * A canonical SPDX text carries placeholders (`<year>`, `<copyright holders>`) rather than any
 * package's holder, so the credit line beside it is the only place the actual notice appears - and
 * MIT, BSD and ISC oblige exactly that notice to travel with copies. Where the notice was taken
 * only from a hand-maintained table, a package whose LICENSE states one plainly was credited with
 * "no copyright notice" in the same document that reproduces the file it is written in.
 *
 * A curated entry still wins: it is a human's reading of the package, and several of them come from
 * a repository LICENSE for a package that publishes none in its tarball, which this cannot see.
 * This answers the case the table was never meant to cover - the package DID ship its text.
 */

/** A line that opens a copyright notice. */
const COPYRIGHT_LINE = /^[ \t]*(?:copyright\b|\(c\)|©)/i;

/**
 * A line that uses the word in a sentence rather than making a notice - "copyright notice and this
 * permission notice appear in all copies" is the ISC/MIT wording, and it sits a few lines below the
 * real notice in every package that uses it.
 */
const PROSE_LINE = /^[ \t]*copyright\s+(?:notice|notices|holder|holders|law|and|in|is|of|to)\b/i;

/**
 * An SPDX or Apache appendix placeholder nobody filled in - `Copyright [yyyy] [name of copyright
 * owner]`. Reproducing one as a package's notice would credit a holder that does not exist, which
 * is worse than stating that the package records none.
 */
const UNFILLED_PLACEHOLDER =
  /[[<](?:yyyy|year|years|name of copyright owner|copyright holders?|fullname|author|your name)[\]>]/i;

/**
 * The line at which a licence's OPERATIVE TEXT begins.
 *
 * A package's own notice sits above the grant it accompanies; every occurrence of the word below
 * that point belongs to the licence, not to the package. Without this bound, Apache-2.0's own
 * section 2 - "...irrevocable / copyright license to reproduce, prepare Derivative Works of," -
 * matched `COPYRIGHT_LINE`, and `copyrightNoticeIn` returned a clause of the licence as the
 * package's copyright notice. Measured over every licence file installed in this repository, that
 * happened for 77 of 2,307; MPL section 2.3 and the CC-BY preamble accounted for five more.
 *
 * BODY OPENERS, not licence TITLES. Cutting at "Apache License" or "DO WHAT THE FUCK YOU WANT TO
 * PUBLIC LICENSE" also removes the 77, but it is the wrong rule and it shows: the WTFPL puts its
 * title above the holder's notice, so cutting there discarded Sam Hocevar's real notice from two
 * packages. Apache-2.0's title reads as a safe cut only because nothing between it and the terms is
 * a notice. Cutting where the terms actually begin keeps both correct - and keeps a notice a
 * package prepended above the licence header, which is the commonest way one is added.
 *
 * Validated over all 2,307 installed licence files: against a cut at the licence title, cutting at
 * the grant yields 82 fewer wrong results, loses no real notice, and keeps the continuation line on
 * 60 notices a title cut truncates.
 */
const GRANT_START = new RegExp(
  [
    'permission is hereby granted',
    'permission to use, copy',
    'redistribution and use',
    'terms and conditions',
    '1\\. definitions',
    'this program is free software',
    'this library is free software',
    'the software is provided',
    'licensed under the apache license',
    'preamble',
  ]
    .map((opener) => `^[ \\t]*"?${opener}`)
    .join('|'),
  'i',
);

/**
 * A line that CONTINUES a notice already started: a further holder, a year, or the "All rights
 * reserved." that BSD and many MIT notices put on their own line.
 *
 * Requiring each following line to satisfy `isNotice` truncated every wrapped notice at its first
 * line, and dropped "All rights reserved." from 60 of the packages measured - in the one place the
 * real holder appears beside a placeholder-bearing canonical text.
 */
const NOTICE_TAIL = /^[ \t]*(?:all rights reserved|and\b|copyright\b|\(c\)|©|[0-9])/i;

function isNotice(line: string): boolean {
  return COPYRIGHT_LINE.test(line) && !PROSE_LINE.test(line) && !UNFILLED_PLACEHOLDER.test(line);
}

/**
 * The first copyright notice across `texts`, with any lines continuing it.
 *
 * The FIRST run only. A package can bundle a third-party attribution below its own grant -
 * `chroma-js` carries ColorBrewer's notice thirty lines under its own - and the credit line is
 * about the package, not about everything its licence file happens to quote. Every bundled text is
 * reproduced in full elsewhere in the document either way.
 */
export function copyrightNoticeIn(texts: (string | undefined)[]): string | undefined {
  const notices: string[] = [];
  texts.forEach((text) => {
    if (notices.length || !text) return;
    const lines = text.split(/\r?\n/);
    // Only the region above the grant - see `GRANT_START`.
    const bodyAt = lines.findIndex((line) => GRANT_START.test(line));
    const searchable = bodyAt === -1 ? lines : lines.slice(0, bodyAt);
    const start = searchable.findIndex(isNotice);
    if (start === -1) return;
    notices.push(searchable[start].trim());
    // The rest of the notice PARAGRAPH: to the first blank line, and no further than a line that
    // is not continuing it. A blank line ends a paragraph in every licence file shape there is.
    for (let index = start + 1; index < searchable.length; index += 1) {
      const line = searchable[index];
      if (!line.trim()) break;
      if (!NOTICE_TAIL.test(line) || UNFILLED_PLACEHOLDER.test(line)) break;
      notices.push(line.trim());
    }
  });
  const notice = notices.join(' ').replace(/\s+/g, ' ').trim();
  return notice || undefined;
}
