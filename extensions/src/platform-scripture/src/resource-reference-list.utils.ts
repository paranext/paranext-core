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

export const resourceReferenceListValidator: ProjectSettingValidator<
  'platformScripture.modelTexts' | 'platformScripture.referencedProjectsAndResources'
> = async (newValue, currentValue) => {
  // Shape validation
  if (!Array.isArray(newValue.items)) return false;
  if (!newValue.items.every(isValidResourceReference)) return false;

  // Version downgrade protection
  const parseVersion = (v: string) => {
    const parts = v.split('.').map(Number);
    if (parts.length < 2 || parts.some(Number.isNaN)) return undefined;
    return { major: parts[0], minor: parts[1] };
  };

  const newV = parseVersion(newValue.dataVersion);
  if (!newV) return false; // malformed version string

  const curV = parseVersion(currentValue.dataVersion);
  if (!curV) return true; // no parseable current version — allow any valid incoming value

  if (newV.major < curV.major) return false;
  if (newV.major === curV.major && newV.minor < curV.minor) return false;
  return true;
};
