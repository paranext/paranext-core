/**
 * === NEW IN PT10 === Reason: Module entry point for manage-books UI components Maps to: UI-PKG-001
 * through UI-PKG-006
 */

// BookChooser exports
export {
  BookChooserWebViewProvider,
  BOOK_CHOOSER_WEB_VIEW_TYPE,
  type BookChooserWebViewOptions,
} from './book-chooser.web-view-provider';

export {
  BOOK_CHOOSER_LOCALIZED_STRINGS,
  CANON_RANGES,
  filterBooksByRange,
  getBooksNotInBase,
  getQuickSelectButtonStates,
  isDeuterocanon,
  isExtraMaterial,
  isNewTestament,
  isOldTestament,
} from './book-chooser.utils';

export type { BookChooserInput, BookChooserOutput } from './book-chooser.web-view';

// CreateBooks exports
export {
  CreateBooksWebViewProvider,
  CREATE_BOOKS_WEB_VIEW_TYPE,
  type CreateBooksWebViewOptions,
} from './create-books.web-view-provider';

export {
  CREATE_BOOKS_LOCALIZED_STRINGS,
  getInitialCreationMode,
  getSelectedBooksDisplayText,
  isSBAProject,
} from './create-books.utils';

export type {
  BookCreationMode,
  CreateBooksInput,
  CreateBooksOutput,
  CreateBooksFormState,
  CreateBooksRequest,
  CreateBooksResult,
  ModelProjectOption,
  ModelValidationResult,
  VersificationCheckResult,
} from './create-books.utils';

// CopyBooks exports
export {
  CopyBooksWebViewProvider,
  COPY_BOOKS_WEB_VIEW_TYPE,
  type CopyBooksWebViewOptions,
  registerCopyBooksWebViewProvider,
  registerCopyBooksCommand,
  openCopyBooksDialog,
} from './copy-books.web-view-provider';

export {
  COPY_BOOKS_LOCALIZED_STRINGS,
  filterCompatibleTargets,
  getAllowedTargetTypes,
  getPreselection,
  isCompatibleProjectType,
  toBookComparison,
  formatBookDisplay,
  initializeSelectedBooks,
} from './copy-books.utils';

export type {
  BookComparison,
  BookComparisonInfo,
  BookComparisonResult,
  BookInfo,
  BookOperationResult,
  ComparisonState,
  CopyBooksInput,
  CopyBooksOutput,
  CopyBooksRequest,
  CopyError,
  CopyProjectOption,
  ProjectInfoSummary,
  ProjectType,
} from './copy-books.utils';

// ShowBooks exports
export {
  ShowBooksWebViewProvider,
  SHOW_BOOKS_WEB_VIEW_TYPE,
  type ShowBooksWebViewOptions,
  registerShowBooksWebViewProvider,
  registerShowBooksCommand,
  openShowBooksDialog,
} from './show-books.web-view-provider';

export type { ShowBooksInput, ShowBooksOutput } from './show-books.web-view';

// DeleteBooks exports
export {
  DeleteBooksWebViewProvider,
  DELETE_BOOKS_WEB_VIEW_TYPE,
  type DeleteBooksWebViewOptions,
  registerDeleteBooksWebViewProvider,
  registerDeleteBooksCommand,
  openDeleteBooksDialog,
} from './delete-books.web-view-provider';

export {
  DELETE_BOOKS_LOCALIZED_STRINGS,
  formatBooksDisplay,
  formatString,
  getBookName,
  getBookRange,
  isNonCanonical,
  isStudyBibleAdditions,
} from './delete-books.utils';

export type {
  DeleteBooksFormState,
  DeleteBooksInput,
  DeleteBooksOutput,
  DeleteProjectOption,
} from './delete-books.utils';

// ImportBooks exports
export {
  ImportBooksWebViewProvider,
  IMPORT_BOOKS_WEB_VIEW_TYPE,
  type ImportBooksWebViewOptions,
  registerImportBooksWebViewProvider,
  registerImportBooksCommand,
  openImportBooksDialog,
} from './import-books.web-view-provider';

export {
  IMPORT_BOOKS_LOCALIZED_STRINGS,
  buildImportRequest,
  extractFileName,
  formatBookDisplay as formatImportBookDisplay,
  formatDuplicateError,
  formatSourceDisplay,
  initializeSelectedFiles,
  isUsxFile,
  mapImportComparisonState,
  overlappingFilesFound,
  toImportFileInfo,
} from './import-books.utils';

export type {
  BookOperationResult as ImportBookOperationResult,
  DuplicateError,
  ExistingBookInfo,
  FileImportData,
  ImportBooksInput,
  ImportBooksOutput,
  ImportBooksRequest,
  ImportComparisonState,
  ImportError,
  ImportFileInfo,
  ImportValidationResult,
  ParsedBookContent,
  ValidatedFileInfo,
} from './import-books.utils';
