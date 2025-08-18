import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { ErrorPopover } from '@/components/advanced/error-popover.component';
import { Button } from '@/components/shadcn-ui/button';
import { ThemeProvider } from '@/preview/preview-components/theme-provider.component';

const meta: Meta<typeof ErrorPopover> = {
  title: 'Advanced/ErrorPopover',
  component: ErrorPopover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    errorDetails: {
      control: 'text',
      description: 'The error details to show in the error popover',
    },
    handleCopyNotify: {
      action: 'copy-notify',
      description: 'Optional notification handler function to handle when the error is copied',
    },
    localizedStrings: {
      control: 'object',
      description: 'List of localized strings to use in the ErrorDump component',
    },
    className: {
      control: 'text',
      description: 'Optional CSS classes to insert into the PopoverContent',
    },
    children: {
      control: false,
      description: 'The trigger element for the popover',
    },
  },
  args: {
    handleCopyNotify: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Default localized strings for stories
const defaultLocalizedStrings = {
  '%webView_error_dump_header%': 'Error Details',
  '%webView_error_dump_info_message%':
    'An error occurred. Please copy the details below and report this issue.',
} as const;

export const Default: Story = {
  args: {
    errorDetails:
      'TypeError: Cannot read property "foo" of undefined\n    at Component.render (Component.tsx:42:15)\n    at ReactDOM.render (react-dom.js:123:45)',
    localizedStrings: defaultLocalizedStrings,
  },
  render: (args) => (
    <ErrorPopover {...args}>
      <Button variant="destructive">Show Error Details</Button>
    </ErrorPopover>
  ),
};

export const WithLongError: Story = {
  args: {
    errorDetails: `ReferenceError: customFunction is not defined
    at Object.processData (/path/to/app/src/utils/dataProcessor.js:156:23)
    at /path/to/app/src/components/DataViewer.tsx:89:45
    at Array.map (<anonymous>)
    at DataViewer.render (/path/to/app/src/components/DataViewer.tsx:87:21)
    at finishClassComponent (/path/to/app/node_modules/react-dom/cjs/react-dom.development.js:8808:31)
    at updateClassComponent (/path/to/app/node_modules/react-dom/cjs/react-dom.development.js:8758:24)
    at beginWork (/path/to/app/node_modules/react-dom/cjs/react-dom.development.js:10177:16)
    at HTMLUnknownElement.callCallback (/path/to/app/node_modules/react-dom/cjs/react-dom.development.js:3945:14)
    at Object.invokeGuardedCallbackDev (/path/to/app/node_modules/react-dom/cjs/react-dom.development.js:3994:16)
    at invokeGuardedCallback (/path/to/app/node_modules/react-dom/cjs/react-dom.development.js:4056:31)

Additional context:
- User was attempting to filter a large dataset
- The error occurred after clicking the "Apply Filter" button
- Browser: Chrome 115.0.5790.102
- OS: Windows 11
- Application version: 2.1.3`,
    localizedStrings: defaultLocalizedStrings,
  },
  render: (args) => (
    <ErrorPopover {...args}>
      <Button variant="outline">View Stack Trace</Button>
    </ErrorPopover>
  ),
};

export const WithCustomStyling: Story = {
  args: {
    errorDetails: 'SyntaxError: Unexpected token "}" in JSON at position 42',
    localizedStrings: defaultLocalizedStrings,
    className: 'tw-border-red-500 tw-bg-red-50',
  },
  render: (args) => (
    <ErrorPopover {...args}>
      <Button variant="ghost" className="tw-border-red-600 tw-text-red-600">
        ⚠️ JSON Parse Error
      </Button>
    </ErrorPopover>
  ),
};

export const WithCustomLocalizedStrings: Story = {
  args: {
    errorDetails: 'NetworkError: Failed to fetch data from API endpoint',
    localizedStrings: {
      '%webView_error_dump_header%': "Détails de l'erreur", // French
      '%webView_error_dump_info_message%':
        "Une erreur s'est produite. Veuillez copier les détails ci-dessous et signaler ce problème.",
    },
  },
  render: (args) => (
    <ErrorPopover {...args}>
      <Button variant="secondary">Afficher les détails de l'erreur</Button>
    </ErrorPopover>
  ),
};

export const WithCopyHandler: Story = {
  args: {
    errorDetails: 'Error: Failed to load configuration file\n    at loadConfig (config.js:15:8)',
    localizedStrings: defaultLocalizedStrings,
  },
  render: (args) => {
    // Wrapper component to handle copy state
    function CopyHandlerWrapper() {
      const [isCopied, setIsCopied] = useState(false);

      const handleCopyNotify = () => {
        setIsCopied(true);
      };

      return (
        <ErrorPopover {...args} handleCopyNotify={handleCopyNotify}>
          <Button variant="destructive" size="sm" onClick={() => setIsCopied(false)}>
            Config Error
          </Button>
          {isCopied && (
            <span className="tw-font-medium tw-text-green-600">
              ✅ Error details copied to clipboard!
            </span>
          )}
        </ErrorPopover>
      );
    }

    return <CopyHandlerWrapper />;
  },
};
