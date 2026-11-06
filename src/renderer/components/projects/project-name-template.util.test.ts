import { describe, expect, it } from 'vitest';
import { PROJECT_NAME_SEPARATOR } from 'platform-bible-utils';
import { parseProjectNameTemplate } from './project-name-template.util';

describe('parseProjectNameTemplate', () => {
  it('reads the English order and separator', () => {
    expect(parseProjectNameTemplate('{shortName} - {fullName}')).toEqual({
      isFullNameFirst: false,
      separator: ' - ',
    });
  });

  it('reports a locale that reorders the pair', () => {
    // The reason this parse exists: a surface rendering the two names as separate nodes has to
    // follow the template's order, or its own tooltip contradicts what is on screen.
    expect(parseProjectNameTemplate('{fullName} ({shortName})')).toEqual({
      isFullNameFirst: true,
      separator: ' (',
    });
  });

  it('reads a separator that is not the English one', () => {
    expect(parseProjectNameTemplate('{shortName} — {fullName}')).toEqual({
      isFullNameFirst: false,
      separator: ' — ',
    });
  });

  it('reports no separator when the template abuts the two names', () => {
    expect(parseProjectNameTemplate('{shortName}{fullName}')).toEqual({
      isFullNameFirst: false,
      separator: '',
    });
  });

  it('reports only the text between the two names', () => {
    // A two-node surface renders the names and the separator; a template's leading or trailing
    // literal survives only in the joined form its tooltip shows.
    expect(parseProjectNameTemplate('Project: {shortName} - {fullName}.')).toEqual({
      isFullNameFirst: false,
      separator: ' - ',
    });
  });

  it.each([
    ['a missing full name', '{shortName}'],
    ['a missing short name', '{fullName}'],
    ['no placeholders at all', 'Project'],
    ['a repeated short name', '{shortName} - {fullName} ({shortName})'],
    ['a repeated full name', '{fullName} - {shortName} - {fullName}'],
  ])('falls back to the helper order for %s', (_case, template) => {
    // A mistranslation that drops or repeats a placeholder should still read, so the fallback is
    // the shared helper's own order rather than a broken or empty label.
    expect(parseProjectNameTemplate(template)).toEqual({
      isFullNameFirst: false,
      separator: PROJECT_NAME_SEPARATOR,
    });
  });
});
