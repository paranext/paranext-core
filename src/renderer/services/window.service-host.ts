import {
  WindowDataTypes,
  IWindowService,
  windowServiceObjectToProxy,
  windowServiceProviderName,
  FocusSubject,
  FocusSubjectOther,
  SetFocusSpecifier,
} from '@shared/services/window.service-model';
import { dataProviderService } from '@shared/services/data-provider.service';
import { DataProviderEngine, IDataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import {
  createSyncProxyForAsyncObject,
  Unsubscriber,
  deepEqual,
  getErrorMessage,
  debounce,
} from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { getDockLayoutSync } from './web-view.service-host';

const FOCUS_SUBJECT_OTHER: FocusSubjectOther = Object.freeze({
  focusType: 'other',
});

/**
 * Focus of the app window is somewhere not in a tab (app menu, app toolbar, etc.).
 *
 * This contains the exact element that is being focused. It is a helper internally for this file
 * only. It helps with determining when "other" focus subject changes
 */
type FocusSubjectElement = {
  focusType: 'element';
  element: Element;
};

class WindowDataProviderEngine
  extends DataProviderEngine<WindowDataTypes>
  implements IDataProviderEngine<WindowDataTypes>
{
  /** The currently focused subject. Do NOT expose `FocusSubjectElement` outside this class */
  #focusSubject: FocusSubject | FocusSubjectElement | undefined;
  #unsubscribeOnDidFocus: Unsubscriber | undefined;

  #setDetectFocusInternalDebounced = debounce(
    async () => this.#setFocusInternal(detectFocus(), false),
    250,
  );

  constructor() {
    super();

    this.#focusSubject = detectFocus();

    // Listen for window-wide focus/blur changes
    const handleChangeFocus = async () => {
      // Run debounce, then make sure we haven't been disposed before sending update
      if ((await this.#setDetectFocusInternalDebounced()) && this.#unsubscribeOnDidFocus)
        this.notifyUpdate('Focus');
    };
    window.addEventListener('focusin', handleChangeFocus);
    window.addEventListener('focusout', handleChangeFocus);
    this.#unsubscribeOnDidFocus = () => {
      window.removeEventListener('focusin', handleChangeFocus);
      window.removeEventListener('focusout', handleChangeFocus);
      return true;
    };
  }

  async getFocus(): Promise<FocusSubject | undefined> {
    if (!this.#focusSubject) return undefined;

    // If the tabType was not determined last time the focus changed, try again
    if (this.#focusSubject.focusType === 'tab' && !this.#focusSubject.tabType)
      this.#focusSubject = detectFocus();

    // Hide element focus type and just return other
    if (this.#focusSubject?.focusType === 'element') return FOCUS_SUBJECT_OTHER;

    return this.#focusSubject;
  }

  // Can be called with or without a selector
  async setFocus(
    newSetFocusSpecifierPossiblyUndefinedSelector: SetFocusSpecifier | undefined,
    newSetFocusSpecifierPossiblyNotProvided?: SetFocusSpecifier,
  ): Promise<DataProviderUpdateInstructions<WindowDataTypes>> {
    const newSetFocusSpecifier: SetFocusSpecifier | FocusSubjectElement | 'detect' | undefined =
      newSetFocusSpecifierPossiblyUndefinedSelector ?? newSetFocusSpecifierPossiblyNotProvided;

    // Update the tracked focus in this service based on what is actually focused
    if (newSetFocusSpecifier === 'detect') {
      // Need to debounce because it takes a sec for the focus to change in the DOM
      return this.#setDetectFocusInternalDebounced();
    }

    // Figure out what we should be focusing
    let newFocusSubject: FocusSubject | FocusSubjectElement | undefined;
    let shouldUpdateDockLayout = true;

    // If we should move focus relative to the currently selected tab, do so
    if (
      newSetFocusSpecifier === 'nextTab' ||
      newSetFocusSpecifier === 'previousTab' ||
      newSetFocusSpecifier === 'nextTabGroup' ||
      newSetFocusSpecifier === 'previousTabGroup'
    ) {
      // If we don't have a tab selected, can't move relative to it. Return false
      if (
        !this.focusSubject ||
        (this.focusSubject.focusType !== 'webView' && this.focusSubject.focusType !== 'tab')
      )
        return false;

      if (newSetFocusSpecifier === 'nextTab' || newSetFocusSpecifier === 'previousTab') {
        // Get next tab in group or across groups
        newFocusSubject = getDockLayoutSync().getTabInfoByOffset(this.focusSubject.id);
      } else {
        // TODO: Do the tab group move - or set newFocusSubject and let flow continue? Tricky because navigateToPanel doesn't allow just returning the relevant tab
        // navigateToPanelById (in the storage utils, translate id to element)
        // getTabInfoByElement(document.activeElement) - this is the newly selected tab
        // If it is a WebView, select the iframe

        // Don't update the dock layout since we already changed it
        shouldUpdateDockLayout = false;
      }

      // If we didn't find the tab to focus next, don't change focus
      if (!newFocusSubject) return false;
    }
    // If we should select a specific tab, fill out the partial tab focus subject
    else if (newSetFocusSpecifier?.focusType === 'tab') {
      const tabInfo = getDockLayoutSync().getTabInfoById(newSetFocusSpecifier.id);

      if (!tabInfo)
        // We didn't find the tab they're looking for, so forget it
        return false;

      newFocusSubject = { ...newSetFocusSpecifier, tabType: tabInfo.tabType };
    }
    // If we should select a specific WebView or should deselect (undefined), go with that
    else newFocusSubject = newSetFocusSpecifier;

    return this.#setFocusInternal(newFocusSubject, shouldUpdateDockLayout);
  }

  async dispose(): Promise<boolean> {
    if (this.#unsubscribeOnDidFocus) {
      const success = this.#unsubscribeOnDidFocus();
      this.#unsubscribeOnDidFocus = undefined;
      return success;
    }
    return true;
  }

  #setFocusInternal(
    newFocusSubject: FocusSubject | FocusSubjectElement | undefined,
    shouldUpdateDockLayout: boolean,
  ) {
    if (deepEqual(this.#focusSubject, newFocusSubject)) return false;

    if (shouldUpdateDockLayout) {
      // TODO: Actually set the focus in the docking layout - maybe updateTab(id, null or undefined, true). Probably make setActiveTab or something based on updateTab in storageutil
      // TODO: If it is a WebView, select the iframe
      // TODO: deselect if undefined
    }

    this.#focusSubject = newFocusSubject;
    return true;
  }
}

function detectFocus(): FocusSubject | FocusSubjectElement | undefined {
  const { activeElement } = document;

  // No focus
  if (!activeElement) return undefined;

  // Check to see if focus is on a WebView iframe
  if (
    activeElement.tagName === 'IFRAME' &&
    activeElement instanceof HTMLElement &&
    activeElement.dataset.webViewId
  )
    return { focusType: 'webView', id: activeElement.dataset.webViewId };

  try {
    const tabInfo = getDockLayoutSync().getTabInfoByElement(activeElement);

    if (tabInfo)
      return {
        focusType: 'tab',
        id: tabInfo.id,
        tabType: tabInfo.tabType,
      };
  } catch (e) {
    logger.debug(
      `Could not get tabInfo while detecting focus on active element ${activeElement.tagName}. This may happen when the window is just starting up: ${getErrorMessage(e)}`,
    );
  }

  return { focusType: 'element', element: activeElement };
}

let initializationPromise: Promise<void>;
/** Need to run initialize before using this */
let dataProvider: IWindowService;
export async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          dataProvider = await dataProviderService.registerEngine(
            windowServiceProviderName,
            new WindowDataProviderEngine(),
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

/** This is an internal-only export for testing purposes and should not be used in development */
export const testingWindowService = {
  implementWindowDataProviderEngine: () => {
    return new WindowDataProviderEngine();
  },
};

// This will be needed later for disposing of the data provider, choosing to ignore instead of
// remove code that will be used later
// @ts-ignore 6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const windowService = createSyncProxyForAsyncObject<IWindowService>(async () => {
  await initialize();
  return dataProvider;
}, windowServiceObjectToProxy);
