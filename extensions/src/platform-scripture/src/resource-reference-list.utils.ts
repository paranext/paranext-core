import type { ProjectSettingValidator } from '@papi/core';

export const isValidResourceReference = (item: unknown): boolean => {
  if (typeof item !== 'object' || item === null) return false;
  const ref = item as Record<string, unknown>;
  if (typeof ref['type'] !== 'string') return false;
  switch (ref['type']) {
    case 'project':
    case 'dblResource':
      return typeof ref['name'] === 'string' && typeof ref['id'] === 'string';
    case 'enhancedResource':
    case 'xmlResource':
    case 'sourceLanguageResource':
      return typeof ref['name'] === 'string';
    default:
      return true; // unknown types are valid — UnknownResourceReference accepts any shape
  }
};

const parseVersion = (v: string) => {
  const parts = v.split('.').map(Number);
  if (parts.length < 2 || parts.some(Number.isNaN)) return undefined;
  return { major: parts[0], minor: parts[1] };
};

export const resourceReferenceListValidator: ProjectSettingValidator<
  'platformScripture.modelTexts' | 'platformScripture.referencedProjectsAndResources'
> = async (newValue, currentValue) => {
  if (currentValue === null || currentValue === undefined)
    throw new Error('Current value is missing; cannot validate resource reference list.');

  // Shape validation
  if (!Array.isArray(newValue.items))
    throw new Error('Resource reference list `items` must be an array.');
  const invalidIndex = newValue.items.findIndex((item) => !isValidResourceReference(item));
  if (invalidIndex !== -1)
    throw new Error(
      `Resource reference at index ${invalidIndex} has an invalid shape for its \`type\`.`,
    );

  // Version downgrade protection
  const newV = parseVersion(newValue.dataVersion);
  if (!newV)
    throw new Error(
      `New \`dataVersion\` "${newValue.dataVersion}" is malformed; expected "major.minor[.patch]".`,
    );

  const curV = parseVersion(currentValue.dataVersion);
  if (!curV)
    throw new Error(
      `Current \`dataVersion\` "${currentValue.dataVersion}" is malformed; expected "major.minor[.patch]".`,
    );

  if (newV.major < curV.major || (newV.major === curV.major && newV.minor < curV.minor))
    throw new Error(
      `Refusing to downgrade resource reference list from \`dataVersion\` "${currentValue.dataVersion}" to "${newValue.dataVersion}".`,
    );

  return true;
};
