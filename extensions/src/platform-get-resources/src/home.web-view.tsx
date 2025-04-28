import papi, { logger } from '@papi/frontend';
import { useData, useDataProvider, useLocalizedStrings, useSetting } from '@papi/frontend/react';
import { HomeDialog } from 'platform-bible-react';

globalThis.webViewComponent = HomeDialog({
  useLocalizedStrings: useLocalizedStrings,
  useDataProvider: useDataProvider,
  useData: useData,
  papi: papi,
  logger: logger,
  useSetting: useSetting,
});
