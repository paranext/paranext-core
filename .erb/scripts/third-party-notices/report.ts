import { parseDeclared } from './declared';
import { describeDisallowed, isDisallowedId } from './policy';
import type { ReportRow, Verdict } from './types';

const POLICY_FILE = '.erb/scripts/third-party-notices/notices-policy.json';

/** Indents a JSON blob so it sits inside the surrounding message. */
function indented(value: unknown): string {
  return JSON.stringify(value, undefined, 2)
    .split('\n')
    .map((line) => `    ${line}`)
    .join('\n');
}

/**
 * The `spdx` value to suggest for a reviewed exception, from what the package declares.
 *
 * A DISJUNCTION is narrowed to one operand, because `applyException` checks every id in the
 * recorded value against both lists: suggesting the whole of `MIT OR GPL-3.0-or-later` would offer
 * a remedy the gate is guaranteed to reject for the very operand that caused the block. What such
 * an entry has to record is the branch this project takes.
 *
 * A CONJUNCTION is left whole: every operand applies at once, so the compound expression is what
 * the entry records.
 */
function admissibleSpdx(
  declared: ReturnType<typeof parseDeclared>,
  declaredField: string | undefined,
  copyleft: Set<string>,
  allowed: Set<string>,
): string {
  const placeholder = '<SPDX identifier this package is actually under>';
  if (!declared.ok) return placeholder;
  if (!declared.hasConjunction && declared.ids.length > 1) {
    const admissible = declared.ids.find((id) => !copyleft.has(id) && allowed.has(id));
    // Every operand is copyleft or unlisted, so no single branch clears the gate either. The
    // placeholder is honest here in a way any of the operands would not be.
    return admissible || placeholder;
  }
  return declaredField || placeholder;
}

/**
 * The remedy for a package whose license text WAS found but could not be cleared.
 *
 * A reviewed exception is the right instrument here precisely because there is a text to pin it to:
 * the entry names one version AND one text hash, so the block returns if the package changes
 * either. `textSha256` is filled in with the real detected value rather than a placeholder - the
 * developer's job is to supply a reason and a reviewer, not to compute a hash.
 *
 * Where the identified text is itself inadmissible, NO exception can clear the block - an exception
 * records which license an unidentifiable text actually is, and this text is not unidentifiable -
 * so the template is withheld and the routes that can resolve it are printed instead.
 *
 * `allowed` is OPTIONAL, and absent is not the same as empty: an allow-list bound cannot be applied
 * by a caller that supplied no allow list, or every identifier would read as inadmissible on the
 * strength of a list nobody passed. Absent falls back to the copyleft list alone, the same fallback
 * `describeBlock` uses for a caller with no policy in hand.
 */
function exceptionRemedy(
  v: Verdict,
  key: string,
  copyleft?: Set<string>,
  allowed?: Set<string>,
): string[] {
  const declared = parseDeclared(v.declared);

  // `detected` is `best.spdxId`, and `best` is only ever a file at or above the confidence
  // threshold - so an inadmissible `detected` IS the positive identification an exception cannot
  // override. Nothing weaker reaches this test.
  //
  // Bounded by `isDisallowedId`, the same predicate the gate itself applies. Testing `copyleft`
  // alone meant this printed the exception template - a paste-ready entry, with the hash already
  // filled in - for every restrictive identifier absent from that 21-entry list, walking the reader
  // into an instrument that cannot clear the block they are reading.
  const copyleftIds = copyleft || new Set<string>();
  const inadmissible = (id: string) =>
    allowed ? isDisallowedId(id, allowed, copyleftIds) : copyleftIds.has(id);
  if (v.detected && inadmissible(v.detected))
    return [
      `  ${v.detected} was identified from this package's own ${v.matchedFile || 'license text'}`,
      `  and ${describeDisallowed(v.detected, copyleftIds)},`,
      '  so a reviewed exception cannot clear this block: an exception records which license an',
      '  unidentifiable text actually is, and this text is not unidentifiable. What can resolve it:',
      '',
      ...(copyleftIds.has(v.detected)
        ? [
            '  - if the package genuinely offers a choice of licenses, its declaration has to say so',
            `    ("${v.detected} OR <permissive>"), and an "elections" entry in ${POLICY_FILE}`,
            '    records which branch this project takes, and why;',
          ]
        : [
            `  - if ${v.detected} is terms this project accepts, add it to the "allowed" list in`,
            `    ${POLICY_FILE} - one reviewable line, rather than a per-package entry that admits`,
            '    it invisibly;',
          ]),
      '  - otherwise the dependency itself has to change.',
      '',
    ];

  return [
    '  If this package is genuinely fine, record a reviewed exception by adding this entry to the',
    `  "exceptions" array in ${POLICY_FILE}:`,
    '',
    indented({
      package: key,
      spdx: v.detected || admissibleSpdx(declared, v.declared, copyleftIds, allowed ?? new Set()),
      reason: '<why this is correct - one sentence>',
      reviewer: '<your email>',
      // A PLACEHOLDER, not today's date. `applyException` requires a reviewer and a date because
      // "without a name and a date it is not reviewable"; filling one of the two in automatically
      // satisfied half of that check on the reader's behalf, and a template pasted months later
      // then carried a date against a determination nobody made on it. The date has to be the day
      // somebody read the license file, which is a thing only they know.
      date: '<YYYY-MM-DD you read this package\u2019s license file>',
      textSha256: v.textSha256,
    }),
    '',
    '  Every identifier in "spdx" has to be on the policy\'s "allowed" list and absent from its',
    '  "copyleft" list; a conjunction is checked one operand at a time.',
    '  The exception is pinned to this exact version AND this exact license text. If the package',
    '  changes either, the block returns and the exception must be reviewed again.',
    '',
  ];
}

/**
 * The remedy for a package that ships NO license text.
 *
 * It must never be an exception: `applyException` refuses one that is not pinned to a text hash, so
 * offering that template here would be advice the gate then rejects - which is how a package can
 * end up with no instrument at all able to clear it. What resolves these is the policy itself, and
 * which entry depends on what the package declares, so the message says which one rather than
 * listing all three and leaving the reader to work it out.
 */
function policyRemedy(v: Verdict, entryKey: string, copyleft: Set<string> = new Set()): string[] {
  const declared = parseDeclared(v.declared);
  const head = [
    '  No license text was found for this package, so a reviewed exception cannot clear it - the',
    '  gate rejects an exception that is not pinned to a text hash. Resolve it in the policy',
    `  instead, in ${POLICY_FILE}:`,
    '',
  ];

  if (declared.ok && declared.ids.length === 1) {
    // The allow-list route is advice the gate would then reject for a copyleft identifier:
    // `resolveSingleId` tests the copyleft list FIRST, deliberately, so that the two lists cannot
    // disagree in the permissive direction. Offering it anyway is the "advice the gate rejects"
    // failure this function exists to prevent, on the one input class where it matters most.
    if (copyleft.has(declared.ids[0]))
      return [
        ...head,
        `  - ${declared.ids[0]} is on the policy's "copyleft" list. Adding it to "allowed" cannot`,
        '    clear this block: copyleft is tested first, so that the two lists can never disagree',
        '    in the permissive direction.',
        '  - if the package genuinely offers a choice of licenses, its declaration has to say so',
        `    ("${declared.ids[0]} OR <permissive>"), and an "elections" entry for "${entryKey}"`,
        '    records which branch this project takes;',
        '  - otherwise the dependency itself has to change.',
        '',
      ];
    return [
      ...head,
      `  - if ${declared.ids[0]} is a license this project accepts, add that identifier to`,
      '    "allowed", and the canonical SPDX text is reproduced on the package’s behalf;',
      '  - if it is not acceptable, the dependency itself has to change.',
      '',
    ];
  }

  if (declared.ok)
    return [
      ...head,
      `  - ${v.declared} names more than one license. If it is a choice (OR), add an "elections"`,
      `    entry for "${entryKey}" naming the branch this project takes, and why.`,
      '  - If it is a conjunction (AND), no election can resolve it: every operand applies at once,',
      '    so the dependency itself has to change.',
      '',
    ];

  return [
    ...head,
    '  - this package establishes nothing usable about its own license, so record what a human',
    `    established, as an "overrides" entry keyed "${entryKey}":`,
    '',
    indented({
      [entryKey]: {
        license: '<SPDX identifier, or a short free-text determination>',
        // Both are required by the gate, and a template omitting them is the "advice the gate
        // rejects" failure this function exists to prevent: a value that is not an SPDX expression
        // is refused without `nonSpdx`, and an entry recording neither `version` nor
        // `versionIndependent` is refused outright. A reader pasting the template hits both.
        nonSpdx: '<true if "license" above is free text rather than an SPDX expression>',
        version: '<the version this determination was read from, or drop this field>',
        versionIndependent: '<true instead of "version" if it holds at any version>',
        note: '<why this is what applies - one sentence>',
      },
    }),
    '',
    '    An override is not pinned to a license text, unlike an exception, so it records WHICH',
    '    version the determination was read from - or says outright that it holds at any version.',
    '',
  ];
}

/**
 * Turns a blocked verdict into something a developer can act on without prior context.
 *
 * This tool has no named owner, so whoever trips the gate is probably meeting it for the first time
 * and has no license expertise. The message therefore carries the fix, not just the fault: both
 * signals, the file that was read, and the exact JSON to paste. Which fix it offers depends on
 * whether any license text was found, because the two situations have different instruments and
 * offering the wrong one is worse than offering none.
 *
 * @param policy The `copyleft` and `allowed` lists, read only to keep the remedy from proposing a
 *   route the gate would reject - see `policyRemedy` AND `exceptionRemedy`. They reach BOTH:
 *   routing them to one of the two left the other free to print a paste-ready entry the gate then
 *   refuses, on the commonest block there is. `allowed` is what lets a disjunction be narrowed to
 *   the operand an exception could actually record.
 */
export function describeBlock(
  v: ReportRow,
  policy: { copyleft?: string[]; allowed?: string[] } = {},
): string {
  const key = `${v.ecosystem}:${v.name}@${v.version}`;
  const entryKey = `${v.ecosystem}:${v.name}`;
  const copyleft = new Set(policy.copyleft || []);
  const allowed = new Set(policy.allowed || []);

  return [
    `BLOCKED  ${key}`,
    `  reason:   ${v.reason}`,
    `  declared: ${v.declared === undefined ? '(nothing declared)' : v.declared}`,
    `  detected: ${v.detected === undefined ? '(no text identified)' : v.detected}`,
    `  file:     ${v.matchedFile === undefined ? '(none)' : v.matchedFile}`,
    '',
    ...(v.textSha256
      ? exceptionRemedy(v, key, copyleft, policy.allowed ? allowed : undefined)
      : policyRemedy(v, entryKey, copyleft)),
  ].join('\n');
}

/**
 * Policy entries that no package in this run could have used, as human-readable lines.
 *
 * A dead entry is not a build failure - the package is simply gone - but it is not nothing either.
 * It is a recorded determination about a package the reader may reasonably believe still ships, it
 * would auto-apply the moment that `name@version` came back (an election silently, without the
 * review its addition once had), and there is no other moment at which anyone would notice. A stale
 * EXCEPTION is reported today only when it fires and its hash no longer matches; one belonging to a
 * package that left the closure entirely fires never and so says nothing at all. `npm:harmony-
 * reflect` is the live case: an election for a package that is not in the shipping set.
 *
 * `copyrightNotices` is excluded, and so is an `alwaysList` override: those exist precisely BECAUSE
 * no restore on this machine produces the package (see `alwaysListedPackages` in `main.ts`), so
 * "unused" is their normal state and reporting them would be noise that trains the reader to skip
 * the whole note. Every OTHER override is reported, because nothing else ever looks at one: an
 * override is keyed by name alone, is pinned to neither a version nor a license text, and clears a
 * package past both the allow list and the copyleft list - so an entry left behind by a package
 * that has gone is a standing determination waiting to auto-apply, unreviewed, to whatever comes
 * back under that name.
 */
export function stalePolicyEntries(
  policy: {
    elections?: Record<string, object>;
    exceptions?: { package: string }[];
    overrides?: Record<string, { alwaysList?: boolean }>;
    copyrightNotices?: Record<string, string>;
    licenseTexts?: Record<string, object>;
    unbundledDependencies?: Record<string, object>;
  },
  verdicts: { ecosystem: string; name: string; version: string }[],
): string[] {
  const names = new Set(verdicts.map((v) => `${v.ecosystem}:${v.name}`));
  const versioned = new Set(verdicts.map((v) => `${v.ecosystem}:${v.name}@${v.version}`));
  return [
    ...Object.keys(policy.elections || {})
      .filter((key) => !names.has(key))
      .map((key) => `election "${key}" - no such package in the shipping set`),
    ...(policy.exceptions || [])
      .map((entry) => entry.package)
      .filter((key) => !versioned.has(key))
      .map((key) => `exception "${key}" - no such package at that version in the shipping set`),
    ...Object.entries(policy.overrides || {})
      .filter(([key, entry]) => !entry.alwaysList && !names.has(key))
      .map(([key]) => `override "${key}" - no such package in the shipping set`),
    // The one table pinned to neither a version nor a text hash, and the one whose entries are
    // mostly read from a package's REPOSITORY rather than its tarball - so this report is the only
    // thing that can notice when an upstream rename leaves an entry behind and the package it
    // credited loses its attribution.
    ...Object.keys(policy.copyrightNotices || {})
      .filter((key) => !names.has(key))
      .map((key) => `copyright notice "${key}" - no such package in the shipping set`),
    // A text this repository reproduces on a package's behalf. Left behind by a package that has
    // gone, it is a legal text checked in for nothing - and the file it names would stay in the
    // tree with nothing reading it.
    ...Object.keys(policy.licenseTexts || {})
      .filter((key) => !names.has(key))
      .map((key) => `license text "${key}" - no such package in the shipping set`),
    // Inverted, uniquely here: every entry above goes stale when its package LEAVES, this one when
    // its package ARRIVES. An exemption kept after something started importing the dependency
    // suppresses nothing - the row is there either way - but it stands as a recorded finding that
    // nothing bundles it, which the next reader has no reason to re-derive.
    ...Object.keys(policy.unbundledDependencies || {})
      .filter((key) => names.has(`npm:${key}`))
      .map(
        (key) =>
          `unbundled dependency "${key}" - it is in the shipping set now, so the entry no longer ` +
          'describes it',
      ),
  ].sort();
}

/**
 * Overrides that record a question nobody has answered, as human-readable lines.
 *
 * A curated override has two verdict states - it clears the package or it does not - and a
 * package's terms can be in a third: recorded, admitted, and carrying a question about their effect
 * that nobody has answered. Without `openQuestion` the build simply goes green on a package the
 * project has explicitly NOT cleared, and the only record of that sits in a prose file nothing
 * reads.
 *
 * Reported rather than blocked, deliberately: blocking would stop every build over a question that
 * is open by decision, not by oversight. This is what stops it being open by SILENCE.
 */
export function openPolicyQuestions(policy: {
  overrides?: Record<string, { openQuestion?: string }>;
}): string[] {
  return Object.entries(policy.overrides || {})
    .filter(([, override]) => override.openQuestion)
    .map(([key, override]) => `${key}: ${override.openQuestion}`);
}
