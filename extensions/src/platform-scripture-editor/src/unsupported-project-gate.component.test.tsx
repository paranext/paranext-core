// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  UnsupportedProjectGate,
  UnsupportedProjectMessage,
} from './unsupported-project-gate.component';

const REASON_KEY = '%project_unsupported_studyBibleAdditions%';
const REASON_TEXT = 'Not supported yet.';

const { mockUseLocalizedStrings } = vi.hoisted(() => ({ mockUseLocalizedStrings: vi.fn() }));

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: (keys: string[]) => mockUseLocalizedStrings(keys),
}));

beforeEach(() => {
  mockUseLocalizedStrings.mockReset();
  mockUseLocalizedStrings.mockImplementation((keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key === REASON_KEY ? REASON_TEXT : key])),
    false,
  ]);
});

describe('UnsupportedProjectGate', () => {
  it('renders the editor for an openable project, without localizing anything', () => {
    render(
      <UnsupportedProjectGate unsupportedReason="" announcementKey="P1">
        <div>editor</div>
      </UnsupportedProjectGate>,
    );
    expect(screen.getByText('editor')).toBeInTheDocument();
    expect(mockUseLocalizedStrings).not.toHaveBeenCalled();
  });

  it('shows the reason and never mounts the editor for an unsupported project', () => {
    const Editor = vi.fn(() => <div>editor</div>);
    render(
      <UnsupportedProjectGate unsupportedReason={REASON_KEY} announcementKey="SBA">
        <Editor />
      </UnsupportedProjectGate>,
    );
    expect(screen.getByText(REASON_TEXT)).toBeInTheDocument();
    expect(Editor).not.toHaveBeenCalled();
  });
});

describe('UnsupportedProjectMessage', () => {
  it('shows a spinner while the reason is being localized', () => {
    const { container } = render(
      <UnsupportedProjectMessage message={undefined} announcementKey="SBA" />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.queryByTestId('unsupported-project-message')).toBeNull();
  });

  it('shows the message once it is localized', () => {
    render(<UnsupportedProjectMessage message={REASON_TEXT} announcementKey="SBA" />);
    expect(screen.getByTestId('unsupported-project-message')).toHaveTextContent(REASON_TEXT);
  });
});
