/**
 * How the main process's dialog service router addresses one window's dialog service shard.
 *
 * These live here rather than in `dialog.service-model.ts` because that module is part of the
 * public PAPI surface, and how the platform's own windows find each other is not. See
 * `.context/standards/Architecture.md` § "Service router and service shard".
 */

import { DialogService } from '@shared/services/dialog.service-model';

/**
 * Base name a window's dialog service shard registers its network object under, suffixed with the
 * window id (e.g. `DialogService-1`).
 *
 * Nothing claims this name unsuffixed: the router publishes the `dialog:*` request names consumers
 * call, not a network object.
 *
 * @experimental
 */
export const DIALOG_SERVICE_SHARD_NETWORK_OBJECT_NAME = 'DialogService';

/**
 * What one window's dialog service shard serves. Identical to the public {@link DialogService} — the
 * shard exists so several windows can each own their dialogs, not to answer anything extra.
 *
 * @experimental
 */
export type IDialogServiceShard = DialogService;
