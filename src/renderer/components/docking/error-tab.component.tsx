import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import { LocalizeKey, newGuid } from 'platform-bible-utils';

export type ErrorTabData = { errorMessage: string };

export const TAB_TYPE_ERROR = 'error';

export function ErrorTab({ errorMessage }: { errorMessage: string }) {
  return (
    <>
      <div>
        Content could not be loaded. Please make sure you have the correct extension loaded.
      </div>
      <div>Message: {errorMessage}</div>
    </>
  );
}

const localizeError: LocalizeKey = '%tab_title_error%';

/** Creates a new error message tab with the specified error message */
export const createErrorTab = (errorMessage: string): TabInfo => {
  return {
    id: newGuid(),
    tabType: 'error',
    tabTitle: localizeError,
    content: <ErrorTab errorMessage={errorMessage} />,
    minWidth: 150,
    minHeight: 150,
    // Assert the more specific type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    data: {
      errorMessage,
    } as ErrorTabData,
  };
};

export function saveErrorTab(): SavedTabInfo | undefined {
  // No need to preserve error tabs between refreshes, I imagine
  return undefined;
}

export default ErrorTab;
