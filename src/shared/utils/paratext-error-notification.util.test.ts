import { describe, expect, it } from 'vitest';
import {
  constructParatextErrorNotification,
  INTERNET_BLOCKED_NOTIFICATION_ID,
} from '@shared/utils/paratext-error-notification.util';

// ParatextData's own texts, as they arrive after crossing a process boundary.
const ALL_ACCESS_DISABLED_ERROR =
  'JSON-RPC Request error (-32000): Bug in Paratext caused attempted access to Internet. Request has been blocked.';
const SENSITIVE_LOCATION_ERROR =
  "JSON-RPC Request error (-32000): Exception of type 'Paratext.Data.VpnDisconnectedException' was thrown.";
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

  // A sensitive-location block is not the user having switched internet off, so it must not reuse
  // the "internet access is disabled" wording.
  it('gives a sensitive-location block its own message', () => {
    expect(constructParatextErrorNotification(SENSITIVE_LOCATION_ERROR)).toMatchObject({
      message: '%data_loading_error_internetAccess_sensitiveLocation%',
      clickCommand: 'paratextRegistration.showInternetSettings',
      notificationId: INTERNET_BLOCKED_NOTIFICATION_ID,
    });
  });

  // Both blocks are one machine-wide condition; a shared id keeps many failing subscriptions from
  // raising a toast each.
  it('reports both blocks under the same notification id', () => {
    expect(constructParatextErrorNotification(ALL_ACCESS_DISABLED_ERROR)?.notificationId).toBe(
      constructParatextErrorNotification(SENSITIVE_LOCATION_ERROR)?.notificationId,
    );
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
