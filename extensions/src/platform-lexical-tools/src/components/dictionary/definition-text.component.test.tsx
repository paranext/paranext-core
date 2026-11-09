// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DefinitionText } from './definition-text.component';

const DEFINITION = 'from {L:Bethlehem<SDBH:בֵּית לֶחֶם>}';

describe('DefinitionText', () => {
  it('calls back with the link target on click', () => {
    const onEntryLinkClick = vi.fn().mockResolvedValue(true);
    render(<DefinitionText definition={DEFINITION} onEntryLinkClick={onEntryLinkClick} />);
    fireEvent.click(screen.getByRole('link', { name: 'Bethlehem' }));
    expect(onEntryLinkClick).toHaveBeenCalledWith('SDBH', 'בֵּית לֶחֶם');
  });

  it.each(['Enter', ' '])('activates on the %j key', (key) => {
    const onEntryLinkClick = vi.fn().mockResolvedValue(true);
    render(<DefinitionText definition={DEFINITION} onEntryLinkClick={onEntryLinkClick} />);
    fireEvent.keyDown(screen.getByRole('link'), { key });
    expect(onEntryLinkClick).toHaveBeenCalledTimes(1);
  });

  it('does not bubble link clicks or activating keys to the parent', () => {
    const onParentClick = vi.fn();
    const onParentKeyDown = vi.fn();
    render(
      // A stand-in for the sense card that contains the definition
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onClick={onParentClick} onKeyDown={onParentKeyDown}>
        <DefinitionText
          definition={DEFINITION}
          onEntryLinkClick={vi.fn().mockResolvedValue(true)}
        />
      </div>,
    );
    fireEvent.click(screen.getByRole('link'));
    fireEvent.keyDown(screen.getByRole('link'), { key: 'Enter' });
    expect(onParentClick).not.toHaveBeenCalled();
    expect(onParentKeyDown).not.toHaveBeenCalled();
  });

  it('shows plain text after an unresolved click', async () => {
    render(
      <DefinitionText
        definition={DEFINITION}
        onEntryLinkClick={vi.fn().mockResolvedValue(false)}
      />,
    );
    fireEvent.click(screen.getByRole('link'));
    await waitFor(() => expect(screen.queryByRole('link')).not.toBeInTheDocument());
    expect(screen.getByText(/Bethlehem/)).toBeInTheDocument();
  });

  it('shows plain text without a callback', () => {
    render(<DefinitionText definition={DEFINITION} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText(/Bethlehem/)).toBeInTheDocument();
  });

  it('shows plain text for an unsupported dictionary', () => {
    render(
      <DefinitionText
        definition="{L:moth<BT-OT:עָשׁ>}"
        onEntryLinkClick={vi.fn().mockResolvedValue(true)}
      />,
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('moth')).toBeInTheDocument();
  });
});
