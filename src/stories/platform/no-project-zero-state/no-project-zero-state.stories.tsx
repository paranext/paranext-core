import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  VariantARegistryRequired,
  VariantBLocalCreation,
  VariantCGallery,
  type NoProjectZeroStateProps,
} from './no-project-zero-state.component';

/**
 * Stories for the full-screen "no project open" zero state of Paratext 10 Simple.
 *
 * NOTE: This is an APP-LEVEL story (Storybook port 6006, root webpack5 builder), not a library
 * story. WorkspaceShell is intentionally NOT used here — the workspace shell only renders once a
 * project is open, and these screens are what's shown before that point.
 *
 * The `hasLocalProjects` arg drives whether the "Recent projects" / "Open existing local project"
 * affordances are visible in each variant. Toggle it in Storybook controls to compare the empty and
 * populated states for each mental model.
 */

const meta: Meta<NoProjectZeroStateProps> = {
  title: 'Platform/NoProjectZeroState',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-screen zero state shown when Paratext 10 Simple opens with no project loaded. ' +
          'Three variants explore different mental models for the no-project moment: ' +
          'A) Registry is the only path; B) Local creation is a peer to the registry; ' +
          'C) Persistent project gallery with an empty placeholder.',
      },
    },
  },
  argTypes: {
    hasLocalProjects: {
      control: 'boolean',
      description:
        'When true, surfaces a "Recent projects" affordance and the "Open existing local project" action.',
    },
    recentProjectNames: {
      control: 'object',
      description: 'Sample local project names shown when hasLocalProjects is true.',
    },
  },
  args: {
    hasLocalProjects: false,
    recentProjectNames: ['Greek NT Working Draft', 'Acholi Pilot', 'Sample-Translation'],
    onOpenRegistry: () => {
      console.log('[story] open registry -> https://registry.paratext.org');
    },
    onCreateProject: () => {
      console.log('[story] create new project');
    },
    onOpenLocalProject: (projectName?: string) => {
      console.log('[story] open local project:', projectName ?? '(picker)');
    },
  },
};

export default meta;

type Story = StoryObj<NoProjectZeroStateProps>;

/**
 * Variant A — "The registry is the source of truth."
 *
 * Single-path onboarding. Toggle `hasLocalProjects` in controls to reveal the recent-projects
 * affordance.
 */
export const ARegistryRequired: Story = {
  name: 'A · Registry-required',
  render: (args) => <VariantARegistryRequired {...args} />,
};

/**
 * Variant B — "Two equally valid starting points."
 *
 * Local creation and registry are presented as peer cards. Toggle `hasLocalProjects` to reveal the
 * recent-projects affordance.
 */
export const BLocalCreation: Story = {
  name: 'B · Local creation available',
  render: (args) => <VariantBLocalCreation {...args} />,
};

/**
 * Variant C — "Your projects live here, the page is just empty today."
 *
 * Persistent project gallery. With `hasLocalProjects=false` the gallery shows a dashed placeholder
 * card; with `hasLocalProjects=true` real project cards take its place. All three action handlers
 * are exposed as peers below the gallery.
 */
export const CGallery: Story = {
  name: 'C · Project gallery',
  render: (args) => <VariantCGallery {...args} />,
};

/**
 * Variant A with the local-projects affordance pre-enabled — useful as a dedicated story for
 * sharing the "returning user" view without asking reviewers to flip the control.
 */
export const AWithLocalProjects: Story = {
  name: 'A · Registry-required (with local projects)',
  args: { hasLocalProjects: true },
  render: (args) => <VariantARegistryRequired {...args} />,
};

/** Variant B with the local-projects affordance pre-enabled. */
export const BWithLocalProjects: Story = {
  name: 'B · Local creation (with local projects)',
  args: { hasLocalProjects: true },
  render: (args) => <VariantBLocalCreation {...args} />,
};

/** Variant C with real project cards populating the gallery. */
export const CWithLocalProjects: Story = {
  name: 'C · Project gallery (with local projects)',
  args: { hasLocalProjects: true },
  render: (args) => <VariantCGallery {...args} />,
};
