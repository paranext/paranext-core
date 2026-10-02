import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Resolved from this file's location rather than `process.cwd()` so the test is not sensitive to
// the directory `vitest` happens to be invoked from.
const LOCALIZATION_DIR = resolve(__dirname, '../../../../assets/localization');

// JSON.parse returns `any`, which assigns to these known file shapes without a type assertion
function readJson(fileName: string) {
  return JSON.parse(readFileSync(resolve(LOCALIZATION_DIR, fileName), 'utf8'));
}
const english: { [key: string]: unknown } = readJson('en.json');
const spanish: { [key: string]: unknown } = readJson('es.json');
const metadata: { [key: string]: { deprecationInfo?: { date: string; message: string } } } =
  readJson('metadata.json');

// The tour's left-column stop names both Base and Model texts. The shipped stop keys name the model
// text alone, a narrower meaning, so new keys carry the wording and the shipped ones are retired
// with their values intact (Localization-Guide.md, "Existing Strings Are Immutable").
describe('onboarding tour Base/Model text stop', () => {
  const newKeys = [
    '%onboardingTour_step_baseOrModelText_title%',
    '%onboardingTour_step_baseOrModelText_description%',
  ];
  const retiredKeys = [
    '%onboardingTour_step_modelText_title%',
    '%onboardingTour_step_modelText_description%',
  ];

  // en and es are the two languages maintained in this repo; nothing in the build enforces parity.
  it.each(newKeys)('%s has English and Spanish text', (key) => {
    expect(english[key]).toEqual(expect.stringMatching(/\S/));
    expect(spanish[key]).toEqual(expect.stringMatching(/\S/));
    expect(spanish[key]).not.toBe(english[key]);
  });

  it('names both Base and Model in English', () => {
    expect(english['%onboardingTour_step_baseOrModelText_title%']).toBe('Your Base or Model text');
    expect(english['%onboardingTour_step_baseOrModelText_description%']).toMatch(
      /Base or Model text/,
    );
  });

  it.each(retiredKeys)('%s carries a deprecation notice', (key) => {
    expect(metadata[key]?.deprecationInfo).toBeDefined();
  });

  it('keeps the shipped English and Spanish values', () => {
    expect(english['%onboardingTour_step_modelText_title%']).toBe('Your model text');
    expect(english['%onboardingTour_step_modelText_description%']).toBe(
      "This is your model text — the reference you're translating from. Your admin usually picks it for the team; see More info in this column if you need to pick it yourself.",
    );
    expect(spanish['%onboardingTour_step_modelText_title%']).toBe('Su texto modelo');
    expect(spanish['%onboardingTour_step_modelText_description%']).toBe(
      'Este es su texto modelo: la referencia desde la cual traduce. Normalmente lo elige su administrador para el equipo; consulte Más información en esta columna si necesita elegirlo usted mismo.',
    );
  });
});
