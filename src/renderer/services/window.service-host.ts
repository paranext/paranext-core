import {
  WindowDataTypes,
  IWindowService,
  windowServiceObjectToProxy,
  windowServiceProviderName,
  FocusSubject,
  FocusSubjectOther,
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
import { getDockLayout } from './web-view.service-host';

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
  /**
   * Getting the focusSubject is async. We are firing off a promise to get it in the constructor,
   * and this tracks that promise. If `undefined`, the work is finished, and #focusSubject can be
   * used freely
   */
  #focusSubjectInitialPromise: Promise<void> | undefined;
  #unsubscribeOnDidFocus: Unsubscriber | undefined;

  #setDetectFocusInternalDebounced = debounce(
    async () => this.#setFocusInternal(await detectFocus()),
    250,
  );

  constructor() {
    super();

    this.#focusSubjectInitialPromise = (async () => {
      this.#setFocusInternal(await detectFocus());
    })();

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
    // Wait for first retrieval of #focusSubject
    if (this.#focusSubjectInitialPromise) await this.#focusSubjectInitialPromise;

    if (!this.#focusSubject) return undefined;

    // Hide element focus type and just return other
    if (this.#focusSubject?.focusType === 'element') return FOCUS_SUBJECT_OTHER;

    return this.#focusSubject;
  }

  // Can be called with or without a selector
  async setFocus(
    newFocusSubjectPossiblyUndefinedSelector: FocusSubject | undefined,
    newFocusSubjectPossiblyNotProvided?: FocusSubject | 'detect',
  ): Promise<DataProviderUpdateInstructions<WindowDataTypes>> {
    const newFocusSubject: FocusSubject | FocusSubjectElement | 'detect' | undefined =
      newFocusSubjectPossiblyUndefinedSelector ?? newFocusSubjectPossiblyNotProvided;

    if (newFocusSubject === 'detect') {
      // Need to debounce because it takes a sec for the focus to change in the DOM
      return this.#setDetectFocusInternalDebounced();
    }

    throw new Error('setFocus with anything other than `detect` is not yet supported');

    // return this.#setFocusInternal(newFocusSubject);
  }

  async dispose(): Promise<boolean> {
    if (this.#unsubscribeOnDidFocus) {
      const success = this.#unsubscribeOnDidFocus();
      this.#unsubscribeOnDidFocus = undefined;
      return success;
    }
    return true;
  }

  #setFocusInternal(newFocusSubject: FocusSubject | FocusSubjectElement | undefined) {
    if (deepEqual(this.#focusSubject, newFocusSubject)) return false;

    this.#focusSubject = newFocusSubject;
    return true;
  }
}

async function detectFocus(): Promise<FocusSubject | FocusSubjectElement | undefined> {
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
    const tabInfo = (await getDockLayout()).getTabInfoByElement(activeElement);

    if (tabInfo)
      return {
        focusType: 'tab',
        id: tabInfo.id,
        tabType: tabInfo.tabType,
      };
  } catch (e) {
    throw new Error(
      `Could not find tabInfo for existing tab while detecting focus on active element ${activeElement.tagName}: ${getErrorMessage(e)}`,
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
