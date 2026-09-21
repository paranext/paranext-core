import { describe, expect, it } from 'vitest';
import { copyrightNoticeIn } from './credit';

describe('copyrightNoticeIn', () => {
  it('reads the notice a package states in its own license file, to the end of it', () => {
    // "All rights reserved." is part of the notice, not a line after it. Requiring every following
    // line to look like a notice opener truncated it away from 60 of the 2,307 license files
    // installed here - in the one place the real holder appears beside a placeholder-bearing
    // canonical text.
    expect(
      copyrightNoticeIn([
        'chroma.js - JavaScript library for color conversions\n\nCopyright (c) 2011-2025, Gregor Aisch\nAll rights reserved.\n',
      ]),
    ).toBe('Copyright (c) 2011-2025, Gregor Aisch All rights reserved.');
  });

  it('does not read a clause of the license as the package\u2019s notice', () => {
    // Apache-2.0 section 2 grants a "copyright license to reproduce, prepare Derivative Works of,"
    // and that line opens with the word. Matched naively, it is returned as the copyright notice of
    // 77 of the 2,307 license files installed here, five shipped packages among them. A package's
    // own notice sits
    // ABOVE the grant; below it the word belongs to the license.
    const apache = [
      '                                 Apache License',
      '                           Version 2.0, January 2004',
      '',
      '   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION',
      '',
      '   2. Grant of Copyright License. Subject to the terms and conditions of',
      '      this License, each Contributor hereby grants to You a perpetual,',
      '      worldwide, non-exclusive, no-charge, royalty-free, irrevocable',
      '      copyright license to reproduce, prepare Derivative Works of,',
      '',
      '      (c) You must retain, in the Source form of any Derivative Works',
      '          that You distribute, all copyright, patent, trademark, and',
    ].join('\n');

    expect(copyrightNoticeIn([apache])).toBeUndefined();
  });

  it('still reads a notice the package prepended above the license header', () => {
    // The commonest way a notice is added to an Apache-2.0 text, and the reason the cut is made at
    // the TERMS rather than at the title line: cutting at "Apache License" would discard this.
    const prepended = [
      'Copyright 2019 Some Author',
      '',
      '                                 Apache License',
      '                           Version 2.0, January 2004',
      '',
      '   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION',
    ].join('\n');

    expect(copyrightNoticeIn([prepended])).toBe('Copyright 2019 Some Author');
  });

  it('reads a notice that sits BELOW its license title, as the WTFPL puts it', () => {
    // The control for the rule above. Cutting at a license TITLE also removes the Apache clauses,
    // but it is the wrong rule: the WTFPL prints its title first and the holder's notice under it,
    // and two packages installed here state their notice exactly that way.
    const wtfpl = [
      '        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE',
      '                    Version 2, December 2004',
      '',
      ' Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>',
      '',
      ' Everyone is permitted to copy and distribute verbatim or modified',
      ' copies of this license document, and changing it is allowed as long',
      ' as the name is changed.',
      '',
      '        TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION',
    ].join('\n');

    expect(copyrightNoticeIn([wtfpl])).toBe('Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>');
  });

  it('keeps several holders listed on consecutive lines', () => {
    expect(
      copyrightNoticeIn([
        'MIT License\n\nCopyright (c) 2013 A Person\nCopyright (c) 2014 B Person\n\nPermission...',
      ]),
    ).toBe('Copyright (c) 2013 A Person Copyright (c) 2014 B Person');
  });

  // `chroma-js` carries ColorBrewer's notice thirty lines under its own; the credit line is about
  // the package, and every bundled text is reproduced in full elsewhere in the document anyway.
  it('takes only the first run, not a bundled third-party attribution further down', () => {
    expect(
      copyrightNoticeIn([
        'Copyright (c) 2011-2025, Gregor Aisch\n\nsome terms\n\nCopyright (c) 2002 Cynthia Brewer\n',
      ]),
    ).toBe('Copyright (c) 2011-2025, Gregor Aisch');
  });

  // The stock Apache-2.0 appendix. `rc-new-window` ships exactly this and nothing else, and the
  // policy records - after a search - that it asserts no copyright notice anywhere. Reproducing the
  // placeholder would credit a holder that does not exist.
  it('ignores an unfilled placeholder', () => {
    expect(copyrightNoticeIn(['   Copyright [yyyy] [name of copyright owner]\n'])).toBeUndefined();
    expect(copyrightNoticeIn(['Copyright <year> <copyright holders>\n'])).toBeUndefined();
  });

  // The ISC/MIT permission wording, which sits a few lines below the real notice in every package
  // that uses it - and would be picked up on its own in one that does not.
  it('ignores the word used in the permission sentence', () => {
    expect(
      copyrightNoticeIn([
        'Permission to use...\n\ncopyright notice and this permission notice appear in all copies.\n',
      ]),
    ).toBeUndefined();
  });

  it('returns undefined when there is no text and when there is no notice', () => {
    expect(copyrightNoticeIn([])).toBeUndefined();
    expect(copyrightNoticeIn([undefined])).toBeUndefined();
    expect(copyrightNoticeIn(['no notice here at all'])).toBeUndefined();
  });

  it('reads the first file that states one when a package ships several', () => {
    expect(copyrightNoticeIn(['no notice here', 'Copyright (c) 2020 Second File\n'])).toBe(
      'Copyright (c) 2020 Second File',
    );
  });
});
