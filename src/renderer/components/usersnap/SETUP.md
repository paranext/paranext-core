# UserSnap Setup Guide

## Quick Start

1. **Get your UserSnap API keys:**

   - Sign up at [UserSnap.com](https://usersnap.com)
   - Create a new project
   - Go to Installation/Settings and copy your API keys

2. **Configure the API keys:**
   Edit `src/renderer/components/usersnap/usersnap.constants.ts`:

   ```typescript
   export const USERSNAP_SPACE_API_KEY = 'your-space-api-key-here';
   export const USERSNAP_PROJECT_API_KEY = 'your-project-api-key-here';
   export const USERSNAP_PROJECT_API_EVENT_NAME = 'feedback-requested';
   ```

3. **Start the application:**

   ```bash
   npm start
   ```

4. **Test the integration:**
   - Look for the feedback button (message square icon) in the toolbar
   - Click it to open the UserSnap feedback widget
   - Submit a test feedback to verify it's working

## Configuration Options

### UserSnap Dashboard Settings

For the best experience with Electron, configure your UserSnap project with these settings:

1. **Display Rules:**

   - Set trigger to "Auto Popup"
   - Add an API event trigger with the name from `USERSNAP_PROJECT_API_EVENT_NAME`

2. **Widget Configuration:**

   - Enable screenshot functionality
   - Configure form fields as needed (description, email, etc.)
   - Set up categories if desired

3. **Integrations:**
   - Connect to your bug tracking system (Jira, GitHub Issues, etc.)
   - Set up email notifications

### Paranext Configuration

The integration is configured with Electron-optimized settings:

- Native screenshots for better performance
- No geolocation collection for privacy
- System fonts for better integration
- Local storage enabled for user experience

## Troubleshooting

### Widget Not Appearing

- Check browser console for errors
- Verify API keys are correct
- Check network connectivity
- Ensure UserSnap dashboard display rules allow the widget to show

### Screenshots Not Working

- UserSnap uses native screenshot capability in Electron
- Check Electron permissions
- Try different screenshot modes in UserSnap dashboard

### Feedback Not Submitting

- Check network connectivity
- Verify project is active in UserSnap dashboard
- Check browser console for API errors

## Support

- UserSnap Documentation: https://help.usersnap.com/
- UserSnap Support: help@usersnap.com
- For Paranext-specific issues, check the README.md in the usersnap component folder
