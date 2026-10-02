import { cn } from '@/utils/shadcn-ui/utils';
import { resolveLocalizedString } from '@/utils/localization.util';

/**
 * The keys this explanation reads. They are defined by the platform-scripture-editor extension (its
 * Model Text panel shows the same explanation in its empty state), so every consumer resolves them
 * from there.
 *
 * Each `...Term` key is the bold lead-in to the definition or note that follows it, and carries its
 * own punctuation so a translator controls it.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const BASE_OR_MODEL_TEXT_EXPLANATION_STRING_KEYS = Object.freeze([
  '%webView_modelTextPanel_emptyState_baseOrModel_intro%',
  '%webView_modelTextPanel_emptyState_baseOrModel_baseTerm%',
  '%webView_modelTextPanel_emptyState_baseOrModel_baseDefinition%',
  '%webView_modelTextPanel_emptyState_baseOrModel_modelTerm%',
  '%webView_modelTextPanel_emptyState_baseOrModel_modelDefinition%',
  '%webView_modelTextPanel_emptyState_baseOrModel_admin%',
  '%webView_modelTextPanel_emptyState_baseOrModel_copyrightTerm%',
  '%webView_modelTextPanel_emptyState_baseOrModel_copyrightNote%',
] as const);

/** @experimental This export is unstable and may change shape or disappear without notice */
export type BaseOrModelTextExplanationLocalizedStrings = {
  [key in (typeof BASE_OR_MODEL_TEXT_EXPLANATION_STRING_KEYS)[number]]?: string;
};

/**
 * English shown while a key is unresolved. Kept equal to the extension's shipped English values by
 * this component's tests.
 */
export const BASE_OR_MODEL_TEXT_EXPLANATION_ENGLISH_FALLBACKS: Required<BaseOrModelTextExplanationLocalizedStrings> =
  {
    '%webView_modelTextPanel_emptyState_baseOrModel_intro%':
      'If you are not translating from the Hebrew and Greek, the Base and Model texts are the texts you are translating from:',
    '%webView_modelTextPanel_emptyState_baseOrModel_baseTerm%': 'Base:',
    '%webView_modelTextPanel_emptyState_baseOrModel_baseDefinition%':
      'A literal translation which expresses the wording of the Hebrew or Greek text (a word-for-word "formal equivalent," like RSV).',
    '%webView_modelTextPanel_emptyState_baseOrModel_modelTerm%': 'Model:',
    '%webView_modelTextPanel_emptyState_baseOrModel_modelDefinition%':
      'An idiomatic translation which expresses the meaning of the Hebrew or Greek text (a contextualized "functional equivalent," like GNB).',
    '%webView_modelTextPanel_emptyState_baseOrModel_admin%':
      'If you are not the project admin, you can choose a text to display as a Base or Model temporarily. When your admin makes a choice, your selection will be replaced. If you will be the only person on this project, you will need to make a selection.',
    '%webView_modelTextPanel_emptyState_baseOrModel_copyrightTerm%': 'Note:',
    '%webView_modelTextPanel_emptyState_baseOrModel_copyrightNote%':
      'Some copyright holders require that their texts are not used as a Base or Model text. These texts will display a clear warning.',
  };

/** @experimental This export is unstable and may change shape or disappear without notice */
export type BaseOrModelTextExplanationProps = {
  /** Localized strings; pass strings resolved from `BASE_OR_MODEL_TEXT_EXPLANATION_STRING_KEYS`. */
  localizedStrings?: BaseOrModelTextExplanationLocalizedStrings;
  /** Class name for the wrapper, so each surface owns its width, alignment and wrapping. */
  className?: string;
};

/**
 * What Base and Model texts are, who chooses one, and the copyright caveat, as five paragraphs with
 * each term in bold beside what it introduces. Shown behind a "More info" disclosure by both the
 * Model Text panel's empty state and the Team layout dialog, which each own their own toggle; one
 * component so the two can never explain Base and Model differently.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function BaseOrModelTextExplanation({
  localizedStrings,
  className,
}: BaseOrModelTextExplanationProps) {
  const text = (key: keyof BaseOrModelTextExplanationLocalizedStrings) =>
    resolveLocalizedString(
      localizedStrings?.[key],
      BASE_OR_MODEL_TEXT_EXPLANATION_ENGLISH_FALLBACKS[key],
    );
  const renderTermParagraph = (
    termKey: keyof BaseOrModelTextExplanationLocalizedStrings,
    textKey: keyof BaseOrModelTextExplanationLocalizedStrings,
  ) => (
    <p>
      <strong className="tw:font-semibold tw:text-foreground">{text(termKey)}</strong>{' '}
      {text(textKey)}
    </p>
  );

  return (
    <div className={cn('pr-twp tw:flex tw:flex-col tw:gap-2', className)}>
      <p>{text('%webView_modelTextPanel_emptyState_baseOrModel_intro%')}</p>
      {renderTermParagraph(
        '%webView_modelTextPanel_emptyState_baseOrModel_baseTerm%',
        '%webView_modelTextPanel_emptyState_baseOrModel_baseDefinition%',
      )}
      {renderTermParagraph(
        '%webView_modelTextPanel_emptyState_baseOrModel_modelTerm%',
        '%webView_modelTextPanel_emptyState_baseOrModel_modelDefinition%',
      )}
      <p>{text('%webView_modelTextPanel_emptyState_baseOrModel_admin%')}</p>
      {renderTermParagraph(
        '%webView_modelTextPanel_emptyState_baseOrModel_copyrightTerm%',
        '%webView_modelTextPanel_emptyState_baseOrModel_copyrightNote%',
      )}
    </div>
  );
}

export default BaseOrModelTextExplanation;
