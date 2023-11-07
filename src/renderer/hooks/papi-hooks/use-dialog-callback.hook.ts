import { DialogTabTypes, DialogTypes } from '@renderer/components/dialogs/dialog-definition.model';
import dialogService from '@shared/services/dialog.service';
import { getErrorMessage } from '@shared/utils/util';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Enables using `papi.dialogs.showDialog` in React more easily. Provides a callback to run to get a
 * response from a dialog as well as states that indicate the dialog's response and whether the
 * dialog is open.
 *
 * Calling the dialog callback returned from this hook does nothing if you already previously opened
 * the dialog and have not received a response
 *
 * @type `DialogTabType` The dialog type you are using. Should be inferred by parameters
 * @type `TResponse` The type that the response can be. If you do not specify a `defaultResponse`,
 *   this can be the dialog response type or `null`. If you specify a `defaultResponse`, this will
 *   be just the dialog response type. Should be inferred by parameters.
 *
 *   - This mostly works. Unfortunately, if you specify a literal as `defaultResponse`, `TResponse` then
 *       becomes that literal instead of being the dialog response type. You can type assert it to
 *       the appropriate type. Let us know if you run into an issue with this!
 *
 * @param dialogType Dialog type you want to show on the screen
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
 *   updated every render
 * @param options Various options for configuring the dialog that shows
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
 *   updated every render
 * @param defaultResponse The starting value for the response. Once a response is received, this is
 *   no longer used. Defaults to `null`
 * @returns `[response, showDialogCallback, errorMessage, isShowingDialog]`
 *
 *   - `response` - the response from the dialog or `defaultResponse` if a response has not been
 *       received (does not reset to `defaultResponse` if the user cancels the dialog). DOES NOT
 *       reset every time the callback is run
 *   - `showDialogCallback` - callback to run to show the dialog to prompt the user for a response. If
 *       this callback is run while the dialog is open, nothing happens
 *   - `errorMessage` - the error from the dialog if there is an error while calling the dialog or
 *       `undefined` if there is no error. DOES reset to `undefined` every time the callback is run
 *   - `isShowingDialog` - whether this dialog is showing (the callback has been run but has not
 *       responded)
 */
function useDialogCallback<
  DialogTabType extends DialogTabTypes,
  TResponse extends DialogTypes[DialogTabType]['responseType'] | null =
    | DialogTypes[DialogTabType]['responseType']
    | null,
>(
  dialogType: DialogTabType,
  options?: DialogTypes[DialogTabType]['options'],
  // Since `defaultResponse` could be unspecified which is equivalent to `null`, we need to
  // type assert to tell TS that `null` will be part of `TResponse` if `defaultResponse` is not
  // specified but is not otherwise
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  defaultResponse: TResponse = null as TResponse,
): [TResponse, () => Promise<void>, string | undefined, boolean] {
  // Keep track of whether we're mounted so we don't run stuff after unmount
  const mounted = useRef<boolean>(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const [response, setResponse] = useState(defaultResponse);
  const [isShowingDialog, setIsShowingDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const showDialog = useCallback(async () => {
    if (!isShowingDialog) {
      setIsShowingDialog(true);
      try {
        // Looks like we need to type assert here because it can't tell this is a TResponse. It can
        // just tell that it is the dialog response type, which does not include undefined
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const dialogResponse = (await dialogService.showDialog(
          dialogType,
          options,
        )) as TResponse | null;
        if (mounted.current) {
          if (dialogResponse !== null)
            // For now, let's only set the response value if the user didn't cancel. Maybe we can
            // expose an option for configuring this hook later if people want to reset to
            // `defaultResponse` on canceling the dialog
            setResponse(dialogResponse);
          setIsShowingDialog(false);
        }
      } catch (e) {
        if (mounted.current) {
          setErrorMessage(getErrorMessage(e));
          setIsShowingDialog(false);
        }
      }
    }
  }, [dialogType, options, isShowingDialog]);

  return [response, showDialog, errorMessage, isShowingDialog];
}

export default useDialogCallback;
