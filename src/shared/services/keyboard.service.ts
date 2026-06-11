// === NEW IN PT10 === (keyboard-switching CAP-008)
// RED-state stub created by the TDD test writer: the consumer wrapper must resolve the
// `platform.keyboard` data provider via `dataProviderService.get` and expose the ergonomic
// `IKeyboardService` surface plus sync-proxied members (precedent: theme.service.ts).
// The GREEN implementer replaces the throwing initializer with the real resolution.

import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import { IKeyboardService } from '@shared/services/keyboard.service-model';

/** JSDOC DESTINATION keyboardService */
export const keyboardService = createSyncProxyForAsyncObject<IKeyboardService>(async () => {
  // RED stub — GREEN implementer (CAP-008) resolves the platform.keyboard data provider here
  throw new Error('Not implemented (CAP-008 RED stub): keyboard.service consumer wrapper');
});
