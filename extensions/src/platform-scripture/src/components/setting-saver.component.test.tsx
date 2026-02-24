import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingSaver from './setting-saver.component';

// Mock lucide-react icons, keeping originals intact for transitive dependencies
vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lucide-react')>();
  return {
    ...actual,
    Save: () => <span data-testid="save-icon">Save</span>,
    Trash2: () => <span data-testid="trash-icon">Trash</span>,
  };
});

describe('SettingSaver', () => {
  const defaultProps = {
    savedNames: ['Collection A', 'Collection B'],
    placeholder: 'Saved text collections',
    onSelect: vi.fn(),
    onSave: vi.fn(),
    onDelete: vi.fn(),
    saveLabel: 'Save',
    deleteLabel: 'Delete',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the input with placeholder', () => {
    render(<SettingSaver {...defaultProps} />);
    expect(screen.getByPlaceholderText('Saved text collections')).toBeDefined();
  });

  it('renders save and delete buttons', () => {
    render(<SettingSaver {...defaultProps} />);
    expect(screen.getByLabelText('Save')).toBeDefined();
    expect(screen.getByLabelText('Delete')).toBeDefined();
  });

  it('disables save button when input is empty', () => {
    render(<SettingSaver {...defaultProps} />);
    const saveButton = screen.getByLabelText('Save');
    expect(saveButton).toHaveProperty('disabled', true);
  });

  it('disables delete button when no item is selected', () => {
    render(<SettingSaver {...defaultProps} />);
    const deleteButton = screen.getByLabelText('Delete');
    expect(deleteButton).toHaveProperty('disabled', true);
  });

  it('enables save button when text is typed', async () => {
    const user = userEvent.setup();
    render(<SettingSaver {...defaultProps} />);

    const input = screen.getByPlaceholderText('Saved text collections');
    await user.type(input, 'New Collection');

    const saveButton = screen.getByLabelText('Save');
    expect(saveButton).toHaveProperty('disabled', false);
  });

  it('calls onSave with trimmed input value when save is clicked', async () => {
    const user = userEvent.setup();
    render(<SettingSaver {...defaultProps} />);

    const input = screen.getByPlaceholderText('Saved text collections');
    await user.type(input, '  My Collection  ');

    const saveButton = screen.getByLabelText('Save');
    await user.click(saveButton);

    expect(defaultProps.onSave).toHaveBeenCalledWith('My Collection');
  });

  it('shows dropdown on focus when saved names exist', async () => {
    const user = userEvent.setup();
    render(<SettingSaver {...defaultProps} />);

    const input = screen.getByPlaceholderText('Saved text collections');
    await user.click(input);

    expect(screen.getByText('Collection A')).toBeDefined();
    expect(screen.getByText('Collection B')).toBeDefined();
  });

  it('calls onSelect when a dropdown item is clicked', async () => {
    const user = userEvent.setup();
    render(<SettingSaver {...defaultProps} />);

    const input = screen.getByPlaceholderText('Saved text collections');
    await user.click(input);

    const item = screen.getByText('Collection A');
    await user.click(item);

    expect(defaultProps.onSelect).toHaveBeenCalledWith('Collection A');
  });

  it('enables delete button after selecting a saved item', async () => {
    const user = userEvent.setup();
    render(<SettingSaver {...defaultProps} />);

    const input = screen.getByPlaceholderText('Saved text collections');
    await user.click(input);

    const item = screen.getByText('Collection A');
    await user.click(item);

    const deleteButton = screen.getByLabelText('Delete');
    expect(deleteButton).toHaveProperty('disabled', false);
  });

  it('calls onDelete with selected name when delete is clicked', async () => {
    const user = userEvent.setup();
    render(<SettingSaver {...defaultProps} />);

    const input = screen.getByPlaceholderText('Saved text collections');
    await user.click(input);

    const item = screen.getByText('Collection B');
    await user.click(item);

    const deleteButton = screen.getByLabelText('Delete');
    await user.click(deleteButton);

    expect(defaultProps.onDelete).toHaveBeenCalledWith('Collection B');
  });

  it('does not show dropdown when no saved names exist', async () => {
    const user = userEvent.setup();
    render(<SettingSaver {...defaultProps} savedNames={[]} />);

    const input = screen.getByPlaceholderText('Saved text collections');
    await user.click(input);

    expect(screen.queryByText('Collection A')).toBeNull();
  });
});
