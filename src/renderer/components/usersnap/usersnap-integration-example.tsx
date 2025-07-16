import { useEffect } from 'react';
import type { SpaceOpenEventCallback, SpaceSubmitEventCallback } from '@usersnap/browser';
import { UsersnapEventHandler, useUsersnapApi } from '@renderer/components/usersnap';
import { logger } from '@shared/services/logger.service';

/**
 * Example component demonstrating UserSnap integration. This component sets up event handlers to
 * track feedback usage and automatically add context information to feedback submissions.
 */
export function UsersnapIntegrationExample() {
  const usersnapApi = useUsersnapApi();

  // Handle when the widget opens - add context information
  const handleWidgetOpen: SpaceOpenEventCallback = (event) => {
    logger.info('UserSnap feedback widget opened');

    // Add useful context information to the feedback using the custom field
    // UserSnap allows setting custom data which will be included with the feedback
    const contextData = {
      app_version: 'unknown', // Could be set from app version if available
      platform: 'electron',
      environment: globalThis.isNoisyDevModeEnabled ? 'development' : 'production',
      session_time: new Date().toISOString(),
      user_agent: navigator.userAgent,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
    };

    // Set the custom data - this will be included with the feedback submission
    event.api.setValue('custom', contextData);
  };

  // Handle when feedback is submitted
  const handleFeedbackSubmit: SpaceSubmitEventCallback = (event) => {
    logger.info('UserSnap feedback submitted successfully', event);
  };

  // Example of using the UserSnap API directly
  useEffect(() => {
    if (usersnapApi) {
      logger.debug('UserSnap API is available and ready to use');
    }
  }, [usersnapApi]);

  return <UsersnapEventHandler onOpen={handleWidgetOpen} onSubmit={handleFeedbackSubmit} />;
}
