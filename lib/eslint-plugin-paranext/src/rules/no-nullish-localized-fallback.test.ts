import path from 'path';
import rule from './no-nullish-localized-fallback';
import { typeAwareRuleTester } from '../test.utils';

const filename = path.resolve(__dirname, '../fixtures/case.ts');
const imports = `import { localizedStrings, stringsBag, partialStrings, widths, key, stringMap, plainKey, anonymousMap, keyFor, wideStrings, wideKey } from './localized-strings';`;

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
      // A computed key the parser cannot read as `%…%` still resolves through the map's type, so
      // the rule does not depend on the key being written as a literal.
      code: `${imports}\nconst t = localizedStrings[\`%a_\${plainKey}%\`] ?? 'A';`,
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
      // recognized from the type's members rather than from its printed text.
      code: `${imports}\nconst t = wideStrings[wideKey] ?? 'A';`,
      filename,
      errors: [{ messageId: 'nullishLocalizedFallback' }],
    },
    {
      // Falling back to the key itself is dead code rather than user-visible breakage.
      code: `${imports}\nconst t = localizedStrings[key] ?? key;`,
      filename,
      errors: [{ messageId: 'deadKeyFallback' }],
    },
  ],
});
