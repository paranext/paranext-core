import {
  Editorial,
  EditorOptions,
  EditorRef,
  getDefaultViewOptions,
  UsjNodeOptions,
} from '@eten-tech-foundation/platform-editor';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Button, Spinner } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { ComponentProps, useEffect, useMemo, useRef } from 'react';

const DEFAULT_TEXT_DIRECTION = 'ltr';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, pass these keys into the Platform's localization hook and pass the
 * resulting localized strings into the `localizedStrings` prop.
 */
export const MODEL_TEXT_PANEL_STRING_KEYS = Object.freeze([
  '%webView_modelTextPanel_installing%',
  '%webView_modelTextPanel_noProject%',
  '%webView_modelTextPanel_pickModelText%',
  '%webView_modelTextPanel_unknownResource%',
  '%webView_modelTextPanel_emptyState_prompt%',
] as const);

type ModelTextPanelLocalizedStringKey = (typeof MODEL_TEXT_PANEL_STRING_KEYS)[number];
type ModelTextPanelLocalizedStrings = {
  [key in ModelTextPanelLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Which of the model-text panel's mutually-exclusive states to render. The web view computes this
 * from its data sources (see `model-text-panel.web-view.tsx`) and the component renders it:
 *
 * - `noProject`: the panel was opened without a project id.
 * - `loadingModelTexts`: still resolving which model text is configured.
 * - `noModelText`: no model text is configured — show the prompt + picker button.
 * - `unknownResource`: the configured resource id isn't in the DBL list.
 * - `installing`: the resource is found but not yet installed.
 * - `loadingText`: the resource is installed but its USJ hasn't loaded yet.
 * - `active`: render the read-only Scripture editor with the model text.
 */
export type ModelTextPanelStatus =
  | 'noProject'
  | 'loadingModelTexts'
  | 'noModelText'
  | 'unknownResource'
  | 'installing'
  | 'loadingText'
  | 'active';

export type ModelTextPanelProps = {
  /** Localized strings; import `MODEL_TEXT_PANEL_STRING_KEYS` to resolve them. */
  localizedStrings: ModelTextPanelLocalizedStrings;
  /** Which state to render. */
  status: ModelTextPanelStatus;
  /** Called when the user clicks the "pick model text" button in the empty state. */
  onPickModelText: () => void;
  /** The model text USJ to show in the editor (used by the `active` state). */
  usj?: Usj;
  /** Text direction of the model text (used by the `active` state). Defaults to `ltr`. */
  textDirection?: string;
  /** Current Scripture reference for the editor (used by the `active` state). */
  scrRef?: SerializedVerseRef;
  /** Called when the editor changes the Scripture reference (used by the `active` state). */
  onScrRefChange?: (scrRef: SerializedVerseRef) => void;
  /** Logger forwarded to the editor (used by the `active` state). */
  logger?: ComponentProps<typeof Editorial>['logger'];
};

const DEFAULT_SCR_REF: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

/**
 * Read-only panel that displays a project's configured "model text" Scripture resource. It renders
 * one of several states (no project, loading, prompt-to-pick, installing, or the active editor) as
 * directed by the `status` prop. This is the presentational half of the model-text-panel web view;
 * the web view resolves the data and drives `status`.
 */
export function ModelTextPanel({
  localizedStrings,
  status,
  onPickModelText,
  usj,
  textDirection = DEFAULT_TEXT_DIRECTION,
  scrRef = DEFAULT_SCR_REF,
  onScrRefChange = () => {},
  logger,
}: ModelTextPanelProps) {
  // EditorRef requires null initial value per React ref convention
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  const options: EditorOptions = useMemo(
    () => ({
      isReadonly: true,
      hasSpellCheck: false,
      // UsjNodeOptions is a complex type; empty-object initializer requires assertion
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      nodes: {} as UsjNodeOptions,
      textDirection,
      view: getDefaultViewOptions(),
    }),
    [textDirection],
  );

  // Read-only: push incoming USJ directly into the editor whenever it changes.
  useEffect(() => {
    if (usj) editorRef.current?.setUsj(usj);
  }, [usj]);

  switch (status) {
    case 'noProject':
      return (
        <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
          <p>{localizedStrings['%webView_modelTextPanel_noProject%']}</p>
        </div>
      );
    case 'loadingModelTexts':
      return (
        <div className="tw:flex tw:h-screen tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:p-8 tw:text-center">
          <Spinner />
        </div>
      );
    case 'noModelText':
      return (
        <div className="tw:flex tw:h-screen tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:p-8 tw:text-center">
          <p>{localizedStrings['%webView_modelTextPanel_emptyState_prompt%']}</p>
          <Button onClick={() => onPickModelText()}>
            {localizedStrings['%webView_modelTextPanel_pickModelText%']}
          </Button>
        </div>
      );
    case 'unknownResource':
      return (
        <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
          <p>{localizedStrings['%webView_modelTextPanel_unknownResource%']}</p>
        </div>
      );
    case 'installing':
      return (
        <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:gap-2 tw:p-8 tw:text-center">
          <Spinner />
          <span>{localizedStrings['%webView_modelTextPanel_installing%']}</span>
        </div>
      );
    case 'loadingText':
      return (
        <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
          <Spinner />
        </div>
      );
    case 'active':
    default:
      return (
        <div className="tw:h-screen tw:overflow-auto" dir={options.textDirection}>
          <Editorial
            ref={editorRef}
            scrRef={scrRef}
            onScrRefChange={onScrRefChange}
            options={options}
            logger={logger}
          />
        </div>
      );
  }
}

export default ModelTextPanel;
