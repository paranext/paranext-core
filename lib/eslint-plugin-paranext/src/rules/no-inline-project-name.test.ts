import rule from './no-inline-project-name';
import { ruleTester } from '../test.utils';

const error = { messageId: 'inlineProjectName' } as const;

ruleTester.run('no-inline-project-name', rule, {
  valid: [
    // Composed through the helper
    { code: `const label = formatProjectName({ shortName, fullName });` },
    // The helper decides; the ternary only fills the slot
    { code: `const longName = hasDistinctFullName(names) ? names.fullName : undefined;` },
    { code: `const show = hasDistinctFullName(row) && row.fullName;` },
    { code: `const title = hasDistinctFullName(p) ? p.fullName : undefined;` },
    // Joined with the shared separator
    { code: `const label = [shortName, fullName].join(PROJECT_NAME_SEPARATOR);` },
    // Inside a helper call
    { code: `formatProjectName({ shortName, fullName: project.fullName ?? '' });` },
    // A composition that names a helper
    { code: `items.sort((a, b) => compareProjectsByName(a, b) || a.fullName.length);` },
    // Read, assigned or passed on, but not composed
    { code: `const fullName = project.fullName;` },
    { code: `setName(project.fullName);` },
    { code: `const names = { shortName, fullName: project.fullName };` },
    // A key named `fullName` holding a template that composes no full name
    { code: `const resource = { fullName: \`\${language} Scripture\` };` },
    // A string that merely contains `fullName`
    { code: `if (settingKey === 'platform.fullName') lock();` },
    { code: `if (triggerLabelFormat === 'shortNameAndFullName') render();` },
    // A binding named `fullName` initialized by a conditional over other names
    { code: `const fullName = isPlatformError(setting) ? '' : setting;` },
    // A negation is not a composition
    { code: `if (!fullName) return;` },
    // Operators outside the composing set
    { code: `const longer = fullName.length > shortName.length;` },
    { code: `label += fullName;` },
    // The short name alone is spelled too many ways to anchor on
    { code: `const label = \`\${shortName} - \${displayName}\`;` },
  ],
  invalid: [
    // Long-name-first fallback
    {
      code: `const label = project.fullName ?? project.shortName;`,
      errors: [{ ...error, data: { name: 'fullName' } }],
    },
    {
      code: `const sourceName = copySourceProject?.shortName ?? copySourceProject?.fullName;`,
      errors: [error],
    },
    { code: `if (!shortName) return fullName || undefined;`, errors: [error] },
    // `normalizeFullName` narrows a value and decides no shape, so it is not a way past the rule
    {
      code: `const label = normalizeFullName(p.fullName) ?? p.shortName;`,
      errors: [{ ...error, data: { name: 'normalizeFullName' } }],
    },
    // Re-inlined de-dup
    {
      code: `const show = fullName && fullName !== shortName;`,
      errors: [error, error],
    },
    { code: `if (!fullName || fullName === reference.name) return undefined;`, errors: [error] },
    // Hand-joined labels
    {
      code: `const label = \`\${project.shortName} - \${project.fullName}\`;`,
      errors: [error],
    },
    { code: `const key = resource.displayName + resource.fullName;`, errors: [error] },
    { code: `const label = [shortName, fullName].join(' - ');`, errors: [error] },
    { code: `const label = shortName.concat(' - ', fullName);`, errors: [error] },
    { code: `const label = fullName.concat(' (', shortName, ')');`, errors: [error] },
    // A slot filled by a conditional on the name
    { code: `const secondary = hasFullName ? fullName : undefined;`, errors: [error, error] },
    // The name reached through a call on it still flows into the composition
    {
      code: `const match = resource.fullName.toLowerCase().includes(filter) || other;`,
      errors: [error],
    },
    {
      code: `const match = project.fullName?.toLowerCase().includes(lower) ?? false;`,
      errors: [error],
    },
    { code: `const label = fullName!.trim() || shortName;`, errors: [error] },
    // A logical assignment is a fallback too
    { code: `enrichedMd.fullName ??= md.fullName;`, errors: [error, error] },
    // Any prefix or casing
    {
      code: `const ok = matchingBookIdForFullName && books.includes(matchingBookIdForFullName);`,
      errors: [{ ...error, data: { name: 'matchingBookIdForFullName' } }],
    },
    { code: `const label = displayFullName ?? name;`, errors: [error] },
    // A composition spread across lines is still one composition
    {
      code: `const hay = [item.shortName, item.fullName, item.language]
  .join(' ')
  .toLowerCase();`,
      errors: [{ ...error, line: 1 }],
    },
    // In JSX
    {
      code: `const node = <Row key={resource.displayName + resource.fullName} />;`,
      errors: [error],
    },
    // A helper elsewhere in the statement does not govern an unrelated composition
    {
      code: `const label = formatProjectName(names) + (other.fullName ?? '');`,
      errors: [error],
    },
  ],
});
