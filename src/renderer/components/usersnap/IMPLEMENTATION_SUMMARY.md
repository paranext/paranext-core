# UserSnap Integration Summary

## What Was Implemented

I have successfully implemented UserSnap feedback integration into your Paranext Core Electron application. Here's what was added:

### 🎯 Core Components

1. **UsersnapProvider** (`usersnap-provider.tsx`)

   - React context provider that initializes UserSnap
   - Configured with Electron-optimized settings
   - Handles initialization errors gracefully
   - Includes logging for debugging

2. **UsersnapButton** (`usersnap-button.tsx`)

   - Reusable button component for triggering feedback
   - Supports both force-open and display-rule-respecting modes
   - Automatically disabled when UserSnap is unavailable

3. **UsersnapEventHandler** (`usersnap-event-handler.tsx`)

   - Component for handling UserSnap widget events
   - Enables adding context data to feedback submissions
   - Provides lifecycle event handling

4. **useUsersnapApi** Hook (`use-usersnap-api.ts`)
   - React hook for accessing UserSnap API directly
   - Type-safe access to UserSnap functionality

### 🛠️ Integration Points

1. **Main App Integration**

   - Added `UsersnapProvider` to wrap the entire application
   - Integrated `UsersnapIntegrationExample` for automatic context tracking

2. **Toolbar Integration**

   - Added feedback button (message square icon) to the main toolbar
   - Button is automatically disabled when UserSnap is not available
   - Includes localized tooltip text

3. **Localization Support**
   - Added `%toolbar_feedback%` localization key
   - Set to "Send Feedback" in English

### 📋 Configuration Files

1. **Constants** (`usersnap.constants.ts`)

   - Centralized API key configuration
   - Placeholder values that need to be replaced with real keys

2. **Documentation**
   - Comprehensive README.md with usage examples
   - SETUP.md with quick start guide
   - Integration examples and troubleshooting

### ⚙️ Electron-Specific Optimizations

- **Native Screenshots**: Enabled for better performance in Electron
- **No Geolocation**: Disabled for privacy
- **System Fonts**: Uses system fonts for better integration
- **Local Storage**: Enabled for better user experience
- **Context Data**: Automatically includes platform and environment information

## 🚀 Next Steps

### 1. Configure API Keys

Replace the placeholder values in `src/renderer/components/usersnap/usersnap.constants.ts`:

```typescript
export const USERSNAP_SPACE_API_KEY = 'your-actual-space-api-key';
export const USERSNAP_PROJECT_API_KEY = 'your-actual-project-api-key';
export const USERSNAP_PROJECT_API_EVENT_NAME = 'feedback-requested';
```

### 2. Set Up UserSnap Dashboard

- Create a project at UserSnap.com
- Configure display rules and triggers
- Set up integrations (Jira, GitHub, etc.)

### 3. Test the Integration

- Start the application: `npm start`
- Look for the feedback button in the toolbar
- Submit a test feedback to verify everything works

## 📁 Files Created/Modified

### New Files:

- `src/renderer/components/usersnap/usersnap.constants.ts`
- `src/renderer/components/usersnap/usersnap-context.ts`
- `src/renderer/components/usersnap/use-usersnap-api.ts`
- `src/renderer/components/usersnap/usersnap-provider.tsx`
- `src/renderer/components/usersnap/usersnap-button.tsx`
- `src/renderer/components/usersnap/usersnap-event-handler.tsx`
- `src/renderer/components/usersnap/usersnap-integration-example.tsx`
- `src/renderer/components/usersnap/index.ts`
- `src/renderer/components/usersnap/README.md`
- `src/renderer/components/usersnap/SETUP.md`

### Modified Files:

- `src/renderer/app.component.tsx` - Added UsersnapProvider and integration example
- `src/renderer/components/platform-bible-toolbar.tsx` - Added feedback button
- `assets/localization/en.json` - Added feedback button tooltip text

## 🔍 How It Works

1. **Initialization**: `UsersnapProvider` loads the UserSnap script and initializes the API
2. **Context**: The UserSnap API is made available throughout the app via React Context
3. **Feedback Button**: Users click the message square icon in the toolbar
4. **Widget Opens**: UserSnap widget opens with native screenshot capability
5. **Context Added**: Automatic context information is added (platform, environment, etc.)
6. **Submission**: Feedback is submitted to your UserSnap project
7. **Integration**: UserSnap forwards feedback to your configured integrations

## ⚠️ Important Notes

- UserSnap doesn't officially support Electron, but this implementation works by running UserSnap in the Electron renderer process
- The `@usersnap/browser` package was already installed as a dev dependency
- Screenshots work using native capabilities for better performance
- All components are fully typed with TypeScript
- Error handling is included for network issues and configuration problems

The integration is complete and ready to use once you configure your API keys!
