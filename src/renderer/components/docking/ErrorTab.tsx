import { TabInfo } from '@shared/data/WebViewTypes';

function ErrorTab({ errorMessage }: { errorMessage: string }) {
  return (
    <>
      <div>
        Content could not be loaded. Please make sure you have the correct
        extension loaded.
      </div>
      <div>Message: {errorMessage}</div>
    </>
  );
}

/**
 * Creates a new error message tab with the specified error message
 */
const createErrorTab = (errorMessage: string): TabInfo => {
  return {
    type: 'error',
    title: 'Error',
    content: <ErrorTab errorMessage={errorMessage} />,
    minWidth: 150,
    minHeight: 150,
  };
};

export default createErrorTab;
