import { DialogTabTypes, DialogTypes } from '@renderer/components/dialogs/dialog-definition.model';
import dialogService from '@shared/services/dialog.service';
import logger from '@shared/services/logger.service';
import { getErrorMessage } from '@shared/utils/util';
import { useCallback, useEffect, useRef } from 'react';

/**
 * Default callback to run when using useDialogCallback - just logs the error message and nothing
 * more
 *
 * @param error Error thrown while showing the dialog
 */
function logDialogError(error: unknown) {
  logger.error(getErrorMessage(error));
}

/**
 * Enables using `papi.dialogs.showDialog` in React more easily. Returns a callback to run that will
 * open a dialog with the provided `dialogType` and `options` then run the `resolveCallback` with
 * the dialog response or `rejectCallback` if there is an error.
 *
 * Calling the dialog callback returned from this hook multiple times opens multiple dialogs. If you
 * need to open multiple dialogs and track which dialog is which, you can add a counter to the
 * `options` when calling the callback, and `resolveCallback` will be resolved with that options
 * object including your counter.
 *
 * @type `DialogTabType` The dialog type you are using. Should be inferred by parameters
 * @param dialogType Dialog type you want to show on the screen
 *
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. This means that updating this parameter will not cause a new
 *   callback to be returned. However, because of the nature of calling dialogs, this has no adverse
 *   effect on the functionality of this hook. Calling the callback will always use the latest
 *   `dialogType`.
 * @param options Various options for configuring the dialog that shows. If an `options` parameter
 *   is also provided to the returned `showDialog` callback, those callback-provided `options` merge
 *   over these hook-provided `options`
 *
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. This means that updating this parameter will not cause a new
 *   callback to be returned. However, because of the nature of calling dialogs, this has no adverse
 *   effect on the functionality of this hook. Calling the callback will always use the latest
 *   `options`.
 * @param resolveCallback `(response, dialogType, options)` The function that will be called if the
 *   dialog request resolves properly
 *
 *   - `response` - the resolved value of the dialog call. Either the user's response or `undefined` if
 *       the user cancels
 *   - `dialogType` - the value of `dialogType` at the time that this dialog was called
 *   - `options` the `options` provided to the dialog at the time that this dialog was called. This
 *       consists of the `options` provided to the returned `showDialog` callback merged over the
 *       `options` provided to the hook
 *
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. This means that updating this parameter will not cause a new
 *   callback to be returned. However, because of the nature of calling dialogs, this has no adverse
 *   effect on the functionality of this hook. When the dialog resolves, it will always call the
 *   latest `resolveCallback`.
 * @param rejectCallback `(error, dialogType, options)` The function that will be called if the
 *   dialog request throws an error
 *
 *   - `error` - the error thrown while calling the dialog
 *   - `dialogType` - the value of `dialogType` at the time that this dialog was called
 *   - `options` the `options` provided to the dialog at the time that this dialog was called. This
 *       consists of the `options` provided to the returned `showDialog` callback merged over the
 *       `options` provided to the hook
 *
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. This means that updating this parameter will not cause a new
 *   callback to be returned. However, because of the nature of calling dialogs, this has no adverse
 *   effect on the functionality of this hook. If the dialog throws an error, it will always call
 *   the latest `rejectCallback`.
 * @returns `showDialog(options?)` - callback to run to show the dialog to prompt the user for a
 *   response
 *
 *   - `options?` - `options` object you may specify that will merge over the `options` you provide to
 *       the hook before passing to the dialog. All properties are optional, so you may specify as
 *       many or as few properties here as you want to overwrite the properties in the `options` you
 *       provide to the hook
 */
function useDialogCallback<DialogTabType extends DialogTabTypes>(
  dialogType: DialogTabType,
  options: DialogTypes[DialogTabType]['options'],
  resolveCallback: (
    response: DialogTypes[DialogTabType]['responseType'] | undefined,
    dialogType: DialogTabType,
    options: DialogTypes[DialogTabType]['options'],
  ) => void,
  rejectCallback: (
    error: unknown,
    dialogType: DialogTabType,
    options: DialogTypes[DialogTabType]['options'],
  ) => void = logDialogError,
): (options?: Partial<DialogTypes[DialogTabType]['options']>) => Promise<void> {
  // Use dialogType as a ref so it doesn't update dependency arrays
  const dialogTypeRef = useRef(dialogType);
  dialogTypeRef.current = dialogType;
  // Use options as a ref so it doesn't update dependency arrays
  const optionsRef = useRef(options);
  optionsRef.current = options;
  // Use resolveCallback as a ref so it doesn't update dependency arrays
  const resolveCallbackRef = useRef(resolveCallback);
  resolveCallbackRef.current = resolveCallback;
  // Use rejectCallback as a ref so it doesn't update dependency arrays
  const rejectCallbackRef = useRef(rejectCallback);
  rejectCallbackRef.current = rejectCallback;

  // Keep track of whether we're mounted so we don't run stuff after unmount
  const mounted = useRef<boolean>(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const showDialog = useCallback(
    async (showDialogOptions?: Partial<DialogTypes[DialogTabType]['options']>) => {
      // Save the current values of the dialog parameters from when the dialog was called so we can
      // pass the same values to the callbacks.
      // We could alternatively just use the parameters and put them in the hook deps, but that would
      // then cause this to return a different `showDialog` every time one of those updates, and that
      // is not as user-friendly. This way has basically zero downsides since neither of these
      // variables does anything that would need them to stay up-to-date within this callback like
      // updating the dialog's options while it is already showing or something
      const dialogTypeForCurrentDialog = dialogTypeRef.current;
      // Merge the options provided in this callback with the options provided in the hook, overwriting the hook's options with the callback's options
      const optionsForCurrentDialog = { ...optionsRef.current, ...showDialogOptions };

      try {
        const dialogResponse = await dialogService.showDialog(
          dialogTypeForCurrentDialog,
          optionsForCurrentDialog,
        );
        if (mounted.current) {
          resolveCallbackRef.current(
            dialogResponse,
            dialogTypeForCurrentDialog,
            optionsForCurrentDialog,
          );
        }
      } catch (e) {
        if (mounted.current) {
          rejectCallbackRef.current(e, dialogTypeForCurrentDialog, optionsForCurrentDialog);
        }
      }
    },
    [],
  );

  return showDialog;
}

export default useDialogCallback;
