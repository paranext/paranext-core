# UserSnap Integration

This document describes the UserSnap feedback widget integration in Paranext Core.

## Overview

UserSnap is a feedback and bug reporting tool that allows users to provide feedback directly from within the application. Even though UserSnap doesn't officially support Electron, this integration works by using the `@usersnap/browser` package within the Electron renderer process.

## Setup

### 1. Configure API Keys

You need to configure your UserSnap API keys in the constants file:

```typescript
// src/renderer/components/usersnap/usersnap.constants.ts
export const USERSNAP_SPACE_API_KEY = 'your-space-api-key-here';
export const USERSNAP_PROJECT_API_KEY = 'your-project-api-key-here';
export const USERSNAP_PROJECT_API_EVENT_NAME = 'your-api-event-name-here';
```

### 2. Get Your API Keys

1. Sign up or log in to [UserSnap](https://usersnap.com)
2. Create a new project or navigate to an existing one
3. Go to the project settings/installation page
4. Copy the Space API Key and Project API Key
5. If you want to use API events (for the custom button), set up an API event trigger in the UserSnap dashboard

## Features

### Automatic Integration

The `UsersnapProvider` is already integrated into the main App component, which means UserSnap is available throughout the application.

### Feedback Button in Toolbar

A feedback button (message square icon) has been added to the main toolbar. This button:

- Is automatically disabled when UserSnap is not available
- Opens the feedback widget when clicked
- Ignores display rules to ensure it always works

### Components Available

1. **UsersnapProvider** - Context provider that initializes UserSnap
2. **UsersnapButton** - Customizable button component for triggering feedback
3. **UsersnapEventHandler** - Component for handling UserSnap events
4. **useUsersnapApi** - Hook for accessing the UserSnap API

## Usage Examples

### Custom Feedback Button

```tsx
import { UsersnapButton } from '@renderer/components/usersnap';

function MyComponent() {
  return (
    <UsersnapButton
      className="my-custom-class"
      forceOpen={true} // Ignores display rules
    >
      Send Feedback
    </UsersnapButton>
  );
}
```

### Handling UserSnap Events

```tsx
import { UsersnapEventHandler } from '@renderer/components/usersnap';

function MyComponent() {
  return (
    <UsersnapEventHandler
      onOpen={(event) => {
        console.log('UserSnap widget opened');
        // Add custom data to the feedback
        event.api.setValue('user_action', 'opened_from_my_component');
      }}
      onSubmit={(event) => {
        console.log('Feedback submitted successfully');
      }}
    />
  );
}
```

### Using the UserSnap API Directly

```tsx
import { useUsersnapApi } from '@renderer/components/usersnap';

function MyComponent() {
  const usersnapApi = useUsersnapApi();

  const handleCustomAction = () => {
    if (usersnapApi) {
      // Open widget with API event (respects display rules)
      usersnapApi.logEvent('custom-event-name');

      // Or force open (ignores display rules)
      usersnapApi.show('your-project-api-key');
    }
  };

  return <button onClick={handleCustomAction}>Custom Feedback Action</button>;
}
```

## Configuration Options

The UserSnap integration is configured with Electron-optimized settings:

- **nativeScreenshot: true** - Uses native screenshot capability for better performance
- **collectGeoLocation: 'none'** - Doesn't collect geo location for privacy
- **useSystemFonts: true** - Uses system fonts for better integration
- **useLocalStorage: true** - Allows local storage for better UX

You can override these settings by passing custom `initParams` to the `UsersnapProvider`.

## Troubleshooting

### UserSnap Not Loading

1. Check that your API keys are correctly configured
2. Check the browser console for any errors
3. Ensure you have internet connectivity
4. Check the logger output for UserSnap initialization messages

### Feedback Widget Not Opening

1. Check if you have display rules configured in UserSnap dashboard that might prevent the widget from showing
2. Use `forceOpen={true}` on the button to bypass display rules
3. Check if the UserSnap API is available (button should be disabled if not)

### Screenshots Not Working

UserSnap in Electron uses native screenshot functionality. If screenshots aren't working:

1. Check Electron permissions
2. Try setting `nativeScreenshot: false` in the init params
3. Check UserSnap documentation for Electron-specific issues

## Files

- `src/renderer/components/usersnap/usersnap.constants.ts` - API keys configuration
- `src/renderer/components/usersnap/usersnap-provider.tsx` - Main provider component
- `src/renderer/components/usersnap/usersnap-button.tsx` - Reusable button component
- `src/renderer/components/usersnap/usersnap-event-handler.tsx` - Event handling component
- `src/renderer/components/usersnap/use-usersnap-api.ts` - React hook for API access
- `src/renderer/components/usersnap/usersnap-context.ts` - React context definition
- `src/renderer/components/usersnap/index.ts` - Barrel export file

## Dependencies

- `@usersnap/browser` - Already included in package.json as a dev dependency
- `lucide-react` - For the MessageSquare icon (already included)
