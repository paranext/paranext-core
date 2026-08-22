const { parseDeclared } = require('./declared');

const POLICY_FILE = '.erb/scripts/third-party-notices/notices-policy.json';

/** Indents a JSON blob so it sits inside the surrounding message. */
function indented(value) {
  return JSON.stringify(value, undefined, 2)
    .split('\n')
    .map((line) => `    ${line}`)
    .join('\n');
}

/**
 * The remedy for a package whose license text WAS found but could not be cleared.
 *
 * A reviewed exception is the right instrument here precisely because there is a text to pin it to:
 * the entry names one version AND one text hash, so the block returns if the package changes
 * either. `textSha256` is filled in with the real detected value rather than a placeholder - the
 * developer's job is to supply a reason and a reviewer, not to compute a hash.
 */
function exceptionRemedy(v, key) {
  return [
    '  If this package is genuinely fine, record a reviewed exception by adding this entry to the',
    `  "exceptions" array in ${POLICY_FILE}:`,
    '',
    indented({
      package: key,
      spdx: v.detected || '<SPDX identifier this package is actually under>',
      reason: '<why this is correct - one sentence>',
      reviewer: '<your email>',
      date: new Date().toISOString().slice(0, 10),
      textSha256: v.textSha256,
    }),
    '',
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
function policyRemedy(v, entryKey, copyleft = new Set()) {
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
        note: '<why this is what applies - one sentence>',
      },
    }),
    '',
    '    An override is NOT pinned to a version or to a license text, unlike an exception, so it',
    '    has to be re-checked whenever the package changes.',
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
 * @param {{
 *   ecosystem: string;
 *   name: string;
 *   version: string;
 *   verdict: string;
 *   spdxId: string | undefined;
 *   reason: string;
 *   declared: string | undefined;
 *   detected: string | undefined;
 *   matchedFile: string | undefined;
 *   textSha256: string | undefined;
 * }} v
 * @param {{ copyleft?: string[] }} [policy] Only the `copyleft` list is read, and only to keep the
 *   remedy from proposing a route the gate would reject - see `policyRemedy`.
 * @returns {string}
 */
function describeBlock(v, policy = {}) {
  const key = `${v.ecosystem}:${v.name}@${v.version}`;
  const entryKey = `${v.ecosystem}:${v.name}`;

  return [
    `BLOCKED  ${key}`,
    `  reason:   ${v.reason}`,
    `  declared: ${v.declared === undefined ? '(nothing declared)' : v.declared}`,
    `  detected: ${v.detected === undefined ? '(no text identified)' : v.detected}`,
    `  file:     ${v.matchedFile === undefined ? '(none)' : v.matchedFile}`,
    '',
    ...(v.textSha256
      ? exceptionRemedy(v, key)
      : policyRemedy(v, entryKey, new Set(policy.copyleft || []))),
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
 * no restore on this machine produces the package (see `alwaysListedPackages` in `main.js`), so
 * "unused" is their normal state and reporting them would be noise that trains the reader to skip
 * the whole note. Every OTHER override is reported, because nothing else ever looks at one: an
 * override is keyed by name alone, is pinned to neither a version nor a licence text, and clears a
 * package past both the allow list and the copyleft list - so an entry left behind by a package
 * that has gone is a standing determination waiting to auto-apply, unreviewed, to whatever comes
 * back under that name.
 *
 * @param {{
 *   elections?: Record<string, object>;
 *   exceptions?: { package: string }[];
 *   overrides?: Record<string, { alwaysList?: boolean }>;
 * }} policy
 * @param {{ ecosystem: string; name: string; version: string }[]} verdicts
 * @returns {string[]}
 */
function stalePolicyEntries(policy, verdicts) {
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
  ].sort();
}

module.exports = { describeBlock, stalePolicyEntries };
