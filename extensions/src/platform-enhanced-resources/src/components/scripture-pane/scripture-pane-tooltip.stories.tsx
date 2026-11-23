import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  MOCK_TOOLTIP_DEFAULT,
  MOCK_TOOLTIP_MULTI_GLOSS,
  MOCK_TOOLTIP_NO_GLOSS,
  MOCK_TOOLTIP_BRACE_ANNOTATIONS,
  MOCK_TOOLTIP_PHRASE,
  MOCK_TOOLTIP_RENDERING_FOUND,
  MOCK_TOOLTIP_NO_RENDERINGS,
  MOCK_TOOLTIP_GUESSED_RENDERING,
  type MockTooltipDataInput,
} from '../../data/marble-form.story-data';
import { presentTooltip } from '../../presenters/tooltip-presenter';

const meta: Meta = {
  title: 'Enhanced Resources / Scripture Pane Tooltip',
  parameters: { layout: 'centered' },
};
export default meta;

function TooltipPreview({ input }: { input: MockTooltipDataInput }) {
  const viewModel = presentTooltip(input);
  // Render the view model as a JSON preview - markdown rendering happens via papi.overlays
  // at runtime and is not available in Storybook. The preview confirms the presenter shape
  // per branch.
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      <pre style={{ fontSize: 12, background: '#f7f7f7', padding: 12 }}>
        {JSON.stringify(viewModel, undefined, 2)}
      </pre>
    </div>
  );
}

export const Default: StoryObj = { render: () => <TooltipPreview input={MOCK_TOOLTIP_DEFAULT} /> };
export const MultiGloss: StoryObj = {
  render: () => <TooltipPreview input={MOCK_TOOLTIP_MULTI_GLOSS} />,
};
export const NoGloss: StoryObj = {
  render: () => <TooltipPreview input={MOCK_TOOLTIP_NO_GLOSS} />,
};
export const BraceAnnotations: StoryObj = {
  render: () => <TooltipPreview input={MOCK_TOOLTIP_BRACE_ANNOTATIONS} />,
};
export const Phrase: StoryObj = { render: () => <TooltipPreview input={MOCK_TOOLTIP_PHRASE} /> };
export const RenderingFound: StoryObj = {
  render: () => <TooltipPreview input={MOCK_TOOLTIP_RENDERING_FOUND} />,
};
export const NoRenderings: StoryObj = {
  render: () => <TooltipPreview input={MOCK_TOOLTIP_NO_RENDERINGS} />,
};
export const GuessedRendering: StoryObj = {
  render: () => <TooltipPreview input={MOCK_TOOLTIP_GUESSED_RENDERING} />,
};
