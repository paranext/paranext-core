import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import path from 'path';
import * as tablerIcons from '@tabler/icons-react';
import * as lucideIcons from 'lucide-react';
import { LUCIDE_ICONS_BY_NAME } from '../../../lib/platform-bible-react/src/components/basics/lucide-icons.util';
import { findIconConflicts } from './icon-conflicts.util';
import { ICON_CATALOG, ICON_CONFLICT_NOTES } from './icon-usage.data';
import type { IconCatalogEntry, IconLibrary } from './icon-usage.model';

/** Folders whose source files make up the shipped app, relative to the repo root */
const CORPUS_ROOTS = ['src', 'extensions/src', 'lib/platform-bible-react/src'];

/**
 * Files that are not part of the shipped app, plus the name registry itself, which lists icons
 * without showing any
 */
const EXCLUDED_PATH =
  /(\.test\.|\.stories\.|\.d\.ts$|^src\/stories\/|\/storybook\/|\/components\/demo\/|\/node_modules\/|\/dist\/|\/lucide-icons\.util\.ts$)/;

const LIBRARY_MODULES: Record<IconLibrary, Record<string, unknown>> = {
  'lucide-react': lucideIcons,
  '@tabler/icons-react': tablerIcons,
};

/** Matches `import { A, B as C } from 'lucide-react'` (or tabler), across lines */
const ICON_IMPORT =
  /import\s*(type\s*)?\{([^}]*)\}\s*from\s*['"](lucide-react|@tabler\/icons-react)['"]/g;

function readRepoFile(location: string): string {
  return readFileSync(path.join(process.cwd(), location), 'utf8');
}

function listSourceFiles(directory: string): string[] {
  return readdirSync(path.join(process.cwd(), directory)).flatMap((name) => {
    const relative = `${directory}/${name}`;
    if (name === 'node_modules' || name === 'dist') return [];
    if (statSync(path.join(process.cwd(), relative)).isDirectory())
      return listSourceFiles(relative);
    return /\.(ts|tsx|json)$/.test(name) ? [relative] : [];
  });
}

/** Export names a file imports from an icon library, excluding type-only imports */
function getIconImports(source: string): { library: IconLibrary; name: string }[] {
  return [...source.matchAll(ICON_IMPORT)].flatMap((match) => {
    if (match[1]) return [];
    // The regex only matches these two module names
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const library = match[3] as IconLibrary;
    return match[2]
      .split(',')
      .map((specifier) => specifier.trim())
      .filter((specifier) => specifier && !specifier.startsWith('type '))
      .map((specifier) => ({ library, name: specifier.split(/\s+as\s+/)[0].trim() }))
      .filter(({ name }) => typeof LIBRARY_MODULES[library][name] === 'object');
  });
}

/**
 * Kebab-case icon names a file passes by name: menu `iconNameBefore` / `iconNameAfter` values in
 * JSON, and in code a quoted registered name that contains a hyphen or sits on a line mentioning
 * "icon". Misses a single-word name passed positionally on a line of its own, or a name built by
 * concatenation.
 */
function getNamedIcons(location: string, source: string): string[] {
  const registered = Object.keys(LUCIDE_ICONS_BY_NAME);
  if (location.endsWith('.json'))
    return [...source.matchAll(/"iconName(?:Before|After)"\s*:\s*"([^"]+)"/g)].map((m) => m[1]);
  return source
    .split('\n')
    .flatMap((line) =>
      registered.filter(
        (name) =>
          new RegExp(`['"]${name}['"]`).test(line) && (name.includes('-') || /icon/i.test(line)),
      ),
    );
}

/** Lucide sets `displayName` to the glyph's canonical name */
function getDisplayName(component: unknown): unknown {
  return typeof component === 'object' && component && 'displayName' in component
    ? component.displayName
    : undefined;
}

function findEntry(component: unknown): IconCatalogEntry | undefined {
  return ICON_CATALOG.find((entry) => entry.component === component);
}

describe('ICON_CATALOG', () => {
  it('names each glyph once, by its canonical export name', () => {
    const names = ICON_CATALOG.map((entry) => entry.name);
    expect(new Set(names).size).toBe(names.length);
    ICON_CATALOG.forEach((entry) => {
      expect(LIBRARY_MODULES[entry.library][entry.name]).toBe(entry.component);
      entry.importedAs?.forEach((alias) =>
        expect(LIBRARY_MODULES[entry.library][alias]).toBe(entry.component),
      );
    });
    const misnamed = ICON_CATALOG.filter((entry) => entry.library === 'lucide-react')
      .map((entry) => ({ name: entry.name, displayName: getDisplayName(entry.component) }))
      .filter(({ name, displayName }) => name !== displayName);
    expect(misnamed).toEqual([]);
  });

  it('gives each registered lucide name to the entry of the glyph it renders', () => {
    Object.entries(LUCIDE_ICONS_BY_NAME).forEach(([lucideName, component]) => {
      expect(findEntry(component)?.lucideName).toBe(lucideName);
    });
    ICON_CATALOG.filter((entry) => entry.usages.length === 0).forEach((entry) =>
      expect(entry.lucideName).toBeDefined(),
    );
  });

  it('lists each site at most once per meaning', () => {
    ICON_CATALOG.forEach((entry) => {
      const keys = entry.usages.map((usage) => `${usage.location} ${usage.concept}`);
      expect(new Set(keys).size).toBe(keys.length);
    });
  });

  it('points every usage at an existing file that imports or names the icon', () => {
    const stale: string[] = [];
    ICON_CATALOG.forEach((entry) => {
      const names = [entry.name, ...(entry.importedAs ?? [])];
      entry.usages.forEach(({ location }) => {
        if (!existsSync(path.join(process.cwd(), location))) {
          stale.push(`${location} does not exist`);
          return;
        }
        const source = readRepoFile(location);
        const imported = getIconImports(source).some(
          (icon) => icon.library === entry.library && names.includes(icon.name),
        );
        const named =
          entry.lucideName !== undefined &&
          getNamedIcons(location, source).includes(entry.lucideName);
        if (!imported && !named)
          stale.push(`${entry.name} is not imported or named in ${location}`);
      });
    });
    expect(stale).toEqual([]);
  });

  it('lists every icon that a shipped file imports or names', () => {
    const missing: string[] = [];
    CORPUS_ROOTS.flatMap(listSourceFiles)
      .filter((location) => !EXCLUDED_PATH.test(location))
      .forEach((location) => {
        const source = readRepoFile(location);
        getIconImports(source).forEach(({ library, name }) => {
          const entry = findEntry(LIBRARY_MODULES[library][name]);
          if (!entry) missing.push(`${name} (${library}) imported in ${location}: no entry`);
          else if (entry.name !== name && !entry.importedAs?.includes(name))
            missing.push(`${entry.name} is imported as ${name} in ${location}: add to importedAs`);
          else if (!entry.usages.some((usage) => usage.location === location))
            missing.push(`${entry.name} imported in ${location}: no usage listed`);
        });
        getNamedIcons(location, source).forEach((lucideName) => {
          const entry = ICON_CATALOG.find((candidate) => candidate.lucideName === lucideName);
          if (!entry?.usages.some((usage) => usage.location === location))
            missing.push(`"${lucideName}" named in ${location}: no usage listed`);
        });
      });
    expect(missing).toEqual([]);
  });
});

describe('ICON_CONFLICT_NOTES', () => {
  it('assesses exactly the conflicts the catalog contains', () => {
    const conflictIds = findIconConflicts(ICON_CATALOG)
      .map((conflict) => conflict.id)
      .sort();
    expect(Object.keys(ICON_CONFLICT_NOTES).sort()).toEqual(conflictIds);
  });

  it('never leaves a decided conflict at review', () => {
    const decidedForReview = Object.entries(ICON_CONFLICT_NOTES)
      .filter(([, note]) => note.decided && note.severity === 'review')
      .map(([id]) => id);
    expect(decidedForReview).toEqual([]);
  });

  it('states the decision in the recommendation exactly when the note is decided', () => {
    const mismatched = Object.entries(ICON_CONFLICT_NOTES)
      .filter(([, note]) => Boolean(note.decided) !== note.recommendation.startsWith('Decided:'))
      .map(([id]) => id);
    expect(mismatched).toEqual([]);
  });
});
