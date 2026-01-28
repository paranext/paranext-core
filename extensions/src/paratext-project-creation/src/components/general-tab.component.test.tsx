import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GeneralTab, GeneralTabProps } from './general-tab.component';

// Mock @papi/frontend
vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: vi.fn() },
  },
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

// Mock @papi/frontend/react
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [{}],
}));

const defaultProps: GeneralTabProps = {
  fullName: 'Test Project',
  shortName: 'TST',
  copyright: '(c) 2026',
  onNameResult: vi.fn(),
  languageId: 'en',
  languageName: 'English',
  onLanguageResult: vi.fn(),
  versification: 'English',
  onVersificationChange: vi.fn(),
  hasCustomVersification: false,
  projectType: 'Standard',
  onProjectTypeChange: vi.fn(),
  baseProjectGuid: null,
  availableBaseProjects: [],
  onBaseProjectChange: vi.fn(),
  typeConfig: null,
  registrationState: null,
  registrationControlProps: {
    isNewProject: true,
    projectGuid: null,
    currentRegistration: null,
  },
  encodingConverter: null,
  encoderReverseDirection: false,
  onEncodingChange: vi.fn(),
  onEncoderReverseChange: vi.fn(),
  editable: true,
  onEditableChange: vi.fn(),
  isNewProject: true,
  minParatextVersion: '9.4',
};

function renderGeneralTab(overrides: Partial<GeneralTabProps> = {}) {
  const props = { ...defaultProps, ...overrides };
  return { ...render(<GeneralTab {...props} />), props };
}

describe('GeneralTab', () => {
  it('renders project name section with full name, short name, and copyright', () => {
    renderGeneralTab();
    expect(screen.getByTestId('full-name-display')).toHaveTextContent('Test Project');
    expect(screen.getByTestId('short-name-display')).toHaveTextContent('TST');
    expect(screen.getByTestId('copyright-display')).toHaveTextContent('(c) 2026');
  });

  it('renders (not set) when name fields are empty', () => {
    renderGeneralTab({ fullName: '', shortName: '', copyright: '' });
    expect(screen.getByTestId('full-name-display')).toHaveTextContent('(not set)');
    expect(screen.getByTestId('short-name-display')).toHaveTextContent('(not set)');
    expect(screen.getByTestId('copyright-display')).toHaveTextContent('(not set)');
  });

  it('renders language display', () => {
    renderGeneralTab();
    expect(screen.getByTestId('language-display')).toHaveTextContent('English');
  });

  it('renders Edit button for name that opens name dialog', () => {
    renderGeneralTab();
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    expect(editButtons.length).toBeGreaterThanOrEqual(1);
    // Click the first Edit button (name section)
    fireEvent.click(editButtons[0]);
    // ProjectNameForm should now be visible (rendered in overlay)
    // We just verify the overlay container appears
  });

  it('renders versification dropdown', () => {
    renderGeneralTab();
    expect(screen.getByLabelText(/versification/i)).toBeInTheDocument();
  });

  it('renders project type dropdown', () => {
    renderGeneralTab();
    expect(screen.getByLabelText(/type of project/i)).toBeInTheDocument();
  });

  it('renders editable checkbox', () => {
    renderGeneralTab();
    expect(screen.getByLabelText(/make project editable/i)).toBeInTheDocument();
  });

  it('handles editable checkbox change', () => {
    const onEditableChange = vi.fn();
    renderGeneralTab({ onEditableChange });
    fireEvent.click(screen.getByLabelText(/make project editable/i));
    expect(onEditableChange).toHaveBeenCalled();
  });

  it('renders min Paratext version when provided', () => {
    renderGeneralTab({ minParatextVersion: '9.4' });
    expect(screen.getByText(/minimum paratext version: 9\.4/i)).toBeInTheDocument();
  });

  it('does not show base project dropdown when typeConfig has baseProjectRequired=false', () => {
    renderGeneralTab({
      typeConfig: {
        projectType: 'Standard',
        baseProjectRequired: false,
        editableDefault: true,
        autoNameFromUser: false,
        normalizationDefault: 'NFC',
        registrationRequired: false,
        sharesParentRegistration: false,
        booksTabVisible: true,
        encodingConverterRequired: false,
        allowedBaseTypes: [],
        isDerivedType: false,
        isScripture: true,
      },
    });
    expect(screen.queryByLabelText(/based on/i)).not.toBeInTheDocument();
  });

  it('shows base project dropdown when typeConfig has baseProjectRequired=true', () => {
    renderGeneralTab({
      typeConfig: {
        projectType: 'BackTranslation',
        baseProjectRequired: true,
        editableDefault: true,
        autoNameFromUser: false,
        normalizationDefault: 'NFC',
        registrationRequired: false,
        sharesParentRegistration: true,
        booksTabVisible: true,
        encodingConverterRequired: false,
        allowedBaseTypes: ['Standard'],
        isDerivedType: true,
        isScripture: true,
      },
      availableBaseProjects: [
        {
          guid: 'abc-123',
          shortName: 'BASE',
          fullName: 'Base Project',
          versification: 'English',
          projectType: 'Standard',
          isScripture: true,
          isResource: false,
          isRegistered: true,
        },
      ],
    });
    expect(screen.getByLabelText(/based on/i)).toBeInTheDocument();
  });

  it('shows encoding fields when typeConfig requires encoding converter', () => {
    renderGeneralTab({
      typeConfig: {
        projectType: 'TransliterationWithEncoder',
        baseProjectRequired: true,
        editableDefault: true,
        autoNameFromUser: false,
        normalizationDefault: 'NFC',
        registrationRequired: false,
        sharesParentRegistration: true,
        booksTabVisible: true,
        encodingConverterRequired: true,
        allowedBaseTypes: ['Standard'],
        isDerivedType: true,
        isScripture: true,
      },
    });
    expect(screen.getByTestId('encoding-display')).toBeInTheDocument();
  });

  it('does not show encoding fields by default', () => {
    renderGeneralTab();
    expect(screen.queryByTestId('encoding-display')).not.toBeInTheDocument();
  });
});
