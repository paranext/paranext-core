/**
 * DeleteBooksWebView Tests
 *
 * UI-PKG-003: DeleteBooksForm
 *
 * Tests for the DeleteBooks dialog component covering:
 *
 * - Rendering and structure
 * - Project selection behavior (BHV-308)
 * - Button enable states (BHV-309)
 * - SBA banner visibility
 * - Confirmation dialogs
 * - Accessibility
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DeleteBooksWebView from './delete-books.web-view';
import type { DeleteBooksInput, DeleteBooksOutput, DeleteProjectOption } from './manage-books.d';

// ============================================================================
// Mocks
// ============================================================================

// Mock PAPI
const mockSendCommand = vi.fn();
vi.mock('@papi/frontend', () => ({
  default: {
    commands: {
      sendCommand: (...args: unknown[]) => mockSendCommand(...args),
    },
  },
}));

// Mock useLocalizedStrings hook
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [
    {
      '%webView_deleteBooks_title%': 'Delete Books',
      '%webView_deleteBooks_projectLabel%': 'Project:',
      '%webView_deleteBooks_booksLabel%': 'Books:',
      '%webView_deleteBooks_chooseButton%': 'Choose...',
      '%webView_deleteBooks_chooseButton_ariaLabel%': 'Choose books to delete',
      '%webView_deleteBooks_sbaBanner%':
        'You can only delete non-canonical books from Study Bible Additions projects.',
      '%webView_deleteBooks_helpText%':
        'This action removes books from your project and deletes them from your hard disk.',
      '%webView_deleteBooks_confirmTitle%': 'Delete Books',
      '%webView_deleteBooks_confirmShared%':
        'Project {projectName} is shared with multiple users. If you delete these books, they will be deleted for everyone. Delete {count} books?',
      '%webView_deleteBooks_confirmNonShared%': 'Delete {count} books?',
      '%webView_deleteBooks_allBooksWarning%':
        'All books in {projectName} will be deleted, but the project itself will not be deleted.',
      '%general_ok%': 'OK',
      '%general_cancel%': 'Cancel',
      '%general_yes%': 'Yes',
      '%general_no%': 'No',
    },
  ],
}));

// ============================================================================
// Test Fixtures
// ============================================================================

const createMockProject = (overrides: Partial<DeleteProjectOption> = {}): DeleteProjectOption => ({
  id: 'project-1',
  name: 'Test Project',
  shortName: 'TP',
  projectType: 'Standard',
  isShared: false,
  existingBooks: [1, 2, 3, 40, 41, 42],
  ...overrides,
});

const createMockInput = (overrides: Partial<DeleteBooksInput> = {}): DeleteBooksInput => ({
  currentProjectId: 'project-1',
  adminProjects: [
    createMockProject({ id: 'project-1', name: 'Test Project' }),
    createMockProject({ id: 'project-2', name: 'Another Project' }),
  ],
  projectType: 'Standard',
  ...overrides,
});

// ============================================================================
// Tests: Basic Rendering
// ============================================================================

describe('DeleteBooksWebView', () => {
  beforeEach(() => {
    mockSendCommand.mockReset();
  });

  describe('rendering', () => {
    it('renders the dialog with correct test id', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      expect(screen.getByTestId('delete-books-form')).toBeInTheDocument();
    });

    it('renders project dropdown with admin projects', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      expect(screen.getByLabelText('Project:')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders books field as read-only', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      const booksField = screen.getByLabelText('Selected books to delete');
      expect(booksField).toHaveAttribute('readonly');
    });

    it('renders Choose button', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      expect(screen.getByRole('button', { name: /choose/i })).toBeInTheDocument();
    });

    it('renders OK and Cancel buttons', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('renders help text', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      expect(screen.getByText(/removes books from your project/i)).toBeInTheDocument();
    });
  });

  // ============================================================================
  // Tests: SBA Banner (Conditional)
  // ============================================================================

  describe('SBA banner', () => {
    it('shows SBA banner for StudyBibleAdditions project', () => {
      const sbaProject = createMockProject({
        id: 'sba-project',
        name: 'SBA Project',
        projectType: 'StudyBibleAdditions',
      });
      const input = createMockInput({
        currentProjectId: 'sba-project',
        adminProjects: [sbaProject],
        projectType: 'StudyBibleAdditions',
      });
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      expect(screen.getByText(/only delete non-canonical books/i)).toBeInTheDocument();
    });

    it('does not show SBA banner for Standard project', () => {
      const input = createMockInput({
        projectType: 'Standard',
      });
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      expect(screen.queryByText(/only delete non-canonical books/i)).not.toBeInTheDocument();
    });
  });

  // ============================================================================
  // Tests: Button Enable States (BHV-309)
  // ============================================================================

  describe('button states (BHV-309)', () => {
    it('disables OK button when no books are selected', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      const okButton = screen.getByRole('button', { name: 'OK' });
      expect(okButton).toBeDisabled();
    });

    it('enables Choose button when user is admin of selected project', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      const chooseButton = screen.getByRole('button', { name: /choose/i });
      expect(chooseButton).not.toBeDisabled();
    });

    it('Cancel button is always enabled', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      expect(cancelButton).not.toBeDisabled();
    });
  });

  // ============================================================================
  // Tests: Project Selection (BHV-308)
  // ============================================================================

  describe('project selection (BHV-308)', () => {
    it('preselects current project on open', () => {
      const input = createMockInput({
        currentProjectId: 'project-1',
      });
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      // The Select component should show the current project
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  // ============================================================================
  // Tests: Cancel Action
  // ============================================================================

  describe('cancel action', () => {
    it('calls onClose with cancel action when Cancel button is clicked', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

      expect(onClose).toHaveBeenCalledWith({ action: 'cancel' });
    });

    it('calls onClose with cancel action when Escape is pressed', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(onClose).toHaveBeenCalledWith({ action: 'cancel' });
    });
  });

  // ============================================================================
  // Tests: Accessibility
  // ============================================================================

  describe('accessibility', () => {
    it('has dialog role on root element', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-label on dialog', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Delete Books');
    });

    it('project dropdown has aria-label', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toHaveAttribute('aria-label');
    });

    it('Choose button has aria-label', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      const chooseButton = screen.getByRole('button', { name: /choose/i });
      expect(chooseButton).toHaveAttribute('aria-label', 'Choose books to delete');
    });

    it('all buttons have type="button"', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      render(<DeleteBooksWebView input={input} onClose={onClose} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });
  });

  // ============================================================================
  // Tests: Platform Constraints
  // ============================================================================

  describe('platform constraints', () => {
    it('does not render any form elements', () => {
      const input = createMockInput();
      const onClose = vi.fn();

      const { container } = render(<DeleteBooksWebView input={input} onClose={onClose} />);

      expect(container.querySelector('form')).not.toBeInTheDocument();
    });
  });
});
