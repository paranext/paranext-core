/**
 * === NEW IN PT10 === Reason: Web view providers don't exist in PT9's WinForms architecture. Maps
 * to: UI-PKG-006
 */

import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import copyBooksWebView from './copy-books.web-view?inline';
import tailwindStyles from './tailwind.css?inline';
import { ProjectType } from './project-properties.utils';

export const copyBooksWebViewType = 'platformProjects.copyBooks';

// ============================================================================
// INTERFACES
// ============================================================================

/** Project reference for copy books form */
export interface CopyBooksProjectReference {
  guid: string;
  shortName: string;
  fullName: string;
  projectType: ProjectType;
  booksPresent: string[];
  editable: boolean;
}

/** Book copy information for the grid */
export interface BookCopyInfo {
  bookId: string;
  bookName: string;
  sourceStatus: 'Present' | 'NotPresent';
  destStatus: 'Present' | 'NotPresent' | 'PresentOlder' | 'PresentNewer' | 'PresentSame';
  isCopyable: boolean;
}

/** Options for opening the Copy Books web view */
export interface CopyBooksWebViewOptions extends OpenWebViewOptions {
  /** Available projects for selection */
  availableProjects?: CopyBooksProjectReference[];
  /** Pre-selected source project GUID */
  preSelectedFromProject?: string;
  /** Pre-selected destination project GUID */
  preSelectedToProject?: string;
}

/** Default empty projects list */
const defaultProjects: CopyBooksProjectReference[] = [];

// ============================================================================
// PROJECT FILTERING LOGIC (EXT-008)
// ============================================================================

/**
 * Filter compatible destination projects based on source project type. PT9 Source:
 * CopyBooksForm.cs:533-610 LoadToComboboxOptions()
 *
 * @param fromProject - The selected source project
 * @param allProjects - All available projects
 * @returns Filtered list of compatible destination projects
 */
export function filterDestinationProjects(
  fromProject: CopyBooksProjectReference,
  allProjects: CopyBooksProjectReference[],
): CopyBooksProjectReference[] {
  return allProjects.filter((project) => {
    // Cannot copy to self
    if (project.guid === fromProject.guid) return false;

    // Must be editable
    if (!project.editable) return false;

    // Type compatibility rules
    switch (fromProject.projectType) {
      case 'Standard':
      case 'Daughter':
      case 'BackTranslation':
        // Can copy to Standard, Daughter, BackTranslation
        return ['Standard', 'Daughter', 'BackTranslation'].includes(project.projectType);

      case 'StudyBibleAdditions':
        // Cannot create new project from Study Bible (BHV-606)
        // Can only copy to same Study Bible base
        return false;

      case 'Auxiliary':
      case 'TransliterationManual':
        // Can copy to same type
        return project.projectType === fromProject.projectType;

      case 'TransliterationWithEncoder':
        // Cannot copy from encoder-based transliteration
        return false;

      case 'ConsultantNotes':
        // Can copy to ConsultantNotes only
        return project.projectType === 'ConsultantNotes';

      default:
        return false;
    }
  });
}

// ============================================================================
// WEB VIEW PROVIDER
// ============================================================================

/** Web view provider for the Copy Books form */
export class CopyBooksWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: CopyBooksWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    // Get values from options or saved state
    const availableProjects =
      getWebViewOptions.availableProjects ||
      savedWebView.state?.availableProjects ||
      defaultProjects;

    const preSelectedFromProject =
      getWebViewOptions.preSelectedFromProject ||
      savedWebView.state?.preSelectedFromProject ||
      undefined;

    const preSelectedToProject =
      getWebViewOptions.preSelectedToProject ||
      savedWebView.state?.preSelectedToProject ||
      undefined;

    // Get localized title
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%webView_copyBooks_title%',
      locales: ['en'],
    });

    return {
      ...savedWebView,
      title: title || 'Copy Books',
      content: copyBooksWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        availableProjects,
        preSelectedFromProject,
        preSelectedToProject,
      },
    };
  }
}

export default CopyBooksWebViewProvider;
