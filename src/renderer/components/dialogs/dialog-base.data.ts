import { FloatSize, TabLoader, TabSaver } from '@shared/data/web-view.model';
import { DialogData } from '@shared/models/dialog-options.model';
import logger from '@shared/services/logger.service';
import { ReactElement, createElement } from 'react';

/** Base type for DialogDefinition. Contains reasonable defaults for dialogs */
export type DialogDefinitionBase = {
  /** Overwritten in {@link DialogDefinition}. Must be specified by all DialogDefinitions */
  tabType?: string;
  /** Overwritten in {@link DialogDefinition}. Must be specified by all DialogDefinitions */
  Component?: (props: DialogProps) => ReactElement;
  /**
   * The default icon for this dialog. This may be overridden by the `DialogOptions.title`
   *
   * Defaults to the Platform.Bible logo
   */
  defaultIconUrl?: string;
  /**
   * The default title for this dialog. This may be overridden by the `DialogOptions.title`
   *
   * Defaults to the DialogDefinition's `tabType`
   */
  defaultTitle?: string;
  /** The width and height at which the dialog will be loaded */
  initialSize: FloatSize;
  /** The minimum width to which the dialog can be set */
  minWidth?: number;
  /** The minimum height to which the dialog can be set */
  minHeight?: number;
  /**
   * The function used to load the dialog into the dock layout. Default uses the `Component` field
   * and passes in the `DialogProps`
   */
  loadDialog: TabLoader;
  /**
   * The function used to save the dialog into the dock layout
   *
   * Default does not save the dialog as they cannot properly be restored yet.
   *
   * TODO: preserve requests between refreshes - save the dialog info in such a way that it works
   * when loading again after refresh
   */
  saveDialog: TabSaver;
};

export type DialogProps<TData = unknown> = DialogData & {
  /**
   * Sends the data as a resolved response to the dialog request and closes the dialog
   *
   * @param data data with which to resolve the request
   */
  submitDialog(data: TData): void;
  /**
   * Rejects the dialog request with hte specified message
   *
   * @param errorMessage message to explain why the dialog request was rejected
   */
  cancelDialog(errorMessage: string): void;
};

/** The default initial size for dialogs. Can be overridden by a dialog's `initialSize` property */
const DIALOG_DEFAULT_SIZE: FloatSize = { width: 300, height: 300 };

/**
 * Resolve a dialog request
 *
 * This function is a reference holder and should be replaced by `dialog.service.host.ts` with its
 * `resolveDialogRequest` in `hookUpDialogService` as soon as possible. This is written this way to
 * mitigate dependency cycles
 */
let resolveDialogRequestInternal = (id: string, data: unknown): void => {
  throw new Error(
    `Dialog ${id} tried to resolve before being hooked up to the dialog service! This may indicate that the dialog service started after a dialog was submitted. data: ${JSON.stringify(
      data,
    )}`,
  );
};

/**
 * Resolve a dialog request
 *
 * This function should just run `dialog.service.host.ts`'s `resolveDialogRequest`
 */
function resolveDialogRequest(id: string, data: unknown) {
  return resolveDialogRequestInternal(id, data);
}

/**
 * Reject a dialog request. Synchronously rejects, then asynchronously closes the dialog
 *
 * This function is a reference holder and should be replaced by `dialog.service.host.ts` with its
 * `rejectDialogRequest` in `hookUpDialogService` as soon as possible. This is written this way to
 * mitigate dependency cycles
 */
let rejectDialogRequestInternal = (id: string, message: string, isFromDockLayout = false): void => {
  throw new Error(
    `Dialog ${id} tried to reject before being hooked up to the dialog service! This may indicate that the dialog service started after a dialog was canceled. message: ${JSON.stringify(
      message,
    )}. isFromDockLayout: ${isFromDockLayout}`,
  );
};

/**
 * Reject a dialog request. Synchronously rejects, then asynchronously closes the dialog
 *
 * This function should just run `dialog.service.host.ts`'s `rejectDialogRequest`
 */
function rejectDialogRequest(id: string, message: string, isFromDockLayout = false) {
  return rejectDialogRequestInternal(id, message, isFromDockLayout);
}

export function hookUpDialogService({
  resolveDialogRequest: resolve,
  rejectDialogRequest: reject,
}: {
  resolveDialogRequest: (id: string, data: unknown) => void;
  rejectDialogRequest: (id: string, message: string, isFromDockLayout?: boolean) => void;
}) {
  resolveDialogRequestInternal = resolve;
  rejectDialogRequestInternal = reject;
}

/**
 * Static definition of a dialog that can be shown in Platform.Bible
 *
 * For good defaults, dialogs can include all the properties of this dialog. Dialogs must then
 * specify `tabType` and `Component` in order to comply with `DialogDefinition`
 *
 * Note: this is not a class that can be inherited because all properties would be static but then
 * we would not be able to use the default `loadDialog` because it would be using a static reference
 * to a nonexistent `Component`. Instead of inheriting this as a class, any dialog definition can
 * spread this `{ ...DIALOG_BASE }`
 */
const DIALOG_BASE: DialogDefinitionBase = {
  initialSize: DIALOG_DEFAULT_SIZE,
  loadDialog(savedTabInfo) {
    const maybeTabData = savedTabInfo.data as DialogData | undefined;
    if (!maybeTabData || !maybeTabData.isDialog)
      logger.error(
        `Dialog ${
          this.tabType
        } received savedTabInfo without data.isDialog! Please investigate. This could be a sign of a problem, but we will try to move forward for now. savedTabInfo: ${JSON.stringify(
          savedTabInfo,
        )}`,
      );
    const tabData = maybeTabData as DialogData;
    return {
      ...savedTabInfo,
      tabIconUrl: tabData?.iconUrl || this.defaultIconUrl,
      // dialogs must define their own tabType, so this should never hit 'Dialog Title Error'.
      tabTitle: tabData?.title || this.defaultTitle || this.tabType || 'Dialog Title Error',
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      // dialogs must define their own Component. It will then be used in this default
      // implementation of `loadDialog`
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      content: createElement(this.Component!, {
        ...tabData,
        submitDialog: (data) => resolveDialogRequest(savedTabInfo.id, data),
        cancelDialog: (errorMessage) => rejectDialogRequest(savedTabInfo.id, errorMessage),
      }),
    };
  },
  saveDialog() {
    // TODO: preserve requests between refreshes - save the dialog info in such a way that it works
    // when loading again after refresh
    return undefined;
  },
};
Object.freeze(DIALOG_BASE);

export default DIALOG_BASE;
