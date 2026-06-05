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
import type { DblResourceData, LocalizedStringValue } from 'platform-bible-utils';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  EffectiveResourceReferenceList,
  ResourceReferenceList,
} from 'platform-scripture';
import { ComponentProps, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { selectTextConnection } from './select-dbl-resource';

const CURRENT_DATA_VERSION = '1.0.0';
const DEFAULT_TEXT_DIRECTION = 'ltr';

/**
 * Object containing all keys used for localization in this component. Pass these keys into the
 * Platform's localization hook and pass the resulting localized strings into the `localizedStrings`
 * prop.
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

const DEFAULT_SCR_REF: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

export type ModelTextPanelProps = {
  /** Localized strings; import `MODEL_TEXT_PANEL_STRING_KEYS` to resolve them. */
  localizedStrings: ModelTextPanelLocalizedStrings;
  /** Whether the panel has a project context (opened with a project id). */
  hasProject: boolean;
  /**
   * The resolved ("effective") model-text references for this project, or `undefined` while still
   * resolving. The first item is the configured model text.
   */
  effectiveModelTexts: EffectiveResourceReferenceList | undefined;
  /** Whether the effective model texts are still loading. */
  isEffectiveModelTextsLoading: boolean;
  /** All DBL resources — used to match the configured model text and to feed the resource picker. */
  dblResources: DblResourceData[];
  /** Whether the DBL resources are still loading. */
  isLoadingResources: boolean;
  /** The project's admin-level model-text setting (used when writing an admin choice). */
  adminModelTexts: ResourceReferenceList | undefined;
  /** The user-level model-text setting (used when writing a user choice). */
  userModelTexts: ResourceReferenceList | undefined;
  /** Whether the user may write project (admin) settings; decides admin vs. user persistence. */
  canWriteProjectSettings: boolean;
  /** Current Scripture reference for the editor. */
  scrRef?: SerializedVerseRef;
  /** Called when the editor changes the Scripture reference. */
  onScrRefChange?: (scrRef: SerializedVerseRef) => void;
  /**
   * Install a DBL resource by its entry uid (fire-and-forget; the panel re-resolves once
   * installed).
   */
  installResource: (dblEntryUid: string) => Promise<void>;
  /** Persist an admin-level model-text list. */
  setAdminModelTexts: (list: ResourceReferenceList) => void;
  /** Persist a user-level model-text list. */
  setUserModelTexts: (list: ResourceReferenceList) => Promise<void>;
  /**
   * Open the resource picker for the user to choose a model text. Resolves with the chosen
   * resource, or `undefined` if the picker was cancelled. In the app this opens the
   * `platform.resourcePicker` dialog; in Storybook it renders the real ResourcePickerDialog
   * inline.
   */
  showResourcePicker: (selectedResourceIds: string[]) => Promise<DblResourceData | undefined>;
  /**
   * Retrieve the resolved resource's chapter USJ and text direction. This is a callback (not a
   * prop) because the resource project to read from is resolved inside this component.
   */
  getResourceChapter: (
    resourceProjectId: string,
    scrRef: SerializedVerseRef,
  ) => Promise<{ usj: Usj | undefined; textDirection: string }>;
  /** Logger forwarded to the editor (the webview supplies the PAPI logger; stories may omit it). */
  logger?: ComponentProps<typeof Editorial>['logger'];
};

/**
 * Read-only panel that displays a project's configured "model text" Scripture resource. It owns the
 * orchestration (resolve the configured model text → match a DBL resource → auto-install if needed
 * → load that resource's chapter USJ) so the app webview and Storybook share the same logic; only
 * the data (props) and the PAPI-backed operations (callbacks) differ between them.
 */
export function ModelTextPanel({
  localizedStrings,
  hasProject,
  effectiveModelTexts,
  isEffectiveModelTextsLoading,
  dblResources,
  isLoadingResources,
  adminModelTexts,
  userModelTexts,
  canWriteProjectSettings,
  scrRef = DEFAULT_SCR_REF,
  onScrRefChange = () => {},
  installResource,
  setAdminModelTexts,
  setUserModelTexts,
  showResourcePicker,
  getResourceChapter,
  logger,
}: ModelTextPanelProps) {
  // --- Resolve the configured model text against the DBL resource list ---

  const effectiveModelText = effectiveModelTexts?.items[0];
  let dblRef: (EffectiveResourceReference & DblResourceReference) | undefined;
  if (effectiveModelText?.type === 'dblResource') {
    // EffectiveResourceReference union check doesn't satisfy TS discriminated-union refinement
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    dblRef = effectiveModelText as EffectiveResourceReference & DblResourceReference;
  }
  const match = dblRef ? dblResources.find((r) => r.dblEntryUid === dblRef.id) : undefined;

  // Auto-install when the resource exists but isn't installed yet
  const isInstalling = dblRef !== undefined && match !== undefined && !match.installed;
  const matchDblEntryUid = match?.dblEntryUid;
  useEffect(() => {
    if (isInstalling && matchDblEntryUid !== undefined) installResource(matchDblEntryUid);
  }, [isInstalling, matchDblEntryUid, installResource]);

  const resourceProjectId = match?.installed ? match.projectId : undefined;

  // --- Load the resolved resource's chapter USJ (re-fetch on resource/reference change) ---

  const [usj, setUsj] = useState<Usj | undefined>(undefined);
  const [textDirection, setTextDirection] = useState<string>(DEFAULT_TEXT_DIRECTION);
  // `undefined` means "not yet fetched" so we can show the loading state, matching the original.
  const [isUsjLoading, setIsUsjLoading] = useState(false);

  useEffect(() => {
    if (!resourceProjectId) {
      setUsj(undefined);
      return undefined;
    }
    let isActive = true;
    setIsUsjLoading(true);
    const load = async () => {
      const { usj: nextUsj, textDirection: nextTextDirection } = await getResourceChapter(
        resourceProjectId,
        scrRef,
      );
      if (!isActive) return;
      setUsj(nextUsj);
      setTextDirection(nextTextDirection || DEFAULT_TEXT_DIRECTION);
      setIsUsjLoading(false);
    };
    load().catch(() => {
      if (!isActive) return;
      setUsj(undefined);
      setIsUsjLoading(false);
    });
    return () => {
      isActive = false;
    };
  }, [resourceProjectId, scrRef, getResourceChapter]);

  // --- Editor ---

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
      // Narrow the resource's (string) text-direction setting to the editor's union without a cast.
      textDirection: textDirection === 'rtl' || textDirection === 'auto' ? textDirection : 'ltr',
      view: getDefaultViewOptions(),
    }),
    [textDirection],
  );

  // Read-only: push incoming USJ directly into the editor whenever it changes.
  useEffect(() => {
    if (usj) editorRef.current?.setUsj(usj);
  }, [usj]);

  // --- Resource picker / selection ---

  const currentModelTextIds = useMemo(() => {
    const items = effectiveModelTexts?.items ?? [];
    const dblItems = items.filter(
      (r): r is EffectiveResourceReference & DblResourceReference => r.type === 'dblResource',
    );
    const adminDblItems = dblItems.filter((r) => r.source === 'admin');
    const relevantItems =
      adminDblItems.length > 0 ? adminDblItems : dblItems.filter((r) => r.source === 'user');
    return relevantItems.map((r) => r.id);
  }, [effectiveModelTexts]);

  const handleResourceSelect = useCallback(
    async (resource: DblResourceData) =>
      selectTextConnection(
        resource,
        adminModelTexts,
        setAdminModelTexts,
        canWriteProjectSettings,
        async () => userModelTexts,
        setUserModelTexts,
        async () => installResource(resource.dblEntryUid),
      ),
    [
      adminModelTexts,
      canWriteProjectSettings,
      effectiveModelTexts,
      setAdminModelTexts,
      userModelTexts,
      setUserModelTexts,
    ],
  );

  const handlePickModelText = useCallback(async () => {
    const resource = await showResourcePicker(currentModelTextIds);
    if (resource) await handleResourceSelect(resource);
  }, [showResourcePicker, currentModelTextIds, handleResourceSelect]);

  // --- Render the resolved state ---

  // No project: opened without a project id (expected to be brief).
  if (!hasProject) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <p>{localizedStrings['%webView_modelTextPanel_noProject%']}</p>
      </div>
    );
  }

  // Zero state: no model text configured (or still loading the list / DBL resources).
  if (isLoadingResources || !effectiveModelTexts || effectiveModelTexts.items.length === 0) {
    return (
      <div className="tw:flex tw:h-screen tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:p-8 tw:text-center">
        {/* Also shows spinner for if loading resources, except if there is no model text then */}
        {/* it should directly show the button to pick a model text below */}
        {isEffectiveModelTextsLoading ||
        (isLoadingResources && effectiveModelText && effectiveModelTexts?.items.length !== 0) ? (
          <Spinner />
        ) : (
          <>
            <p>{localizedStrings['%webView_modelTextPanel_emptyState_prompt%']}</p>
            <Button onClick={() => handlePickModelText()}>
              {localizedStrings['%webView_modelTextPanel_pickModelText%']}
            </Button>
          </>
        )}
      </div>
    );
  }

  // Error state: the configured uid isn't in the DBL list at all.
  if (dblRef && match === undefined) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <p>{localizedStrings['%webView_modelTextPanel_unknownResource%']}</p>
      </div>
    );
  }

  // Installing: resource found but not yet installed.
  if (isInstalling) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:gap-2 tw:p-8 tw:text-center">
        <Spinner />
        <span>{localizedStrings['%webView_modelTextPanel_installing%']}</span>
      </div>
    );
  }

  // Loading: USJ not yet fetched for the resolved resource.
  if (!resourceProjectId || (usj === undefined && isUsjLoading)) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <Spinner />
      </div>
    );
  }

  // Active: read-only editor showing the model text.
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

export default ModelTextPanel;
