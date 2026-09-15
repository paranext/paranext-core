import * as fs from 'fs';
import * as path from 'path';
import { compareStrings } from './compare';
import { canonicalText } from './corpus';
import { requireText } from './policy';
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

/** This table's binding of the shared refusal - see `requireText` in `policy.ts`. */
function requireProgramText(name: string, field: string, value: unknown): void {
  requireText(`the "separatePrograms" entry for "${name}"`, field, value);
}

function assertComponent(name: string, delivery: ProgramDelivery, component: BundledComponent) {
  const field = (leaf: string) => `deliveries[${delivery.platform}].alsoContains[].${leaf}`;
  requireProgramText(name, field('name'), component.name);
  // `copyright` is the one component field the document reproduces as a CREDIT LINE beneath a
  // canonical SPDX text, so a placeholder left in it reads as a reviewed attribution rather than as
  // an unfinished entry. Optional, because a component whose bundle carries no notice records none
  // - but recorded as anything at all, it has to be usable.
  if (component.copyright !== undefined)
    requireProgramText(name, field('copyright'), component.copyright);
  // Optional for the same reason, and checked for the same one: `describeComponent` prints it beside
  // the name, where a JSON number - the natural slip for a version - reaches `.replace`.
  if (component.version !== undefined)
    requireProgramText(name, field('version'), component.version);
  const hasIds = Array.isArray(component.spdx) && component.spdx.length > 0;
  const hasTerms = Boolean(String(component.terms || '').trim()) && component.nonSpdx === true;
  // Only when `terms` is the recorded alternative to `spdx`: that is when the document reproduces
  // it as the component's whole grant, and `hasTerms` above coerces rather than refuses, so without
  // this a non-string would pass as "has terms" and then fail inside the renderer.
  if (hasTerms) requireProgramText(name, field('terms'), component.terms);
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
  requireProgramText(name, 'deliveries[].platform', delivery.platform);
  requireProgramText(name, 'deliveries[].version', delivery.version);
  requireProgramText(name, 'deliveries[].mechanism', delivery.mechanism);
  const evidence = delivery.evidence || { file: '', contains: '' };
  requireProgramText(name, `deliveries[${delivery.platform}].evidence.file`, evidence.file);
  requireProgramText(name, `deliveries[${delivery.platform}].evidence.contains`, evidence.contains);
  const file = path.join(repo, evidence.file);
  // `isFile`, not `existsSync`: a directory exists, so a path naming one would pass and then fail
  // inside `readFileSync` with a bare EISDIR naming no entry, platform or field - the shape this
  // module's message-only convention exists to avoid.
  if (!fs.existsSync(file) || !fs.statSync(file).isFile())
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
    requireProgramText(
      name,
      `deliveries[${delivery.platform}].carriesNotices`,
      delivery.carriesNotices,
    );
  (delivery.alsoContains || []).forEach((component) => assertComponent(name, delivery, component));
}

/**
 * Refuses an entry a reviewer has not fully signed, and one whose evidence is gone from the tree.
 *
 * `admissible` is `allowed` union `copyleft` - every identifier the committed policy classifies. A
 * program's own identifiers must be drawn from it. `applyOverride` returns `overridden` for a
 * linked package BEFORE the allowed/copyleft test, on the ground that "an override may only name an
 * identifier the reviewed entry itself names" - which is circular unless something constrains the
 * ENTRY, and this is that constraint. Without it the only thing standing in the way is
 * `assertSeparateProgramTextsAvailable` a step later, which refuses an identifier the committed
 * SPDX corpus holds no text for - a coincidence of which texts happen to be in the corpus rather
 * than a statement about what this pipeline classifies.
 */
export function assertSeparateProgramsRecorded(
  repo: string,
  programs: Record<string, SeparateProgram>,
  admissible?: Set<string>,
): void {
  Object.entries(programs).forEach(([name, program]) => {
    requireProgramText(name, 'copyright', program.copyright);
    requireProgramText(name, 'reviewer', program.reviewer);
    requireProgramText(name, 'reason', program.reason);
    requireProgramText(name, 'sourceAvailability', program.sourceAvailability);
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
      // EVERY identifier the entry names, components included - the same span `separateProgramIds`
      // returns, because that is the span whose canonical texts the document reproduces. Bounding
      // the program's own identifiers alone would leave a bundled component's text printed with no
      // classification step having looked at it, held up only by the corpus happening to hold
      // exactly `allowed` union `copyleft` - which `build-corpus-index.ts` does not promise, since
      // an `exceptions`, `elections` or `overrides` entry can reach an identifier on neither list.
      const unclassified = separateProgramIds({ [name]: program })
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
        'text for it. Add the identifier to "allowed" (or "copyleft") in the COMMITTED policy and ' +
        'run `npm run build:third-party-notices:corpus` there; the index is a committed file, and ' +
        'an overlay adding the identifier downstream rewrites it only in that clone.',
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
    // `nuget:` only, because the sentence the link produces is rendered from `nugetNote` into the
    // Notes column, and that column exists in the NuGet section alone - `pushNpmSection` renders an
    // aggregated license distribution with no per-package notes. An `npm:` key would take
    // `applyOverride`'s copyleft bypass and then appear as an ordinary dependency with no pointer to
    // the section it was admitted on the strength of. Same guard, same reason, as
    // `assertLicenseTextsAreNuget`.
    if (!key.startsWith('nuget:'))
      throw new Error(
        `the override for "${key}" links to the separate program "${override.separateProgram}", ` +
          'and only a "nuget:" package renders that link. The row would take the link\'s admission ' +
          'and show the reader no way to reach the entry it rests on - record the determination ' +
          'another way, or add the Notes column to that section first.',
      );
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
