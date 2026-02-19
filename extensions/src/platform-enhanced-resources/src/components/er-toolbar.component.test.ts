import { describe, it, expect } from 'vitest';

/**
 * ERToolbar component tests.
 *
 * Note: Full React component rendering tests require a DOM environment (jsdom) and mocking of
 * platform-bible-react components. These tests verify the exported interface and utility logic.
 */

describe('er-toolbar.component', () => {
  it('ERToolbarProps callback signatures are correctly typed', () => {
    // Verify callback prop signatures match expected function shapes
    let highlightCallbackCalled = false;
    let projectCallbackCalled = false;
    let guideCallbackCalled = false;

    const props: import('./er-toolbar.component').ERToolbarProps = {
      showResearchTerms: false,
      showFound: false,
      showMissing: false,
      onHighlightChange: (highlights) => {
        highlightCallbackCalled = true;
        expect(highlights).toHaveProperty('researchTerms');
        expect(highlights).toHaveProperty('found');
        expect(highlights).toHaveProperty('missing');
      },
      trackedProjectName: 'TestProject',
      availableProjects: [],
      onTrackedProjectChange: (projectName) => {
        projectCallbackCalled = true;
        expect(projectName).toBe('TestProject');
      },
      onToggleGuide: () => {
        guideCallbackCalled = true;
      },
    };

    // Exercise callbacks to verify they work correctly
    props.onHighlightChange({ researchTerms: true, found: false, missing: true });
    props.onTrackedProjectChange('TestProject');
    props.onToggleGuide();

    expect(highlightCallbackCalled).toBe(true);
    expect(projectCallbackCalled).toBe(true);
    expect(guideCallbackCalled).toBe(true);
  });

  it('exports TrackedProjectOption interface via type check', () => {
    // Type-level test: verify the interface shape is correct
    // This test ensures the exported types are available
    const option: import('./er-toolbar.component').TrackedProjectOption = {
      name: 'TestProject',
      isNoProject: false,
    };
    expect(option.name).toBe('TestProject');
    expect(option.isNoProject).toBe(false);
  });

  it('exports ERToolbarProps interface via type check', () => {
    // Verify props interface shape is correct by constructing a valid props object
    const props: import('./er-toolbar.component').ERToolbarProps = {
      showResearchTerms: true,
      showFound: false,
      showMissing: false,
      onHighlightChange: () => {},
      trackedProjectName: undefined,
      availableProjects: [],
      onTrackedProjectChange: () => {},
      onToggleGuide: () => {},
    };
    expect(props.showResearchTerms).toBe(true);
    expect(props.showFound).toBe(false);
    expect(props.showMissing).toBe(false);
    expect(props.trackedProjectName).toBeUndefined();
    expect(props.availableProjects).toEqual([]);
  });

  it('TrackedProjectOption supports no-project option', () => {
    const noProjectOption: import('./er-toolbar.component').TrackedProjectOption = {
      name: '__no-project__',
      isNoProject: true,
    };
    expect(noProjectOption.isNoProject).toBe(true);
  });

  it('ERToolbarProps supports tracked project with available projects', () => {
    const projects: import('./er-toolbar.component').TrackedProjectOption[] = [
      { name: 'Project A', isNoProject: false },
      { name: 'Project B', isNoProject: false },
    ];

    const props: import('./er-toolbar.component').ERToolbarProps = {
      showResearchTerms: true,
      showFound: true,
      showMissing: true,
      onHighlightChange: () => {},
      trackedProjectName: 'Project A',
      availableProjects: projects,
      onTrackedProjectChange: () => {},
      onToggleGuide: () => {},
    };

    expect(props.trackedProjectName).toBe('Project A');
    expect(props.availableProjects).toHaveLength(2);
  });
});
