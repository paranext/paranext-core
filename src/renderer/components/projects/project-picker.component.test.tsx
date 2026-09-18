import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Dialog } from 'platform-bible-react';
import ProjectPicker, {
  type ProjectItem,
  type ProjectPickerLocalizedStrings,
} from './project-picker.component';

const STRINGS: ProjectPickerLocalizedStrings = {
  '%projectPicker_title%': 'Project Picker',
  '%projectPicker_section_recent%': 'Recent',
  '%projectPicker_section_projects%': 'Your projects',
  '%projectPicker_search_placeholder%': 'Search projects…',
  '%projectPicker_no_results%': 'No projects found',
};

const WEB: ProjectItem = {
  id: 'web',
  fullName: 'World English Bible',
  shortName: 'WEB',
  language: 'English',
};
const KJV: ProjectItem = {
  id: 'kjv',
  fullName: 'King James Version',
  shortName: 'KJV',
  language: 'English',
};
const RVR: ProjectItem = {
  id: 'rvr',
  fullName: 'Reina Valera',
  shortName: 'RVR',
  language: 'Spanish',
};

function renderDialog(overrides: Partial<Parameters<typeof ProjectPicker>[0]> = {}) {
  const onSelect = vi.fn();
  render(
    <Dialog open>
      <ProjectPicker
        currentProject={WEB}
        recentProjects={[WEB]}
        allProjects={[KJV, RVR]}
        onSelect={onSelect}
        localizedStrings={STRINGS}
        {...overrides}
      />
    </Dialog>,
  );
  return { onSelect };
}

describe('ProjectPicker', () => {
  it('renders the dialog title', () => {
    renderDialog();
    expect(screen.getByText('Project Picker')).toBeInTheDocument();
  });

  it('shows Recent section heading when recentProjects is populated', () => {
    renderDialog();
    expect(screen.getByText('Recent')).toBeInTheDocument();
  });

  it('omits Recent section when recentProjects is empty', () => {
    renderDialog({ recentProjects: [] });
    expect(screen.queryByText('Recent')).not.toBeInTheDocument();
  });

  it('shows All projects section', () => {
    renderDialog();
    expect(screen.getByText('Your projects')).toBeInTheDocument();
  });

  it('renders project as "Full Name (Short)"', () => {
    renderDialog();
    expect(screen.getByText('World English Bible')).toBeInTheDocument();
    expect(screen.getByText('WEB')).toBeInTheDocument();
  });

  it('pins current project to top of Recent section', () => {
    const OTHER: ProjectItem = {
      id: 'other',
      fullName: 'Other Bible',
      shortName: 'OTH',
    };
    renderDialog({ recentProjects: [OTHER, WEB], currentProject: WEB });
    const rows = screen.getAllByRole('option');
    const webIndex = rows.findIndex((r) => r.textContent?.includes('World English Bible'));
    const otherIndex = rows.findIndex((r) => r.textContent?.includes('Other Bible'));
    expect(webIndex).toBeLessThan(otherIndex);
  });

  it('calls onSelect with the project id when a row is clicked', () => {
    const { onSelect } = renderDialog();
    fireEvent.click(screen.getByText('King James Version'));
    expect(onSelect).toHaveBeenCalledWith('kjv');
  });

  it('filters both sections by search text (fullName match)', () => {
    renderDialog();
    fireEvent.change(screen.getByPlaceholderText('Search projects…'), {
      target: { value: 'Reina' },
    });
    expect(screen.getByText('Reina Valera')).toBeInTheDocument();
    expect(screen.queryByText('King James Version')).not.toBeInTheDocument();
    expect(screen.queryByText('World English Bible')).not.toBeInTheDocument();
  });

  it('filters by shortName match', () => {
    renderDialog();
    fireEvent.change(screen.getByPlaceholderText('Search projects…'), {
      target: { value: 'KJV' },
    });
    expect(screen.getByText('King James Version')).toBeInTheDocument();
    expect(screen.queryByText('World English Bible')).not.toBeInTheDocument();
  });

  it('filters by language match', () => {
    renderDialog();
    fireEvent.change(screen.getByPlaceholderText('Search projects…'), {
      target: { value: 'Spanish' },
    });
    expect(screen.getByText('Reina Valera')).toBeInTheDocument();
    expect(screen.queryByText('King James Version')).not.toBeInTheDocument();
  });

  it('shows "No projects found" when search matches nothing', () => {
    renderDialog();
    fireEvent.change(screen.getByPlaceholderText('Search projects…'), {
      target: { value: 'zzznomatch' },
    });
    expect(screen.getByText('No projects found')).toBeInTheDocument();
    expect(screen.queryByText('Recent')).not.toBeInTheDocument();
    expect(screen.queryByText('Your projects')).not.toBeInTheDocument();
  });

  it('shows a spinner when isLoading is true', () => {
    renderDialog({ isLoading: true });
    expect(screen.queryByText('World English Bible')).not.toBeInTheDocument();
  });
});

describe('read-only projects', () => {
  it('marks a read-only row and leaves an editable row unmarked', () => {
    renderDialog({
      currentProject: undefined,
      recentProjects: [],
      allProjects: [
        { id: 'ed', fullName: 'Editable Project', shortName: 'ED', isEditable: true },
        { id: 'ro', fullName: 'Readonly Project', shortName: 'RO', isEditable: false },
      ],
      localizedStrings: { ...STRINGS, '%projectPicker_readOnly_label%': 'Read-only' },
    });

    expect(screen.getAllByLabelText('Read-only')).toHaveLength(1);
    expect(screen.getByText('Readonly Project')).toBeInTheDocument();
    expect(screen.getByText('Editable Project')).toBeInTheDocument();
  });

  it('leaves a project with no isEditable metadata unmarked', () => {
    renderDialog({
      currentProject: undefined,
      recentProjects: [],
      allProjects: [{ id: 'ed', fullName: 'Editable Project', shortName: 'ED' }],
      localizedStrings: { ...STRINGS, '%projectPicker_readOnly_label%': 'Read-only' },
    });

    expect(screen.queryByLabelText('Read-only')).toBeNull();
  });
});

describe('short name column', () => {
  // Every project/resource picker — this dialog, the titlebar `ProjectSelector` popover and
  // `ResourcePickerDialog` — starts the short name at the leading edge of its column, so the three
  // read as one list of one kind of thing. See the picker row layout contract in
  // `.context/standards/Architecture-Decisions.md`.
  it('starts the short name at the leading edge of its column', () => {
    renderDialog();

    const shortNameCell = screen.getByText('WEB').closest('div');
    expect(shortNameCell).not.toBeNull();
    expect(shortNameCell?.className).toContain('tw:justify-start');
    expect(shortNameCell?.className).not.toContain('tw:justify-end');
  });
});

describe('short name offset', () => {
  // The check mark and the read-only padlock each occupy a reserved slot whether or not they
  // render, so a current or read-only row's short name does not start further in than its
  // neighbours' — a ragged leading edge in the column this dialog aligns on.
  it('starts every short name at the same offset regardless of which glyphs a row carries', () => {
    renderDialog({
      currentProject: { id: 'cur', fullName: 'Current Project', shortName: 'CUR' },
      recentProjects: [{ id: 'cur', fullName: 'Current Project', shortName: 'CUR' }],
      allProjects: [
        { id: 'plain', fullName: 'Plain Project', shortName: 'PLN' },
        { id: 'ro', fullName: 'Readonly Project', shortName: 'RO', isEditable: false },
      ],
      localizedStrings: { ...STRINGS, '%projectPicker_readOnly_label%': 'Read-only' },
    });

    // The slots have to be the same WIDTH, not merely present: an empty slot with no sizing
    // collapses to zero and the ragged edge comes straight back, while the child index below stays
    // 2 for every row by construction. Asserting the sizing classes is what makes this falsifiable.
    const slotClassNames = ['CUR', 'PLN', 'RO'].map((shortName) => {
      const nameSpan = screen.getByText(shortName);
      const cell = nameSpan.parentElement;
      if (!cell) return [];
      return Array.from(cell.children)
        .slice(0, Array.from(cell.children).indexOf(nameSpan))
        .map((slot) => slot.className);
    });

    slotClassNames.forEach((classNames) => {
      expect(classNames).toHaveLength(2);
      classNames.forEach((className) => {
        expect(className).toContain('tw:h-3');
        expect(className).toContain('tw:w-3');
        expect(className).toContain('tw:shrink-0');
      });
    });
  });
});

describe('row width', () => {
  // The picker row layout contract in `.context/standards/Architecture-Decisions.md`: a long name
  // truncates inside the row, it never widens the list into a sideways scroll. jsdom does no
  // layout, so it cannot observe the scrollbar itself (`scrollWidth` and `clientWidth` are both
  // 0 here) — these assert the four layout properties that together produce it, which is what a
  // future edit would have to remove to reintroduce the defect.
  const LONG_NAME = 'Supercalifragilisticexpialidociousversionofthebibleinaveryverylonglanguage';
  // `language` is a BCP-47 tag by convention, not by enforcement — a display name reaching this
  // column is one mapping slip away, and it is the case that crushes the columns beside it.
  const LONG_LANGUAGE = 'AnUnreasonablyLongLanguageDisplayNameThatIsNotATag';

  it('lets a long name truncate rather than widening the list', () => {
    renderDialog({
      currentProject: undefined,
      recentProjects: [],
      allProjects: [{ id: 'long', fullName: LONG_NAME, shortName: 'LONG' }],
    });

    const fullNameCell = screen.getByText(LONG_NAME);
    expect(fullNameCell.className).toContain('tw:truncate');
    expect(fullNameCell.className).toContain('tw:min-w-0');
    // The clipped text stays reachable on hover.
    expect(fullNameCell).toHaveAttribute('title', LONG_NAME);

    const shortNameText = screen.getByText('LONG');
    expect(shortNameText.className).toContain('tw:truncate');
  });

  it('floors every text track at zero width and hides the horizontal axis', () => {
    renderDialog({
      currentProject: undefined,
      recentProjects: [],
      allProjects: [
        { id: 'long', fullName: LONG_NAME, shortName: 'LONG', language: LONG_LANGUAGE },
      ],
    });

    // A bare `auto`/`1fr` track floors at its content's minimum width, so truncation on the cell
    // alone is not enough — the track has to be allowed to shrink too. All THREE tracks, not just
    // the two carrying names: an unfloored language column satisfies its own minimum by crushing
    // the two beside it, and `overflow-x-hidden` below means there is no scrollbar to recover them.
    const listbox = screen.getByRole('listbox');
    expect(listbox.className).toContain(
      'tw:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)]',
    );

    const languageCell = screen.getByText(LONG_LANGUAGE);
    expect(languageCell.className).toContain('tw:truncate');
    expect(languageCell.className).toContain('tw:min-w-0');

    const scrollContainer = listbox.parentElement;
    expect(scrollContainer?.className).toContain('tw:overflow-x-hidden');
  });
});
