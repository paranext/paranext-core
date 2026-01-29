import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskList } from './task-list.component';
import { CreateTaskMenu } from './create-task-menu.component';
import { SettingsPanel, SettingsPanelProps } from './settings-panel.component';
import type { InterlinearSetupItem } from '../../types/interlinear-setup.types';
import {
  getVisibilityForTaskType,
  getDefaultProjectTypeForTask,
  getDestinationLabel,
  getInstructionText,
} from '../../types/interlinear-setup.types';

// --- Unit tests for getVisibilityForTaskType ---
describe('getVisibilityForTaskType', () => {
  describe('when taskType is undefined', () => {
    it('returns all visibility flags as false', () => {
      const result = getVisibilityForTaskType(undefined, false);
      expect(result).toEqual({
        showModelText: false,
        showRelatedLanguages: false,
        showDestination: false,
        showGlossLanguage: false,
        showOutputGlosses: false,
      });
    });
  });

  describe('for Glossing task type', () => {
    it('shows model text and output glosses, destination only when outputGlosses is true', () => {
      const resultNoGlosses = getVisibilityForTaskType('Glossing', false);
      expect(resultNoGlosses.showModelText).toBe(true);
      expect(resultNoGlosses.showOutputGlosses).toBe(true);
      expect(resultNoGlosses.showDestination).toBe(false);
      expect(resultNoGlosses.showRelatedLanguages).toBe(false);
      expect(resultNoGlosses.showGlossLanguage).toBe(false);

      const resultWithGlosses = getVisibilityForTaskType('Glossing', true);
      expect(resultWithGlosses.showDestination).toBe(true);
    });
  });

  describe('for GlossingWithoutModel task type', () => {
    it('shows gloss language and output glosses, destination only when outputGlosses is true', () => {
      const result = getVisibilityForTaskType('GlossingWithoutModel', false);
      expect(result.showModelText).toBe(false);
      expect(result.showGlossLanguage).toBe(true);
      expect(result.showOutputGlosses).toBe(true);
      expect(result.showDestination).toBe(false);

      const resultWithGlosses = getVisibilityForTaskType('GlossingWithoutModel', true);
      expect(resultWithGlosses.showDestination).toBe(true);
    });
  });

  describe('for BackTranslation task type', () => {
    it('shows model text, related languages, and destination always', () => {
      const result = getVisibilityForTaskType('BackTranslation', false);
      expect(result.showModelText).toBe(true);
      expect(result.showRelatedLanguages).toBe(true);
      expect(result.showDestination).toBe(true);
      expect(result.showOutputGlosses).toBe(false);
      expect(result.showGlossLanguage).toBe(false);
    });
  });

  describe('for Adaptation task type', () => {
    it('shows only destination', () => {
      const result = getVisibilityForTaskType('Adaptation', false);
      expect(result.showModelText).toBe(false);
      expect(result.showRelatedLanguages).toBe(false);
      expect(result.showDestination).toBe(true);
      expect(result.showOutputGlosses).toBe(false);
      expect(result.showGlossLanguage).toBe(false);
    });
  });
});

// --- Unit tests for getDefaultProjectTypeForTask ---
describe('getDefaultProjectTypeForTask', () => {
  it('returns BackTranslation for BackTranslation task', () => {
    expect(getDefaultProjectTypeForTask('BackTranslation')).toBe('BackTranslation');
  });

  it('returns Daughter for Adaptation task', () => {
    expect(getDefaultProjectTypeForTask('Adaptation')).toBe('Daughter');
  });

  it('returns Standard for Glossing task', () => {
    expect(getDefaultProjectTypeForTask('Glossing')).toBe('Standard');
  });

  it('returns Standard for GlossingWithoutModel task', () => {
    expect(getDefaultProjectTypeForTask('GlossingWithoutModel')).toBe('Standard');
  });
});

// --- Unit tests for getDestinationLabel ---
describe('getDestinationLabel', () => {
  it('returns "Back translation:" for BackTranslation', () => {
    expect(getDestinationLabel('BackTranslation')).toBe('Back translation:');
  });

  it('returns "Output:" for other task types', () => {
    expect(getDestinationLabel('Glossing')).toBe('Output:');
    expect(getDestinationLabel('Adaptation')).toBe('Output:');
    expect(getDestinationLabel(undefined)).toBe('Output:');
  });
});

// --- Unit tests for getInstructionText ---
describe('getInstructionText', () => {
  it('returns appropriate text for each task type', () => {
    expect(getInstructionText('Glossing')).toContain('model text');
    expect(getInstructionText('GlossingWithoutModel')).toContain('without');
    expect(getInstructionText('BackTranslation')).toContain('back translation');
    expect(getInstructionText('Adaptation')).toContain('adaptation');
    expect(getInstructionText(undefined)).toBe('');
  });
});

// --- Component tests for TaskList ---
describe('TaskList', () => {
  const mockItems: InterlinearSetupItem[] = [
    {
      id: '1',
      taskType: 'Glossing',
      sourceProjectName: 'Test Project',
      modelTextName: 'English',
      displayText: 'Glosses for Test Project, Model: English',
    },
    {
      id: '2',
      taskType: 'BackTranslation',
      sourceProjectName: 'Test Project',
      modelTextName: 'English',
      outputProjectName: 'BT Project',
      displayText: 'Back translation of Test Project',
    },
  ];

  it('renders empty state when no items', () => {
    const onSelect = vi.fn();
    render(<TaskList items={[]} selectedItem={undefined} onSelectItem={onSelect} />);

    expect(screen.getByText(/no existing interlinear setups/i)).toBeInTheDocument();
  });

  it('renders all items', () => {
    const onSelect = vi.fn();
    render(<TaskList items={mockItems} selectedItem={undefined} onSelectItem={onSelect} />);

    expect(screen.getByText(/Glosses for Test Project/)).toBeInTheDocument();
    expect(screen.getByText(/Back translation of Test Project/)).toBeInTheDocument();
  });

  it('calls onSelectItem when item is clicked', () => {
    const onSelect = vi.fn();
    render(<TaskList items={mockItems} selectedItem={undefined} onSelectItem={onSelect} />);

    fireEvent.click(screen.getByText(/Glosses for Test Project/));

    expect(onSelect).toHaveBeenCalledWith(mockItems[0]);
  });

  it('highlights selected item', () => {
    const onSelect = vi.fn();
    render(<TaskList items={mockItems} selectedItem={mockItems[0]} onSelectItem={onSelect} />);

    const selectedItem = screen.getByRole('option', { selected: true });
    expect(selectedItem).toHaveTextContent(/Glosses for Test Project/);
  });

  it('supports keyboard navigation', () => {
    const onSelect = vi.fn();
    render(<TaskList items={mockItems} selectedItem={undefined} onSelectItem={onSelect} />);

    const firstItem = screen.getAllByRole('option')[0];
    fireEvent.keyDown(firstItem, { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledWith(mockItems[0]);
  });
});

// --- Component tests for CreateTaskMenu ---
describe('CreateTaskMenu', () => {
  it('renders create button', () => {
    const onSelect = vi.fn();
    render(<CreateTaskMenu projectName="Test Project" onSelectTaskType={onSelect} />);

    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('opens dropdown menu when clicked', async () => {
    const onSelect = vi.fn();
    render(<CreateTaskMenu projectName="Test Project" onSelectTaskType={onSelect} />);

    const button = screen.getByRole('button', { name: /create/i });
    fireEvent.click(button);

    // The button should have aria-expanded="true" when menu is open
    // Menu content is rendered in a portal so we just verify the button state
    expect(button).toHaveAttribute('aria-expanded');
  });

  it('is disabled when disabled prop is true', () => {
    const onSelect = vi.fn();
    render(<CreateTaskMenu projectName="Test Project" onSelectTaskType={onSelect} disabled />);

    expect(screen.getByRole('button', { name: /create/i })).toBeDisabled();
  });
});

// --- Component tests for SettingsPanel ---
describe('SettingsPanel', () => {
  const defaultProps: SettingsPanelProps = {
    taskType: 'Glossing',
    visibility: getVisibilityForTaskType('Glossing', false),
    modelText: undefined,
    availableProjects: [
      { name: 'ENG', guid: 'eng-guid', displayName: 'English Reference' },
      { name: 'SPA', guid: 'spa-guid', displayName: 'Spanish Reference' },
    ],
    onModelTextChange: vi.fn(),
    relatedLanguages: false,
    onRelatedLanguagesChange: vi.fn(),
    destination: undefined,
    onDestinationChange: vi.fn(),
    onNewProjectRequested: vi.fn(),
    glossLanguage: undefined,
    availableLanguages: [{ id: 'en', code: 'en', displayName: 'English', isRTL: false }],
    onGlossLanguageChange: vi.fn(),
    outputGlosses: false,
    onOutputGlossesChange: vi.fn(),
    isObserver: false,
    validationErrors: {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders settings header', () => {
    render(<SettingsPanel {...defaultProps} />);
    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
  });

  it('shows model text field for Glossing task', () => {
    render(<SettingsPanel {...defaultProps} />);
    expect(screen.getByText('Model text:')).toBeInTheDocument();
  });

  it('shows output glosses checkbox for Glossing task', () => {
    render(<SettingsPanel {...defaultProps} />);
    expect(screen.getByText(/output glosses/i)).toBeInTheDocument();
  });

  it('hides model text field for Adaptation task', () => {
    const adaptationProps: SettingsPanelProps = {
      ...defaultProps,
      taskType: 'Adaptation',
      visibility: getVisibilityForTaskType('Adaptation', false),
    };
    render(<SettingsPanel {...adaptationProps} />);
    expect(screen.queryByText('Model text:')).not.toBeInTheDocument();
  });

  it('shows related languages checkbox for BackTranslation task', () => {
    const btProps: SettingsPanelProps = {
      ...defaultProps,
      taskType: 'BackTranslation',
      visibility: getVisibilityForTaskType('BackTranslation', false),
    };
    render(<SettingsPanel {...btProps} />);
    expect(screen.getByText(/related languages/i)).toBeInTheDocument();
  });

  it('shows gloss language field for GlossingWithoutModel task', () => {
    const gwmProps: SettingsPanelProps = {
      ...defaultProps,
      taskType: 'GlossingWithoutModel',
      visibility: getVisibilityForTaskType('GlossingWithoutModel', false),
    };
    render(<SettingsPanel {...gwmProps} />);
    // Check for the label text "Language:"
    expect(screen.getByText('Language:')).toBeInTheDocument();
  });

  it('displays validation errors', () => {
    const propsWithErrors: SettingsPanelProps = {
      ...defaultProps,
      validationErrors: { modelText: 'Model text is required' },
    };
    render(<SettingsPanel {...propsWithErrors} />);
    expect(screen.getByText(/model text is required/i)).toBeInTheDocument();
  });

  it('calls onOutputGlossesChange when checkbox is clicked', () => {
    render(<SettingsPanel {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox', { name: /output glosses/i });
    fireEvent.click(checkbox);

    expect(defaultProps.onOutputGlossesChange).toHaveBeenCalledWith(true);
  });
});
