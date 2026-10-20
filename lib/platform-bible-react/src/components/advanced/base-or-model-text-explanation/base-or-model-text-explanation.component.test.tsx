// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  BASE_OR_MODEL_TEXT_EXPLANATION_ENGLISH_FALLBACKS,
  BASE_OR_MODEL_TEXT_EXPLANATION_STRING_KEYS,
  BaseOrModelTextExplanation,
  type BaseOrModelTextExplanationLocalizedStrings,
} from './base-or-model-text-explanation.component';

const STRINGS: BaseOrModelTextExplanationLocalizedStrings = {
  '%webView_modelTextPanel_emptyState_baseOrModel_intro%': 'Intro.',
  '%webView_modelTextPanel_emptyState_baseOrModel_baseTerm%': 'Base:',
  '%webView_modelTextPanel_emptyState_baseOrModel_baseDefinition%': 'Literal.',
  '%webView_modelTextPanel_emptyState_baseOrModel_modelTerm%': 'Model:',
  '%webView_modelTextPanel_emptyState_baseOrModel_modelDefinition%': 'Idiomatic.',
  '%webView_modelTextPanel_emptyState_baseOrModel_admin%': 'Admin.',
  '%webView_modelTextPanel_emptyState_baseOrModel_copyrightTerm%': 'Note:',
  '%webView_modelTextPanel_emptyState_baseOrModel_copyrightNote%': 'Copyright.',
};

function paragraphTexts(container: HTMLElement) {
  return Array.from(container.querySelectorAll('p'), (p) => p.textContent);
}

describe('BaseOrModelTextExplanation', () => {
  // Swapping two definitions, or two paragraphs, would otherwise still render every string.
  it('renders the paragraphs in order, each term beside its own definition', () => {
    const { container } = render(<BaseOrModelTextExplanation localizedStrings={STRINGS} />);

    expect(paragraphTexts(container)).toEqual([
      'Intro.',
      'Base: Literal.',
      'Model: Idiomatic.',
      'Admin.',
      'Note: Copyright.',
    ]);
  });

  it('sets each term in bold', () => {
    render(<BaseOrModelTextExplanation localizedStrings={STRINGS} />);

    ['Base:', 'Model:', 'Note:'].forEach((term) =>
      expect(screen.getByText(term).tagName).toBe('STRONG'),
    );
  });

  // `useLocalizedStrings` seeds its map with each key as its own value until strings load, so an
  // unresolved key arrives as the defined string `%key%` — which must not reach the user.
  it('shows English rather than a raw key while strings are unresolved', () => {
    const seeded = Object.fromEntries(
      BASE_OR_MODEL_TEXT_EXPLANATION_STRING_KEYS.map((stringKey) => [stringKey, stringKey]),
    );
    const { container } = render(<BaseOrModelTextExplanation localizedStrings={seeded} />);

    expect(container).not.toHaveTextContent('%');
    expect(paragraphTexts(container)[0]).toBe(
      BASE_OR_MODEL_TEXT_EXPLANATION_ENGLISH_FALLBACKS[
        '%webView_modelTextPanel_emptyState_baseOrModel_intro%'
      ],
    );
  });

  it('applies the caller’s class to the wrapper', () => {
    const { container } = render(<BaseOrModelTextExplanation className="tw:text-start" />);

    expect(container.firstElementChild).toHaveClass('tw:text-start', 'tw:flex');
  });
});

/**
 * The fallbacks restate the extension's shipped English, which is where every consumer resolves
 * these keys from. This is what keeps the two from drifting.
 */
describe('BaseOrModelTextExplanation English fallbacks', () => {
  const extensionEnglish: { [stringKey: string]: string } = JSON.parse(
    readFileSync(
      resolve(
        __dirname,
        '../../../../../../extensions/src/platform-scripture-editor/contributions/localizedStrings.json',
      ),
      'utf8',
    ),
  ).localizedStrings.en;

  it.each([...BASE_OR_MODEL_TEXT_EXPLANATION_STRING_KEYS])(
    'matches the shipped English for %s',
    (stringKey) => {
      expect(BASE_OR_MODEL_TEXT_EXPLANATION_ENGLISH_FALLBACKS[stringKey]).toBe(
        extensionEnglish[stringKey],
      );
    },
  );
});
