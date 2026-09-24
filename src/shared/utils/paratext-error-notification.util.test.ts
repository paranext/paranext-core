import { describe, expect, it } from 'vitest';
import {
  constructParatextErrorNotification,
  INTERNET_BLOCKED_NOTIFICATION_ID,
} from '@shared/utils/paratext-error-notification.util';

// ParatextData's own texts, as they arrive after crossing a process boundary.
const ALL_ACCESS_DISABLED_ERROR =
  'JSON-RPC Request error (-32000): Bug in Paratext caused attempted access to Internet. Request has been blocked.';
const AUTH_FAILURE_ERROR = 'User registration is not valid. Cannot retrieve resources from DBL.';

describe('constructParatextErrorNotification', () => {
  it('points an internet block at the setting that caused it', () => {
    expect(constructParatextErrorNotification(new Error(ALL_ACCESS_DISABLED_ERROR))).toEqual({
      severity: 'error',
      message: '%data_loading_error_internetAccess_disabled_2%',
      clickCommandLabel: '%general_open%',
      clickCommand: 'paratextRegistration.showInternetSettings',
      notificationId: INTERNET_BLOCKED_NOTIFICATION_ID,
    });
  });

  // Pinned as a literal because the platform-get-resources extension sends the same message under
  // this same string and cannot import it: changing one without the other splits one block into two
  // notifications.
  it('shares its id with the notification the Get Resources extension sends for the same block', () => {
    expect(INTERNET_BLOCKED_NOTIFICATION_ID).toBe('platform.internetBlocked');
  });

  it('sends an invalid registration to the registration screen instead', () => {
    expect(constructParatextErrorNotification(AUTH_FAILURE_ERROR)).toMatchObject({
      message: '%data_loading_error_paratextData_auth_failure%',
      clickCommand: 'paratextRegistration.showParatextRegistration',
    });
  });

  it('ignores failures the user cannot act on', () => {
    expect(
      constructParatextErrorNotification(new Error('Something else went wrong')),
    ).toBeUndefined();
  });
});
