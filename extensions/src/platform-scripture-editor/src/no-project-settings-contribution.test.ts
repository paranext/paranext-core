import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { CURRENT_DATA_VERSION } from './resource-reference-list.const';

/**
 * The two app-scoped settings that hold a no-project reading choice. Their defaults are declared in
 * JSON, far from the `ResourceReferenceList` code that reads them, and nothing in the build ties
 * the two together — TypeScript does not typecheck a settings contribution's `default` against
 * `SettingTypes`. So a `dataVersion` bump in `resource-reference-list.const.ts` would leave these
 * defaults quietly behind, and the drift would only surface as a stored list that reads as an older
 * schema than anything else in the app.
 */
const NO_PROJECT_SETTING_KEYS = [
  'platformScriptureEditor.noProjectModelTexts',
  'platformScriptureEditor.noProjectReferencedResources',
] as const;

type SettingsContributionFile = Array<{
  properties: Record<string, { label?: string; default?: unknown; isHidden?: boolean }>;
}>;

function readSettingsContribution(): SettingsContributionFile {
  const settingsPath = path.resolve(__dirname, '../contributions/settings.json');
  // JSON.parse returns `any`, which assigns to the known shape of a settings contribution file
  // without a type assertion.
  const contribution: SettingsContributionFile = JSON.parse(readFileSync(settingsPath, 'utf-8'));
  return contribution;
}

const properties = Object.assign(
  {},
  ...readSettingsContribution().map((group) => group.properties),
);

describe('no-project reading-choice settings', () => {
  NO_PROJECT_SETTING_KEYS.forEach((key) => {
    it(`declares ${key}`, () => {
      expect(properties[key]).toBeDefined();
    });

    it(`defaults ${key} to an empty list at the current data version`, () => {
      expect(properties[key]?.default).toEqual({ dataVersion: CURRENT_DATA_VERSION, items: [] });
    });

    it(`keeps ${key} hidden from the settings dialog`, () => {
      // These are written by the panels' resource picker, never edited by hand. A visible raw-JSON
      // setting would also be a way to put a non-free resource into the no-project entry point.
      expect(properties[key]?.isHidden).toBe(true);
    });

    it(`gives ${key} a label, which the contribution schema requires even when hidden`, () => {
      expect(properties[key]?.label).toMatch(/^%.+%$/);
    });
  });
});
