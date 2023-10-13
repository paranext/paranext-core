import { DialogTabTypes, DialogTypes } from '@renderer/components/dialogs/dialog.data';
import dialogService from '@shared/services/dialog.service';
import { getErrorMessage } from '@shared/utils/util';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Enables using `papi.dialogs` in React more easily. Provides a callback to run to get a response
 * from a dialog as well as states that indicate the dialog's response and whether the dialog is
 * open.
 *
 * Calling the dialog callback returned from this hook does nothing if you already previously opened
 * the dialog and have not received a response
 *
 * @param dialogType dialog type you want to show on the screen
 *
 *    WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not
 *    be updated every render
 * @param options various options for configuring the dialog that shows
 *
 *    WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not
 *    be updated every render
 * @param defaultResponse the starting value for the response. Once a response is received, this is
 * no longer used. Defaults to `undefined`
 *
 * @returns `[response, showDialogCallback, errorMessage, isShowingDialog]`
 *  - `response` - the response from the dialog or `defaultResponse` if the dialog has not been
 *      shown and a response received yet. DOES NOT reset every time the callback is run
 *  - `showDialogCallback` - callback to run to show the dialog to prompt the user for a response
 *  - `errorMessage` - the error from the dialog if there is an error while calling the dialog or
 *      `undefined` if there is no error. DOES reset to `undefined` every time the callback is run
 *  - `isShowingDialog` - whether this dialog is showing (the callback has been run but has not
 *      responded)
 *
 * @type `DialogTabType` the dialog type you are using. Should be inferred by parameters
 * @type `TResponse` the type that the response can be. If you do not specify a `defaultResponse`,
 * this can be the dialog response type or undefined. If you specify a `defaultResponse`, this will
 * be just the dialog response type. Should be inferred by parameters.
 *  - This mostly works. Unfortunately, if you specify a literal as `defaultResponse`, `TResponse`
 *    then becomes that literal instead of being the dialog response type. You can type assert it
 *    to the appropriate type. Let us know if you run into an issue with this!
 *
 */
function useDialogCallback<
  DialogTabType extends DialogTabTypes,
  TResponse extends DialogTypes[DialogTabType]['responseType'] | undefined =
    | DialogTypes[DialogTabType]['responseType']
    | undefined,
>(
  dialogType: DialogTabType,
  options?: DialogTypes[DialogTabType]['options'],
  defaultResponse?: TResponse,
): [TResponse, () => Promise<void>, string | undefined, boolean] {
  // Keep track of whether we're mounted so we don't run stuff after unmount
  const mounted = useRef<boolean>(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // Since `defaultResponse` could be not specified which is equivalent to undefined, we need to
  // type assert to tell TS that undefined will be part of `TResponse` if `defaultResponse` is not
  // specified but is not otherwise
  const [response, setResponse] = useState(defaultResponse as TResponse);
  const [isShowingDialog, setIsShowingDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const showDialog = useCallback(async () => {
    if (!isShowingDialog) {
      setIsShowingDialog(true);
      try {
        // Looks like we need to assert here because it can't tell this is a TResponse. It can just
        // tell that it is the dialog response type, which does not include undefined
        const dialogResponse = (await dialogService.getFromUser(dialogType, options)) as TResponse;
        if (mounted.current) {
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
