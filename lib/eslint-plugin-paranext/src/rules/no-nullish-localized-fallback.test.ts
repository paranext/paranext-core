import path from 'path';
import rule from './no-nullish-localized-fallback';
import { typeAwareRuleTester, typelessRuleTester } from '../test.utils';

const filename = path.resolve(__dirname, '../fixtures/case.ts');
const imports = `import { localizedStrings, stringsBag, partialStrings, widths, key, stringMap, plainKey, anonymousMap, keyFor, wideKey, componentStrings } from './localized-strings';`;

typeAwareRuleTester.run('no-nullish-localized-fallback', rule, {
  valid: [
    {
      // A map that has nothing to do with localization keeps its legitimate `??`.
      code: `${imports}\nconst w = widths['a'] ?? 0;`,
      filename,
    },
    {
      // Already going through the shared predicate.
      code: `${imports}\nimport { resolveLocalizedString } from 'platform-bible-utils';\nconst t = resolveLocalizedString(localizedStrings['%a%'], 'A');`,
      filename,
    },
    {
      // A non-computed property read is not the indexed-lookup shape this rule is about.
      code: `${imports}\nconst t = widths.a ?? 0;`,
      filename,
    },
    {
      // An ordinary string map indexed by an ordinary string is the shape the rule must never
      // claim: `Record<string, string>` really can return `undefined`.
      code: `${imports}\nconst t = stringMap[plainKey] ?? 'A';`,
      filename,
    },
  ],
  invalid: [
    {
      // The canonical shape.
      code: `${imports}\nconst t = localizedStrings['%a%'] ?? 'A';`,
      filename,
      errors: [{ messageId: 'nullishLocalizedFallback' }],
    },
    {
      // Aliased map — the case an identifier-name heuristic cannot see.
      code: `${imports}\nconst t = stringsBag['%a%'] ?? 'A';`,
      filename,
      errors: [{ messageId: 'nullishLocalizedFallback' }],
    },
    {
      // `Partial<Record<…>>` really is `string | undefined`, and `??` is still the wrong test.
      code: `${imports}\nconst t = partialStrings['%a%'] ?? 'A';`,
      filename,
      errors: [{ messageId: 'nullishLocalizedFallback' }],
    },
    {
      // Optional chaining is the same defect.
      code: `${imports}\nconst t = localizedStrings?.['%a%'] ?? 'A';`,
      filename,
      errors: [{ messageId: 'nullishLocalizedFallback' }],
    },
    {
      // `||` is the same defect.
      code: `${imports}\nconst t = localizedStrings['%a%'] || 'A';`,
      filename,
      errors: [{ messageId: 'nullishLocalizedFallback' }],
    },
    {
      // An aliased map indexed by a plain `string`, looser than the map's own key type. Nothing
      // about the key is recognizable, so only the map's type can produce the report — the one
      // shape neither an identifier-name heuristic nor a key-shape check can reach.
      code: `${imports}\nconst t = stringsBag[plainKey] ?? 'A';`,
      filename,
      errors: [{ messageId: 'nullishLocalizedFallback' }],
    },
    {
      // An interpolated key on an aliased map. TypeScript contextually types the template literal
      // by the map's key type, so this reports without the key ever being written as a literal.
      code: `${imports}\nconst t = stringsBag[\`%a_\${plainKey}%\`] ?? 'A';`,
      filename,
      errors: [{ messageId: 'nullishLocalizedFallback' }],
    },
    {
      // A key produced by a helper is recognized by its `LocalizeKey` type, even where the map it
      // indexes is an anonymous object built by spreading.
      code: `${imports}\nconst t = anonymousMap[keyFor(1)] ?? 'A';`,
      filename,
      errors: [{ messageId: 'nullishLocalizedFallback' }],
    },
    {
      // A `keyof` over a wide strings bag prints as a union the checker truncates, so the key is
      // recognized from the type's members rather than from its printed text. The map is the
      // zero-member `anonymousMap`, which the map branch never claims, so only the key branch can
      // produce this report.
      code: `${imports}\nconst t = anonymousMap[wideKey] ?? 'A';`,
      filename,
      errors: [{ messageId: 'nullishLocalizedFallback' }],
    },
    {
      // A component's own strings type — a mapped type over a literal key union — indexed by a
      // plain `string`. Nothing about the key is `%…%`-shaped or typed `LocalizeKey`, so only the
      // map branch, walking the type's declared members, can produce this report.
      code: `${imports}\nconst t = componentStrings[plainKey] ?? 'A';`,
      filename,
      errors: [{ messageId: 'nullishLocalizedFallback' }],
    },
    {
      // Falling back to the key itself is dead code rather than user-visible breakage. The only
      // suggestion offered deletes the fallback: wrapping it would keep the key as the fallback
      // text, which is the raw `%…%` the rule exists to stop.
      code: `${imports}\nconst t = localizedStrings[key] ?? key;`,
      filename,
      errors: [
        {
          messageId: 'deadKeyFallback',
          suggestions: [
            {
              messageId: 'deleteDeadKeyFallback',
              output: `${imports}\nconst t = localizedStrings[key];`,
            },
          ],
        },
      ],
    },
  ],
});

// The stand-down guard: with no type information the rule must register no listeners and report
// nothing, rather than throwing and taking the whole lint run down with it. Every case above runs
// WITH a type-checked program, so none of them can reach this path.
typelessRuleTester.run('no-nullish-localized-fallback (no type information)', rule, {
  valid: [
    // Reports under type information as the canonical shape; must be silent without it.
    { code: `const t = localizedStrings['%a%'] ?? 'A';` },
    // A literal `%…%` key is recognizable from syntax alone, so this pins that the rule stands
    // down entirely rather than falling back to a syntax-only check.
    { code: `const t = anyBag['%a%'] || 'A';` },
    { code: `const t = localizedStrings[key] ?? key;` },
  ],
  invalid: [],
});
