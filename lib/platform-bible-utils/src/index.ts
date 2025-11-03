// Classes
export { AsyncVariable } from './promises/async-variable';
export { Collator } from './intl/intl-collator';
export { DateTimeFormat } from './intl/intl-date-time-format';
export { DocumentCombiner } from './document-combiner';
export { EventRollingTimeCounter } from './event-rolling-time-counter';
export { Mutex } from './promises/mutex';
export { MutexMap } from './promises/mutex-map';
export { NonValidatingDocumentCombiner } from './non-validating-document-combiner';
export { NumberFormat } from './intl/intl-number-format';
export { PlatformEventEmitter } from './events/platform-event-emitter.model';
export { PromiseChainingMap } from './promises/promise-chaining-map';
export { SortedNumberMap } from './sorted-number-map';
export { SortedSet } from './sorted-set';
export { UnsubscriberAsyncList } from './lifetime-management/unsubscriber-async-list';

// Consts
export { PLATFORM_ERROR_VERSION } from './platform-error';
export {
  getChaptersForBook,
  offsetBook,
  offsetChapter,
  offsetVerse,
  FIRST_SCR_BOOK_NUM,
  LAST_SCR_BOOK_NUM,
  FIRST_SCR_CHAPTER_NUM,
  FIRST_SCR_VERSE_NUM,
  getLocalizeKeyForScrollGroupId,
  getLocalizeKeysForScrollGroupIds,
  defaultScrRef,
} from './scripture/scripture-util';
export {
  aggregateUnsubscribers,
  aggregateUnsubscriberAsyncs,
} from './lifetime-management/unsubscriber';
export { CHAPTER_TYPE, VERSE_TYPE } from './scripture/usj-reader-writer.model';

// Enums
export { Section } from './scripture/scripture-util';

// Functions
export {
  createSyncProxyForAsyncObject,
  debounce,
  deepClone,
  getAllObjectFunctionNames,
  getErrorMessage,
  groupBy,
  isErrorMessageAboutParatextBlockingInternetAccess,
  isErrorMessageAboutRegistryAuthFailure,
  isString,
  newGuid,
  wait,
  waitForDuration,
} from './util';
export {
  getDefaultCallerSequence,
  getNthCaller,
  getFormatCallerFunction,
} from './scripture/footnote-util';
export {
  areUsjContentsEqualExceptWhitespace,
  compareScrRefs,
  formatScrRef,
  getLocalizedIdFromBookNumber,
  getSectionForBook,
  normalizeScriptureSpaces,
  scrRefToBBBCCC,
  scrRefToBBBCCCVVV,
} from './scripture/scripture-util';
export {
  at,
  charAt,
  codePointAt,
  endsWith,
  escapeStringRegexp,
  formatReplacementString,
  formatReplacementStringToArray,
  includes,
  indexOf,
  isLocalizeKey,
  isWhiteSpace,
  lastIndexOf,
  normalize,
  ordinalCompare,
  padEnd,
  padStart,
  slice,
  split,
  startsWith,
  stringLength,
  substring,
  toArray,
  toKebabCase,
  transformAndEnsureRegExpArray,
  transformAndEnsureRegExpRegExpArray,
} from './string-util';
export type { PaneSizeLimitsOptions } from './pane-utils';
export { getPaneSizeLimits } from './pane-utils';
export { newPlatformError, isPlatformError } from './platform-error';
export { default as deepEqual } from './equality-checking';
export { default as isSubset } from './subset-checking';
export { serialize, deserialize, isSerializable, htmlEncode } from './serialization';
export { default as getCurrentLocale } from './intl/intl-util';
export { default as formatBytes } from './number-utils';
export { default as ensureArray } from './array-util';
export { default as formatTimeSpan } from './date-time-format-util';
export { MODIFIER_KEYS } from './keyboard-util';

// Types
export type { DeepPartial, KebabCase, ReplaceType, UnionToIntersection } from './util';
export type {
  Dispose,
  OnDidDispose,
  CannotHaveOnDidDispose,
  CanHaveOnDidDispose,
} from './lifetime-management/disposal.model';
export type { PlatformError } from './platform-error';
export type {
  PlatformEventHandler,
  PlatformEvent,
  PlatformEventAsync,
} from './events/platform-event';
export type {
  BookInfo,
  ScrollGroupId,
  ScriptureNode,
  ScriptureSelection,
  ScriptureTextAnchor,
} from './scripture/scripture.model';
export type { Unsubscriber, UnsubscriberAsync } from './lifetime-management/unsubscriber';
export type { DocumentCombinerOptions, JsonDocumentLike } from './document-combiner';
export type {
  DateYYYYMMDD,
  LanguageStrings,
  LocalizedStringDataContribution,
  LocalizedStringDeprecationInfo,
  LocalizedStringValue,
  StringMetadata,
  StringsMetadata,
} from './extension-contributions/localized-strings.model';
export { localizedStringsDocumentSchema } from './extension-contributions/localized-strings.model';
export type {
  LocalizeKey,
  ReferencedItem,
  OrderedItem,
  OrderedExtensibleContainer,
  MenuItemBase,
  MenuItemContainingSubmenu,
  MenuItemContainingCommand,
  MenuGroupDetailsInColumn,
  MenuGroupDetailsInSubMenu,
  MenuColumnWithHeader,
  GroupsInSingleColumnMenu,
  GroupsInMultiColumnMenu,
  ColumnsWithHeaders,
  SingleColumnMenu,
  MultiColumnMenu,
  WebViewMenu,
  WebViewMenus,
  PlatformMenus,
  Localized,
} from './extension-contributions/menus.model';
export { menuDocumentSchema } from './extension-contributions/menus.model';
export type { DblResourceData, ResourceType } from './resources.model';
export type {
  ExtensionControlledProjectSetting,
  ExtensionControlledSetting,
  ExtensionControlledState,
  ModifierExtensionControlled,
  ModifierProject,
  ProjectSetting,
  ProjectSettingBase,
  ProjectSettingProperties,
  ProjectSettingsContribution,
  ProjectSettingsGroup,
  ProjectStateContribution,
  Setting,
  SettingBase,
  SettingProperties,
  SettingsContribution,
  SettingsGroup,
  StateBase,
  UserState,
  UserStateContribution,
} from './extension-contributions/settings.model';
export {
  projectSettingsDocumentSchema,
  settingsDocumentSchema,
} from './extension-contributions/settings.model';
export * from './extension-contributions/theme.model';
export * from './extension-contributions/theme.util';
export type {
  IUsjReaderWriter,
  UsjContentLocation,
  UsjSearchResult,
  VerseRefOffset,
} from './scripture/usj-reader-writer.model';
export { default as UsjReaderWriter } from './scripture/usj-reader-writer';
