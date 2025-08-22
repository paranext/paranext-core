import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ErrorPopover,
  ErrorPopoverLocalizedStrings,
} from '@/components/advanced/error-popover.component';
import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { AlertTriangle, Bug, XCircle } from 'lucide-react';

const meta: Meta<typeof ErrorPopover> = {
  title: 'Advanced/ErrorPopover',
  component: ErrorPopover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A popover component that displays detailed error information using the ErrorDump component.

This component wraps the ErrorDump component in a popover, making it useful for showing detailed error information without taking up permanent screen space. Users can click on a trigger element to see the error details.
        `,
      },
    },
  },
  argTypes: {
    errorDetails: {
      control: 'text',
      description: 'The error details to show in the error popover',
    },
    handleCopyNotify: {
      action: 'copy-notified',
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
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default localized strings for stories
const defaultLocalizedStrings: ErrorPopoverLocalizedStrings = {
  '%webView_error_dump_header%': 'Error Details',
  '%webView_error_dump_info_message%':
    'An error occurred. You can copy the details below for troubleshooting.',
  '%webView_error_dump_copied_message%': 'Error details copied to clipboard!',
};

export const Default: Story = {
  args: {
    errorDetails: `TypeError: Cannot read property 'name' of undefined
    at UserProfile.render (UserProfile.jsx:45:12)
    at updateComponent (react-dom.js:1234:56)
    at Object.invokeGuardedCallback (react-dom.js:789:10)`,
    localizedStrings: defaultLocalizedStrings,
    children: <Button variant="destructive">Show Error Details</Button>,
  },
};

export const WithErrorIcon: Story = {
  args: {
    errorDetails: `Network Error: Failed to connect to server

Request: GET /api/users
Status: 500 Internal Server Error
Timestamp: 2024-08-19T14:30:45.123Z`,
    localizedStrings: defaultLocalizedStrings,
    children: (
      <Button variant="outline" size="sm">
        <AlertTriangle className="tw-mr-2 tw-h-4 tw-w-4" />
        Network Error
      </Button>
    ),
  },
};

export const ErrorBadge: Story = {
  args: {
    errorDetails: `Validation Error: Required field missing

Field: email
Value: (empty)
Rule: required
Form: userRegistration`,
    localizedStrings: defaultLocalizedStrings,
    children: (
      <Badge variant="destructive" className="tw-cursor-pointer">
        <XCircle className="tw-mr-1 tw-h-3 tw-w-3" />
        Validation Error
      </Badge>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Using a badge as the trigger element for the error popover.',
      },
    },
  },
};

export const DebugInfo: Story = {
  args: {
    errorDetails: `Debug Information:

Component: DataTable
Props: {
  data: [Array of 150 items],
  columns: [5 column definitions],
  sortBy: "name",
  filterBy: "active"
}
State: {
  loading: false,
  selectedRows: [],
  currentPage: 3
}
Last Action: SORT_COLUMN
Performance: 2.3ms render time`,
    localizedStrings: {
      '%webView_error_dump_header%': 'Debug Information',
      '%webView_error_dump_info_message%': 'Component state and performance details for debugging.',
      '%webView_error_dump_copied_message%': 'Debug details copied to clipboard!',
    },
    children: (
      <Button variant="ghost" size="sm">
        <Bug className="tw-mr-2 tw-h-4 tw-w-4" />
        Debug Info
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Using the ErrorPopover to show debug information instead of error details.',
      },
    },
  },
};

export const LargeError: Story = {
  args: {
    errorDetails: `Critical System Error: Database Connection Failed

Error Stack:
============
ConnectionTimeoutError: Connection to database timed out after 30000ms
    at Database.connect (database.js:123:45)
    at DatabaseService.initialize (service.js:67:89)
    at Application.startup (app.js:34:56)
    at Object.main (index.js:12:34)

System Information:
==================
Node.js: v18.17.0
Platform: linux x64
Memory: 1.2GB / 2GB used
CPU: 85% usage
Database: PostgreSQL 14.8
Environment: production

Connection Details:
==================
Host: db.example.com
Port: 5432
Database: production_db
SSL: enabled
Connection Pool: 10 max connections
Current Connections: 8 active

Timeline:
=========
14:30:45.000 - Application started
14:30:45.100 - Attempting database connection
14:30:45.200 - Connection attempt 1 failed
14:30:50.300 - Connection attempt 2 failed
14:30:55.400 - Connection attempt 3 failed
14:31:15.500 - Connection timeout reached
14:31:15.501 - Error thrown and caught`,
    localizedStrings: defaultLocalizedStrings,
    className: 'tw-max-w-2xl',
    children: (
      <Button variant="destructive">
        <AlertTriangle className="tw-mr-2 tw-h-4 tw-w-4" />
        Critical Error
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with extensive error details and custom popover width.',
      },
    },
  },
};

export const InlineErrorIndicator: Story = {
  render: (args) => (
    <div className="tw-space-y-4">
      <h3 className="tw-text-lg tw-font-semibold">User Registration Form</h3>
      <div className="tw-grid tw-grid-cols-2 tw-gap-4">
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw-block tw-text-sm tw-font-medium">First Name</label>
          <input
            type="text"
            className="tw-mt-1 tw-block tw-w-full tw-rounded tw-border tw-border-gray-300 tw-px-3 tw-py-2"
            defaultValue="John"
          />
        </div>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw-block tw-text-sm tw-font-medium">Last Name</label>
          <input
            type="text"
            className="tw-mt-1 tw-block tw-w-full tw-rounded tw-border tw-border-gray-300 tw-px-3 tw-py-2"
            defaultValue="Doe"
          />
        </div>
        <div className="tw-col-span-2">
          <div className="tw-flex tw-items-center tw-gap-2">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="tw-block tw-text-sm tw-font-medium">Email Address</label>
            <ErrorPopover {...args}>
              <XCircle className="tw-h-4 tw-w-4 tw-cursor-pointer tw-text-red-500" />
            </ErrorPopover>
          </div>
          <input
            type="email"
            className="tw-mt-1 tw-block tw-w-full tw-rounded tw-border tw-border-red-300 tw-px-3 tw-py-2"
            defaultValue="invalid-email"
          />
          <p className="tw-mt-1 tw-text-sm tw-text-red-600">Please enter a valid email address</p>
        </div>
      </div>
    </div>
  ),
  args: {
    errorDetails: `Email Validation Error:

Input Value: "invalid-email"
Expected Format: user@domain.com
Validation Rule: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
Error Code: INVALID_EMAIL_FORMAT

Validation performed at: 2024-08-19T14:30:45.123Z
Field: email (required)
Form: userRegistration`,
    localizedStrings: defaultLocalizedStrings,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing how to use ErrorPopover as an inline error indicator in a form.',
      },
    },
  },
};

export const MultipleErrorSources: Story = {
  render: () => (
    <div className="tw-space-y-6">
      <h3 className="tw-text-lg tw-font-semibold">System Status Dashboard</h3>

      <div className="tw-grid tw-grid-cols-3 tw-gap-4">
        <div className="tw-rounded tw-border tw-p-4">
          <div className="tw-flex tw-items-center tw-justify-between">
            <h4 className="tw-font-medium">Database</h4>
            <ErrorPopover
              errorDetails={`Database Connection Error:
Connection timeout after 30 seconds
Host: db.example.com:5432
Last successful connection: 2024-08-19T14:25:00Z`}
              localizedStrings={defaultLocalizedStrings}
            >
              <Badge variant="destructive" className="tw-cursor-pointer">
                <XCircle className="tw-mr-1 tw-h-3 tw-w-3" />
                Error
              </Badge>
            </ErrorPopover>
          </div>
          <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">Connection failed</p>
        </div>

        <div className="tw-rounded tw-border tw-p-4">
          <div className="tw-flex tw-items-center tw-justify-between">
            <h4 className="tw-font-medium">API Server</h4>
            <Badge variant="secondary">Healthy</Badge>
          </div>
          <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">All endpoints responding</p>
        </div>

        <div className="tw-rounded tw-border tw-p-4">
          <div className="tw-flex tw-items-center tw-justify-between">
            <h4 className="tw-font-medium">Cache</h4>
            <ErrorPopover
              errorDetails={`Redis Cache Warning:
Memory usage: 87% (1.74GB / 2GB)
Hit rate: 73% (below threshold of 85%)
Evicted keys in last hour: 1,247
Recommendation: Increase memory or review cache policies`}
              localizedStrings={{
                '%webView_error_dump_header%': 'Cache Warning',
                '%webView_error_dump_info_message%': 'Cache performance is below optimal levels.',
                '%webView_error_dump_copied_message%': 'Cache details copied to clipboard!',
              }}
            >
              <Badge
                variant="outline"
                className="tw-cursor-pointer tw-border-yellow-500 tw-text-yellow-600"
              >
                <AlertTriangle className="tw-mr-1 tw-h-3 tw-w-3" />
                Warning
              </Badge>
            </ErrorPopover>
          </div>
          <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">High memory usage</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple ErrorPopovers in a system status dashboard context.',
      },
    },
  },
};
