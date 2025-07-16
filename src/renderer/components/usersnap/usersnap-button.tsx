import React from 'react';
import { useUsersnapApi } from './use-usersnap-api';
import { USERSNAP_PROJECT_API_KEY, USERSNAP_PROJECT_API_EVENT_NAME } from './usersnap.constants';

interface UsersnapButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  /**
   * If true, opens the widget ignoring display rules. If false, opens the widget respecting display
   * rules (URL, email filters, etc.). Default: false
   */
  forceOpen?: boolean;
}

/**
 * A button component that opens the UserSnap feedback widget. This button respects the UserSnap
 * display rules by default. Set forceOpen to true to ignore display rules.
 */
export function UsersnapButton({
  children,
  className = '',
  disabled = false,
  forceOpen = false,
}: UsersnapButtonProps) {
  const usersnapApi = useUsersnapApi();

  const handleClick = () => {
    if (!usersnapApi) {
      // eslint-disable-next-line no-console
      console.warn('UserSnap is not available');
      return;
    }

    if (forceOpen) {
      // This method ignores all display rules and opens the widget no matter what
      usersnapApi.show(USERSNAP_PROJECT_API_KEY);
    } else {
      // This method takes into account other display rules,
      // like filtering by URL path, email, logged in users and so on.
      // It means that even if you call this method but widget shouldn't
      // open based on the display rules - it will not open
      usersnapApi.logEvent(USERSNAP_PROJECT_API_EVENT_NAME);
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={disabled || !usersnapApi}
    >
      {children}
    </button>
  );
}
