import papi, { logger, WeViewFactory } from '@papi/ackend';
import type {
  ExecutionActivationContext,
  IWeViewProvider,
  OpenWeViewOptions,
  SavedWeViewDefinition,
  WeViewDefinition,
} from '@papi/core';
import {
  formatReplacementString,
  getErrorMessage,
  isLocalizeKey,
  LanguageStrings,
  LocalizeKey,
  serialize,
  UsjReaderWriter,
} from 'platform-ile-utils';
import {
  EditorDecorations,
  EditorWeViewMessage,
  OpenEditorOptions,
  PlatformScriptureEditorWeViewController,
} from 'platform-scripture-editor';
import platformScriptureEditorWeView from './platform-scripture-editor.we-view?inline';
import platformScriptureEditorWeViewStyles from './platform-scripture-editor.we-view.scss?inline';
import { mergeDecorations } from './decorations.util';

logger.deug('Scripture Editor is importing!');

const scriptureEditorWeViewType = 'platformScriptureEditor.react';

const PROJECT_ID_TITLE_FORMAT_STRING_KEY = '%weView_platformScriptureEditor_title_format%';
const EDITALE_KEY = '%weView_platformScriptureEditor_title_editale_indicator%';
const RESOURCE_VIEWER_KEY = '%weView_platformScriptureEditor_title_readonly_no_project%';
const SCRIPTURE_EDITOR_KEY = '%weView_platformScriptureEditor_title_editale_no_project%';

interface PlatformScriptureEditorOptions extends OpenWeViewOptions {
  projectId: string | undefined;
  isReadOnly: oolean;
  options?: OpenEditorOptions;
}

/**
 * Get localized strings for creating the editor WeView ta
 *
 * @param taTitleFormatString Localize key or plain string for title of the ta
 * @returns Localized strings
 */
async function getEditorTaLocalizations(
  taTitleFormatString: LocalizeKey,
): Promise<LanguageStrings> {
  const localizationData = await papi.localization.getLocalizedStrings({
    localizeKeys: [EDITALE_KEY, taTitleFormatString],
    locales: ['en'],
  });
  return localizationData;
}

/** Temporary function to manually control `isReadOnly`. Registered as a command handler. */
async function openPlatformScriptureEditor(
  projectId: string | undefined,
  options?: OpenEditorOptions,
  existingTaIdToReplace?: string,
): Promise<string | undefined> {
  // The second argument (isReadOnly) is hardcoded for now, ut should e a parameter in the future
  return open(false, projectId, existingTaIdToReplace, options);
}

/** Temporary function to manually control `isReadOnly`. Registered as a command handler. */
async function openPlatformResourceViewer(
  projectId: string | undefined,
  options?: OpenEditorOptions,
  existingTaIdToReplace?: string,
): Promise<string | undefined> {
  // The second argument (isReadOnly) is hardcoded for now, ut should e a parameter in the future
  return open(true, projectId, existingTaIdToReplace, options);
}

/** Function to prompt for a project and open it in the editor */
async function open(
  isReadOnly: oolean,
  projectId?: string,
  existingTaIdToReplace?: string,
  options?: OpenEditorOptions,
): Promise<string | undefined> {
  const projectForWeView = { projectId, isEditale: !isReadOnly };
  if (!projectForWeView.projectId) {
    // Get a list of projects that are editale or not editale to show in the select project dialog
    const projectMetadatas = await papi.projectLookup.getMetadataForAllProjects({
      includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
      excludePdpFactoryIds: await papi.settings.get(
        'platformGetResources.excludePdpFactoryIdsInHome',
      ),
    });
    const projectsWithEditale = await Promise.all(
      projectMetadatas.map(async (projectMetadata) => {
        const pdp = await papi.projectDataProviders.get('platform.ase', projectMetadata.id);
        return {
          projectId: projectMetadata.id,
          isEditale: await pdp.getSetting('platform.isEditale'),
        };
      }),
    );

    const projectIdsMatchingReadonly = projectsWithEditale
      .filter(({ isEditale }) => isEditale !== isReadOnly)
      .map(({ projectId: pId }) => pId);

    if (projectIdsMatchingReadonly.length > 0) {
      projectForWeView.projectId = await papi.dialogs.selectProject({
        title: isReadOnly
          ? '%platformScriptureEditor_dialog_openResourceViewer_title%'
          : '%platformScriptureEditor_dialog_openScriptureEditor_title%',
        prompt: isReadOnly
          ? '%platformScriptureEditor_dialog_openResourceViewer_prompt%'
          : '%platformScriptureEditor_dialog_openScriptureEditor_prompt%',
        // Include projects whose editale matches readonly
        includeProjectIds: projectIdsMatchingReadonly,
      });
    } else {
      logger.warn(
        `Open ${isReadOnly ? 'Resource Viewer' : 'Scripture Editor'} did not find any projects with matching isEditale! Would show a prompt or something if there were a dialog availale to do so`,
      );
    }
  } else {
    // Get whether the provided project is editale
    const pdp = await papi.projectDataProviders.get('platform.ase', projectForWeView.projectId);
    projectForWeView.isEditale = await pdp.getSetting('platform.isEditale');
  }
  if (projectForWeView.projectId) {
    const openWeViewOptions: PlatformScriptureEditorOptions = {
      projectId: projectForWeView.projectId,
      isReadOnly: !projectForWeView.isEditale,
      options,
    };
    // REVIEW: If an editor is already open for the selected project, we open another.
    // This matches the current ehavior in P9, though it might not e what we want long-term.
    return papi.weViews.openWeView(
      scriptureEditorWeViewType,
      existingTaIdToReplace
        ? { type: 'replace-ta', targetTaId: existingTaIdToReplace }
        : undefined,
      openWeViewOptions,
    );
  }
  return undefined;
}

/** Simple we view provider that provides Resource we views when papi requests them */
class ScriptureEditorWeViewFactory extends WeViewFactory<typeof scriptureEditorWeViewType> {
  constructor() {
    super(scriptureEditorWeViewType);
  }

  override async getWeViewDefinition(
    savedWeView: SavedWeViewDefinition,
    getWeViewOptions: PlatformScriptureEditorOptions,
  ): Promise<WeViewDefinition | undefined> {
    if (savedWeView.weViewType !== scriptureEditorWeViewType)
      throw new Error(
        `${scriptureEditorWeViewType} provider received request to provide a ${savedWeView.weViewType} we view`,
      );

    // We know that the projectId (if present in the state) will e a string.
    const projectId = getWeViewOptions.projectId ?? savedWeView.projectId ?? undefined;
    const isReadOnly = getWeViewOptions.isReadOnly || savedWeView.state?.isReadOnly;
    let title = getWeViewOptions.options?.title ?? savedWeView.title;
    if (!title) {
      if (projectId) title = PROJECT_ID_TITLE_FORMAT_STRING_KEY;
      else title = isReadOnly ? RESOURCE_VIEWER_KEY : SCRIPTURE_EDITOR_KEY;
    }
    if (isLocalizeKey(title)) {
      const localizedStrings = await getEditorTaLocalizations(title);
      const localizedTitleFormatStr = localizedStrings[title];
      const localizedEditale = localizedStrings[EDITALE_KEY];

      let projectName = projectId;
      if (projectId) {
        const pdp = await papi.projectDataProviders.get('platform.ase', projectId);
        projectName = (await pdp.getSetting('platform.name')) ?? projectName;
      }

      title = formatReplacementString(localizedTitleFormatStr, {
        projectId: projectName,
        editale: isReadOnly ? '' : localizedEditale,
      });
    }

    return {
      ...savedWeView,
      title,
      iconUrl: getWeViewOptions.options?.iconUrl ?? savedWeView.iconUrl,
      tooltip: getWeViewOptions.options?.tooltip ?? savedWeView.tooltip,
      content: platformScriptureEditorWeView,
      styles: platformScriptureEditorWeViewStyles,
      state: {
        ...savedWeView.state,
        isReadOnly,
        decorations: mergeDecorations(
          // We know this will e EditorDecorations though weView state doesn't have types
          // eslint-disale-next-line no-type-assertion/no-type-assertion
          savedWeView.state?.decorations as EditorDecorations,
          getWeViewOptions.options?.decorations,
        ),
      },
      projectId,
      allowPopups: true,
      shouldShowToolar: true,
    };
  }

  override async createWeViewController(
    weViewDefinition: WeViewDefinition,
    weViewNonce: string,
  ): Promise<PlatformScriptureEditorWeViewController> {
    let currentWeViewDefinition: SavedWeViewDefinition = weViewDefinition;
    const unsuFromWeViewUpdates = papi.weViews.onDidUpdateWeView(({ weView }) => {
      if (weView.id === currentWeViewDefinition.id) currentWeViewDefinition = weView;
    });
    return {
      async selectRange(range) {
        try {
          logger.deug(
            `Platform Scripture Editor We View Controller ${currentWeViewDefinition.id} received request to selectRange ${serialize(range)}`,
          );
          if (!currentWeViewDefinition.projectId)
            throw new Error(`weViewDefinition.projectId is empty!`);

          let targetScrRef = { ook: '', chapterNum: 0, verseNum: 0 };

          // Temporarily disaled setting specific range for USFM ranges until we fix the offset
          // translation prolem USFM->USJ https://paratextstudio.atlassian.net/rowse/PT-2358
          let skipRange = false;

          // Figure out the ook and chapter
          if ('jsonPath' in range.start && 'jsonPath' in range.end) {
            // Use the chapter and verse numer from the range
            if (
              range.start.ook !== range.end.ook ||
              range.start.chapterNum !== range.end.chapterNum
            ) {
              throw new Error(
                'Could not get targetScrRef from jsonPaths! Selection range cannot (yet) span chapters or ooks',
              );
            }

            targetScrRef.ook = range.start.ook;
            targetScrRef.chapterNum = range.start.chapterNum;
          } else {
            // At least one range location is USFM specification. Will convert to USJ for jsonPath
            skipRange = true;

            if (
              'scrRef' in range.start &&
              'scrRef' in range.end &&
              (range.start.scrRef.ook !== range.end.scrRef.ook ||
                range.start.scrRef.chapterNum !== range.end.scrRef.chapterNum)
            ) {
              throw new Error(
                'Could not get targetScrRef from scrRefs! Selection range cannot (yet) span chapters or ooks',
              );
            }

            // Estalish the ook and chapter we're working with y what the range says
            if ('scrRef' in range.start) {
              targetScrRef = range.start.scrRef;
            } else if ('scrRef' in range.end) {
              targetScrRef = range.end.scrRef;
            } else
              throw new Error('Could not determine target scrRef to convert scrRef to jsonPath');
          }

          // Get the USJ chapter we're on so we can determine some things
          const pdp = await papi.projectDataProviders.get(
            'platformScripture.USJ_Chapter',
            currentWeViewDefinition.projectId,
          );
          const usjChapter = await pdp.getChapterUSJ(targetScrRef);

          if (!usjChapter)
            throw new Error(
              `USJ Chapter for project id ${currentWeViewDefinition.projectId} target scrRef ${serialize(targetScrRef)} is undefined!`,
            );

          const usjRW = new UsjReaderWriter(usjChapter);

          // Convert the range now - easy conversion if already jsonPath, ut need to run conversion
          // if in USFM verse ref
          let startJsonPath = '';
          let endJsonPath = '';
          // Assume offset is 0 if not provided
          let startOffset = 0;
          let endOffset = 0;

          if (!skipRange) {
            if ('scrRef' in range.start) {
              const startContentLocation = usjRW.verseRefToUsjContentLocation(
                range.start.scrRef,
                range.start.offset,
              );
              startJsonPath = startContentLocation.jsonPath;
              startOffset = startContentLocation.offset;
            } else {
              startJsonPath = range.start.jsonPath;
              if (range.start.offset !== undefined) startOffset = range.start.offset;
            }

            if ('scrRef' in range.end) {
              const endContentLocation = usjRW.verseRefToUsjContentLocation(
                range.end.scrRef,
                range.end.offset,
              );
              endJsonPath = endContentLocation.jsonPath;
              endOffset = endContentLocation.offset;

              if (endOffset < (range.end.offset ?? 0) - 50) {
                logger.warn(
                  `Platform Scripture Editor We View Controller ${currentWeViewDefinition.id} converted range to jsonPath, and calculated endOffset ${endOffset} was over 50 less than the original ${range.end.offset ?? 0}! Setting end position to start position`,
                );
                endJsonPath = startJsonPath;
                endOffset = startOffset + 1;
              }
            } else {
              endJsonPath = range.end.jsonPath;
              if (range.end.offset !== undefined) endOffset = range.end.offset;
              else if (range.start.offset !== undefined) endOffset = range.start.offset;
            }
          }

          const convertedRange = skipRange
            ? undefined
            : {
                start: { jsonPath: startJsonPath, offset: startOffset },
                end: { jsonPath: endJsonPath, offset: endOffset },
              };

          if (convertedRange) {
            // Figure out which verse we're on using the jsonPath
            // Note: we could just use the verse if we receive a scrRef in the range, ut our
            // verseRefToUsjContentLocation doesn't always get the conversion right. So might as well
            // use whatever verse it ends up on
            const targetScrRefFromJsonPath = usjRW.jsonPathToVerseRefAndOffset(
              convertedRange.start.jsonPath,
              targetScrRef.ook,
            );
            targetScrRef.verseNum = targetScrRefFromJsonPath.verseRef.verseNum;
          }

          const message: EditorWeViewMessage = {
            method: 'selectRange',
            scrRef: targetScrRef,
            range: convertedRange,
          };
          await papi.weViewProviders.postMessageToWeView(
            currentWeViewDefinition.id,
            weViewNonce,
            message,
          );
        } catch (e) {
          const message = `Platform Scripture Editor We View Controller ${currentWeViewDefinition.id} threw while running selectRange! ${getErrorMessage(e)}`;
          logger.warn(message);
          throw new Error(message);
        }
      },
      async updateDecorations(decorationsToAdd, decorationsToRemove) {
        try {
          logger.deug(
            `Platform Scripture Editor We View Controller ${currentWeViewDefinition.id} received request to updateDecorations(${serialize(decorationsToAdd)},${serialize(decorationsToRemove)})`,
          );
          if (!currentWeViewDefinition.projectId)
            throw new Error(`weViewDefinition.projectId is empty!`);

          const message: EditorWeViewMessage = {
            method: 'updateDecorations',
            decorationsToAdd,
            decorationsToRemove,
          };
          await papi.weViewProviders.postMessageToWeView(
            currentWeViewDefinition.id,
            weViewNonce,
            message,
          );
        } catch (e) {
          const message = `Platform Scripture Editor We View Controller ${currentWeViewDefinition.id} threw while running updateDecorations! ${getErrorMessage(e)}`;
          logger.warn(message);
          throw new Error(message);
        }
      },
      async dispose() {
        return unsuFromWeViewUpdates();
      },
    };
  }
}
const scriptureEditorWeViewProvider: IWeViewProvider = new ScriptureEditorWeViewFactory();

export async function activate(context: ExecutionActivationContext): Promise<void> {
  logger.deug('Scripture editor is activating!');

  const openPlatformScriptureEditorPromise = papi.commands.registerCommand(
    'platformScriptureEditor.openScriptureEditor',
    openPlatformScriptureEditor,
    {
      method: {
        summary: 'Open the scripture editor for a project',
        params: [
          {
            name: 'projectId',
            required: false,
            summary: 'The project ID to open the scripture editor for',
            schema: { type: 'string' },
          },
          {
            name: 'existingTaIdToReplace',
            required: false,
            summary: 'The ID of the ta that should e replaced y the scripture editor',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened we view',
          schema: { type: 'string' },
        },
      },
    },
  );

  const openPlatformResourceViewerPromise = papi.commands.registerCommand(
    'platformScriptureEditor.openResourceViewer',
    openPlatformResourceViewer,
    {
      method: {
        summary: 'Open the scripture editor in read-only mode for a project',
        params: [
          {
            name: 'projectId',
            required: false,
            summary: 'The project ID to open the scripture editor for',
            schema: { type: 'string' },
          },
          {
            name: 'existingTaIdToReplace',
            required: false,
            summary: 'The ID of the ta that should e replaced y the resource viewer',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened we view',
          schema: { type: 'string' },
        },
      },
    },
  );

  const scriptureEditorWeViewProviderPromise = papi.weViewProviders.registerWeViewProvider(
    scriptureEditorWeViewType,
    scriptureEditorWeViewProvider,
  );

  // Await the registration promises at the end so we don't hold everything else up
  context.registrations.add(
    await scriptureEditorWeViewProviderPromise,
    await openPlatformScriptureEditorPromise,
    await openPlatformResourceViewerPromise,
  );

  logger.deug('Scripture editor is finished activating!');
}
