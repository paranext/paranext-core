import { useEffect } from 'react';
import type {
  SpaceOpenEventCallback,
  SpaceBeforeSubmitEventCallback,
  SpaceSubmitEventCallback,
  SpaceCloseEventCallback,
} from '@usersnap/browser';
import { useUsersnapApi } from './use-usersnap-api';

interface UsersnapEventHandlerProps {
  /** Called when the UserSnap widget starts opening */
  onOpen?: SpaceOpenEventCallback;
  /** Called before the feedback is submitted (can be used to add extra data) */
  onBeforeSubmit?: SpaceBeforeSubmitEventCallback;
  /** Called after the feedback is successfully submitted */
  onSubmit?: SpaceSubmitEventCallback;
  /** Called when the widget is closed */
  onClose?: SpaceCloseEventCallback;
}

/**
 * Component that handles UserSnap widget events. This component doesn't render anything, it just
 * sets up event listeners for the UserSnap widget. Use this to add custom behavior when users
 * interact with the feedback widget.
 */
export function UsersnapEventHandler({
  onOpen,
  onBeforeSubmit,
  onSubmit,
  onClose,
}: UsersnapEventHandlerProps) {
  const usersnapApi = useUsersnapApi();

  useEffect(() => {
    if (!usersnapApi) {
      return undefined;
    }

    // Set up event listeners
    if (onOpen) {
      usersnapApi.on('open', onOpen);
    }
    if (onBeforeSubmit) {
      usersnapApi.on('beforeSubmit', onBeforeSubmit);
    }
    if (onSubmit) {
      usersnapApi.on('submit', onSubmit);
    }
    if (onClose) {
      usersnapApi.on('close', onClose);
    }

    // Cleanup function to remove event listeners
    return () => {
      if (onOpen) {
        usersnapApi.off('open', onOpen);
      }
      if (onBeforeSubmit) {
        usersnapApi.off('beforeSubmit', onBeforeSubmit);
      }
      if (onSubmit) {
        usersnapApi.off('submit', onSubmit);
      }
      if (onClose) {
        usersnapApi.off('close', onClose);
      }
    };
  }, [usersnapApi, onOpen, onBeforeSubmit, onSubmit, onClose]);

  // This component doesn't render anything
  return undefined;
}
