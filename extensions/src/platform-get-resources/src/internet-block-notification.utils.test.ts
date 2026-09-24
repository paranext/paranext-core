import { describe, expect, it } from 'vitest';
import {
  getInternetBlockedNotification,
  INTERNET_BLOCKED_NOTIFICATION_ID,
} from './internet-block-notification.utils';

// ParatextData's own texts, as they arrive after crossing a process boundary.
const ALL_ACCESS_DISABLED_ERROR =
  'JSON-RPC Request error (-32000): Bug in Paratext caused attempted access to Internet. Request has been blocked.';

describe('getInternetBlockedNotification', () => {
  it('reports a "Disable all internet access" block with a link to the internet settings', () => {
    expect(getInternetBlockedNotification(new Error(ALL_ACCESS_DISABLED_ERROR))).toEqual({
      severity: 'error',
      message: '%data_loading_error_internetAccess_disabled_2%',
      clickCommandLabel: '%general_open%',
      clickCommand: 'paratextRegistration.showInternetSettings',
      notificationId: INTERNET_BLOCKED_NOTIFICATION_ID,
    });
  });

  // Pinned as a literal because core's `constructParatextErrorNotification`
  // (src/shared/utils/paratext-error-notification.util.ts) sends this same message under the same
  // string and cannot import it: changing this value without changing that one splits one block into
  // two notifications.
  it('shares its id with the notification core sends for the same block', () => {
    expect(INTERNET_BLOCKED_NOTIFICATION_ID).toBe('platform.internetBlocked');
  });

  it('ignores failures that are not internet blocks', () => {
    expect(
      getInternetBlockedNotification(
        new Error('JSON-RPC Request error (-32000): This resource is no longer available'),
      ),
    ).toBeUndefined();
    expect(
      getInternetBlockedNotification(
        'User registration is not valid. Cannot retrieve resources from DBL.',
      ),
    ).toBeUndefined();
  });
});
