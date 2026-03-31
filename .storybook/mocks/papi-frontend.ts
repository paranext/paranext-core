/* eslint-disable max-classes-per-file -- This file stubs multiple browser globals
(WebSocket, XMLHttpRequest) needed to mock the @papi/frontend module in Storybook */
export const logger = {
  warn: () => {},
  error: () => {},
  info: () => {},
  debug: () => {},
};

// No-op stubs for all other @papi/frontend named exports.
// Add implementations as stories require them.

export const fetch = async () => new Response();

// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- Stub class with no members;
// only the name is needed so Storybook can resolve the @papi/frontend WebSocket export without a
// real browser environment
export class WebSocket {}
// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- Same as WebSocket above: stub
// with no members, exported only to satisfy the @papi/frontend module shape in Storybook
export class XMLHttpRequest {}

export const app = {};
export const commands = {};
export const webViews = {};
export const dialogs = {};
export const network = {};
export const networkObjects = {};
export const networkObjectStatus = {};
export const internet = { fetch };
export const dataProviders = {};
export const projectDataProviders = {};
export const projectLookup = {};
export const settings = {};
export const themes = {};
export const menuData = {};
export const scrollGroups = {};
export const localization = {};
export const notifications = {};
export const window = {};

export const react = {
  useDataProvider: () => undefined,
  useData: () => [undefined, () => {}, false],
  useScrollGroupScrRef: () => [undefined, () => {}],
  useSetting: () => [undefined, () => {}, false],
  useProjectData: () => [undefined, () => {}, false],
  useProjectDataProvider: () => undefined,
  useProjectSetting: () => [undefined, () => {}, false],
  useDialogCallback: () => [() => {}, false],
  useDataProviderMulti: () => undefined,
  useLocalizedStrings: () => [undefined, false],
  useWebViewController: () => undefined,
  useRecentScriptureRefs: () => [[], () => {}],
};

const papi = {
  fetch,
  WebSocket,
  XMLHttpRequest,
  app,
  commands,
  webViews,
  dialogs,
  network,
  networkObjects,
  networkObjectStatus,
  logger,
  internet,
  dataProviders,
  projectDataProviders,
  projectLookup,
  react,
  settings,
  themes,
  menuData,
  scrollGroups,
  localization,
  notifications,
  window,
};

export default papi;
