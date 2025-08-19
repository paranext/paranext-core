import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ErrorDump,
  type ErrorDumpLocalizedStrings,
} from '@/components/basics/error-dump.component';

const meta: Meta<typeof ErrorDump> = {
  title: 'Basics/ErrorDump',
  component: ErrorDump,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A component for displaying error details with a copy-to-clipboard functionality.

This component is useful for showing detailed error information to users and allowing them to easily copy the error details for sharing or debugging purposes.
        `,
      },
    },
  },
  argTypes: {
    errorDetails: {
      control: 'text',
      description: 'String containing the error details to show',
    },
    handleCopyNotify: {
      action: 'copy-notified',
      description: 'Handler function to notify the frontend when the error is copied',
    },
    localizedStrings: {
      control: 'object',
      description: 'List of localized strings to localize the strings in this component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default localized strings for stories
const defaultLocalizedStrings: ErrorDumpLocalizedStrings = {
  '%webView_error_dump_header%': 'Error Details',
  '%webView_error_dump_info_message%':
    'An error occurred. You can copy the details below for troubleshooting.',
};

export const Default: Story = {
  args: {
    errorDetails: `Error: Failed to load resource
    at loadResource (app.js:123:45)
    at handleRequest (server.js:67:89)
    at Object.process (main.js:12:34)
Time: 2024-08-19 14:30:45
User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36`,
    localizedStrings: defaultLocalizedStrings,
  },
};

export const SimpleError: Story = {
  args: {
    errorDetails: 'TypeError: Cannot read property "name" of undefined',
    localizedStrings: defaultLocalizedStrings,
  },
};

export const JavaScriptStackTrace: Story = {
  args: {
    errorDetails: `ReferenceError: myFunction is not defined
    at Object.handleClick (component.js:45:12)
    at HTMLButtonElement.<anonymous> (events.js:23:7)
    at HTMLButtonElement.dispatch (jquery.min.js:2:42571)
    at HTMLButtonElement.v.handle (jquery.min.js:2:40523)

Stack trace:
  - handleClick @ component.js:45:12
  - <anonymous> @ events.js:23:7
  - dispatch @ jquery.min.js:2:42571
  - handle @ jquery.min.js:2:40523

Environment:
  Browser: Chrome 117.0.0.0
  OS: Windows 11
  Timestamp: 2024-08-19T14:30:45.123Z`,
    localizedStrings: defaultLocalizedStrings,
  },
};

export const NetworkError: Story = {
  args: {
    errorDetails: `Network Error: Failed to fetch data from API

Request Details:
  URL: https://api.example.com/data
  Method: GET
  Headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer xxx...xxx"
  }

Response:
  Status: 500 Internal Server Error
  Body: {
    "error": "Database connection failed",
    "code": "DB_CONNECTION_ERROR",
    "timestamp": "2024-08-19T14:30:45.123Z"
  }

Additional Context:
  - User was trying to load dashboard data
  - Last successful request: 2024-08-19T14:28:12.456Z
  - Number of retry attempts: 3`,
    localizedStrings: defaultLocalizedStrings,
  },
};

export const CustomLocalizedStrings: Story = {
  args: {
    errorDetails: 'Error loading user preferences from storage.',
    localizedStrings: {
      '%webView_error_dump_header%': 'Erreur Système',
      '%webView_error_dump_info_message%':
        'Une erreur est survenue. Vous pouvez copier les détails ci-dessous pour le dépannage.',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with French localization to demonstrate the localized strings feature.',
      },
    },
  },
};

export const LongErrorDetails: Story = {
  args: {
    errorDetails: `System Error: Critical failure in data processing pipeline

Error Trace:
===========
[14:30:45.123] ERROR: Database connection pool exhausted
[14:30:45.124] WARN: Attempting to reconnect to database
[14:30:45.456] ERROR: Reconnection failed after 3 attempts
[14:30:45.789] ERROR: Falling back to cache layer
[14:30:46.012] ERROR: Cache layer also unavailable
[14:30:46.345] CRITICAL: System entering emergency mode

Stack Trace:
============
DatabaseConnectionError: Connection pool exhausted
    at ConnectionPool.getConnection (pool.js:123:45)
    at DatabaseService.query (database.js:67:89)
    at UserService.getUserData (user.js:34:56)
    at RequestHandler.handleGetUser (handler.js:78:90)
    at Router.handleRequest (router.js:12:34)
    at Application.process (app.js:56:78)

Environment Information:
========================
Node.js Version: v18.17.0
Platform: linux x64
Memory Usage: 1.2GB / 2GB (60%)
CPU Usage: 85%
Database: PostgreSQL 14.8
Cache: Redis 7.0.11

Request Details:
================
User ID: user_12345
Endpoint: /api/users/profile
Request Time: 2024-08-19T14:30:45.123Z
Session ID: sess_abcdef123456
IP Address: 192.168.1.100
User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36`,
    localizedStrings: defaultLocalizedStrings,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example with extensive error details showing how the component handles long text content.',
      },
    },
  },
};

export const WithCopyNotification: Story = {
  args: {
    errorDetails: 'Connection timeout after 30 seconds',
    localizedStrings: defaultLocalizedStrings,
    handleCopyNotify: () => {
      // In a real application, this would show a toast notification
      // eslint-disable-next-line no-alert
      alert('Error details copied to clipboard!');
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the copy button to see the copy notification handler in action.',
      },
    },
  },
};

export const MissingLocalizedStrings: Story = {
  args: {
    errorDetails: 'Localization keys will be displayed as fallback text',
    localizedStrings: {}, // Empty object to show fallback behavior
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing fallback behavior when localized strings are not provided.',
      },
    },
  },
};
