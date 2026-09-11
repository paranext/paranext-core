import * as fs from 'fs';
import * as path from 'path';
import { compareStrings } from './compare';
import { canonicalText } from './corpus';
import { PLACEHOLDER_TEMPLATE_VALUE } from './policy';
import type { BundledComponent, Override, ProgramDelivery, SeparateProgram } from './types';

/**
 * A third-party program a downstream product redistributes as a separate executable and invokes as
 * a subprocess - Mercurial in Paratext 10 Studio is the live case.
 *
 * Neither package graph can see it: on Windows it arrives as a NuGet package whose only content is
 * the program, on macOS as a tarball fetched at install time, on Linux as a Debian package staged
 * into the snap. What is fixed is that a human read its terms and recorded WHY shipping it beside
 * this application is aggregation rather than derivation, and where its corresponding source is -
 * the two things a copyleft program's license asks of a redistributor. The document reproduces the
 * canonical text of every identifier the entry names, because at least one of those bundles (the
 * macOS one) carries no license text of its own.
 *
 * Checked in one direction only. Every delivery names EVIDENCE - a file and a substring - and an
 * entry whose evidence is gone is refused, so a recorded determination cannot outlive the program
 * it describes. The other direction, a program added with no entry, has no generic source to read
 * from; the NuGet route is covered because a copyleft override without a `separateProgram` link
 * still blocks, and the rest is the same gap the static-asset gate records as PT-4560.
 */

/** Every identifier an entry names, at the program level and inside each delivery, once each. */
export function separateProgramIds(programs: Record<string, SeparateProgram>): string[] {
  const ids = new Set<string>();
  Object.values(programs).forEach((program) => {
    (program.spdx || []).forEach((id) => ids.add(id));
    (program.deliveries || []).forEach((delivery) =>
      (delivery.alsoContains || []).forEach((component) =>
        (component.spdx || []).forEach((id) => ids.add(id)),
      ),
    );
  });
  return [...ids].sort(compareStrings);
}

/**
 * Refuses a field that is not a filled-in string.
 *
 * The type is checked rather than coerced, because these values arrive as untyped JSON: a policy
 * that records a number, a boolean or an object reaches the document either as the literal
 * `"[object Object]"` or as a `TypeError` from inside the renderer, both of which say less than
 * naming the field here does.
 */
function requireText(name: string, field: string, value: unknown): void {
  if (typeof value !== 'string')
    throw new Error(
      `the "separatePrograms" entry for "${name}" records "${field}" as ` +
        `${value === undefined ? 'nothing' : `a ${typeof value}`}, and every field of the entry is ` +
        'reproduced in the document as written. Record it as a string.',
    );
  const text = value.trim();
  if (!text || PLACEHOLDER_TEMPLATE_VALUE.test(text))
    throw new Error(
      `the "separatePrograms" entry for "${name}" records no usable "${field}". Every field of ` +
        'the entry is reproduced in the document as the reviewed determination, so an empty or ' +
        'template value would ship as one - fill it in.',
    );
}

function assertComponent(name: string, delivery: ProgramDelivery, component: BundledComponent) {
  requireText(name, `deliveries[${delivery.platform}].alsoContains[].name`, component.name);
  const hasIds = Array.isArray(component.spdx) && component.spdx.length > 0;
  const hasTerms = Boolean(String(component.terms || '').trim()) && component.nonSpdx === true;
  if (!hasIds && !hasTerms)
    throw new Error(
      `the "separatePrograms" entry for "${name}" bundles "${component.name}" on ` +
        `${delivery.platform} with neither "spdx" identifiers nor free-text "terms" marked ` +
        '"nonSpdx": true. A bundled component whose terms nobody recorded reads as one nobody ' +
        'considered - record what it is under.',
    );
  // The two are ALTERNATIVES, and the document renders them as such: `describeComponent` prints the
  // identifiers when there are any and the free text only when there are none, so a component
  // recording both loses whichever a reviewer wrote second. Refused rather than silently dropped,
  // because the reason to write both is that the identifier alone is not the whole grant - which is
  // exactly the case the document would then fail to state.
  if (hasIds && Boolean(String(component.terms || '').trim()))
    throw new Error(
      `the "separatePrograms" entry for "${name}" records both "spdx" and "terms" for ` +
        `"${component.name}" on ${delivery.platform}. The document reproduces one or the other, ` +
        'so the free text would be dropped - record the identifiers alone, or free text alone ' +
        'with "nonSpdx": true.',
    );
}

function assertDelivery(repo: string, name: string, delivery: ProgramDelivery): void {
  requireText(name, 'deliveries[].platform', delivery.platform);
  requireText(name, 'deliveries[].version', delivery.version);
  requireText(name, 'deliveries[].mechanism', delivery.mechanism);
  const evidence = delivery.evidence || { file: '', contains: '' };
  requireText(name, `deliveries[${delivery.platform}].evidence.file`, evidence.file);
  requireText(name, `deliveries[${delivery.platform}].evidence.contains`, evidence.contains);
  const file = path.join(repo, evidence.file);
  if (!fs.existsSync(file))
    throw new Error(
      `the "separatePrograms" entry for "${name}" (${delivery.platform}) names ` +
        `${evidence.file} as its evidence, and that file does not exist. The entry describes a ` +
        'program this build no longer carries by that route - remove the delivery, or fix the path.',
    );
  if (!fs.readFileSync(file, 'utf8').includes(evidence.contains))
    throw new Error(
      `the "separatePrograms" entry for "${name}" (${delivery.platform}) names ${evidence.file} ` +
        `as its evidence, and that file does not contain '${evidence.contains}'. The mechanism ` +
        'the entry describes has changed or gone - re-read it and update the entry, or remove ' +
        'the delivery.',
    );
  // `false` is the recorded "this bundle carries none"; anything else has to be the path the
  // document quotes. `true` is the natural typo for the first of those, and it is refused here
  // rather than reaching `inlineText`, which would fail on a non-string with no field named.
  if (delivery.carriesNotices !== false)
    requireText(name, `deliveries[${delivery.platform}].carriesNotices`, delivery.carriesNotices);
  (delivery.alsoContains || []).forEach((component) => assertComponent(name, delivery, component));
}

/**
 * Refuses an entry a reviewer has not fully signed, and one whose evidence is gone from the tree.
 *
 * `admissible` is `allowed` union `copyleft` - every identifier the committed policy classifies. A
 * program's own identifiers must be drawn from it. `applyOverride` returns `overridden` for a
 * linked package BEFORE the allowed/copyleft test, on the ground that "an override may only name an
 * identifier the reviewed entry itself names" - which is circular unless something constrains the
 * ENTRY. That something was incidental: the committed SPDX corpus holds exactly these identifiers,
 * so `assertSeparateProgramTextsAvailable` rejected anything else a step later. Checking it here
 * states the constraint the linked-override path actually rests on, rather than leaving it to be
 * re-derived from which texts happen to be in the corpus.
 */
export function assertSeparateProgramsRecorded(
  repo: string,
  programs: Record<string, SeparateProgram>,
  admissible?: Set<string>,
): void {
  Object.entries(programs).forEach(([name, program]) => {
    requireText(name, 'copyright', program.copyright);
    requireText(name, 'reviewer', program.reviewer);
    requireText(name, 'reason', program.reason);
    requireText(name, 'sourceAvailability', program.sourceAvailability);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(program.date || '')))
      throw new Error(
        `the "separatePrograms" entry for "${name}" records "date" as ` +
          `"${program.date}"; record the day the terms were read as YYYY-MM-DD.`,
      );
    if (!Array.isArray(program.spdx) || !program.spdx.length)
      throw new Error(
        `the "separatePrograms" entry for "${name}" names no "spdx" identifier. The document ` +
          "reproduces the canonical text of the program's terms on its behalf, so it has to know " +
          'which text that is.',
      );
    if (!Array.isArray(program.deliveries) || !program.deliveries.length)
      throw new Error(
        `the "separatePrograms" entry for "${name}" must record at least one delivery, or it ` +
          'describes a program no installer carries - add the platform deliveries, each with the ' +
          'evidence that the mechanism is still in the tree.',
      );
    if (admissible) {
      const unclassified = program.spdx
        .filter((id) => !admissible.has(id))
        .sort(compareStrings)
        .join(', ');
      if (unclassified)
        throw new Error(
          `the "separatePrograms" entry for "${name}" names ${unclassified}, which the notices ` +
            'policy classifies on neither "allowed" nor "copyleft". A linked override is admitted ' +
            "by the terms a human read for the program, so the program's own identifiers have to " +
            'be ones the policy recognises - add it to the right list, or fix the entry.',
        );
    }
    program.deliveries.forEach((delivery) => assertDelivery(repo, name, delivery));
  });
}

/**
 * Refuses an identifier the corpus holds no text for, before anything is rendered.
 *
 * The section states that each identifier's canonical text is reproduced; a missing one would leave
 * it promising a text it never prints - the same rule `addCopiedPlatformLibraryTexts` applies at
 * render time, moved up to where the remedy can be printed with the rest.
 */
export function assertSeparateProgramTextsAvailable(
  programs: Record<string, SeparateProgram>,
): void {
  const missing = separateProgramIds(programs).filter((id) => !canonicalText(id));
  if (missing.length)
    throw new Error(
      `the "separatePrograms" table names ${missing.join(', ')}, and the SPDX corpus holds no ` +
        'text for it. Add the identifier to "allowed" (or "copyleft") in the committed policy and ' +
        'run `npm run build:third-party-notices:corpus`; the corpus index is committed in this ' +
        'repository, so an overlay cannot extend it on its own.',
    );
}

/**
 * Refuses a `separateProgram` link the table does not record, for every override that carries one.
 *
 * `applyOverride` checks the link too, but only for a row the override actually settles:
 * `readInstruments` offers an override for classification only where nothing else resolved the
 * package, so a package cleared by its own declared license never reaches that check. Its row still
 * gets the sentence, because `nugetNote` derives that from the link alone. Checking the whole set
 * here is what makes the sentence's promise true - the row tells the reader to go read an entry in
 * the separate-programs section, and an unrecorded link would send them to a section the document
 * does not contain.
 */
export function assertSeparateProgramLinksRecorded(
  overrides: Record<string, Override>,
  programs: Record<string, SeparateProgram>,
): void {
  Object.entries(overrides).forEach(([key, override]) => {
    if (override.separateProgram === undefined) return;
    const programName = String(override.separateProgram).trim();
    // `Object.hasOwn` rather than a bare index, as `applyOverride` and `mergeTable` do: a link
    // spelled `toString` would otherwise resolve against `Object.prototype` and pass.
    if (!Object.hasOwn(programs, programName))
      throw new Error(
        `the override for "${key}" links to the separate program "${programName}", and ` +
          '"separatePrograms" records no entry by that name. The row this override produces tells ' +
          'the reader to go read that entry, so the entry has to be there - record the program, ' +
          'or correct the link.',
      );
  });
}
