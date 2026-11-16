import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { EvaluatableMenu, getErrorMessage } from 'platform-bible-utils';
import { contextKeysService } from '@shared/services/context-keys.service';
import { evaluateMenuRecordingReads } from '@shared/utils/evaluate-menu-recording-reads.util';
import { logger } from '@shared/services/logger.service';

const NO_READ_KEYS: ReadonlySet<string> = new Set();

/**
 * Evaluates the when-expressions (`when`, `enabledWhen`, `checkedWhen`) in a menu document against
 * the current context keys and re-evaluates when a context key it read changes, local or remote.
 * Use it in a web view that renders its own menu and must react to keys it does not own.
 *
 * @param menuData The menu document to evaluate (pass a referentially stable object, e.g. state or
 *   memoized data)
 * @param templateVars Values for `{placeholder}` segments in expression property references.
 *   `templateVars` MUST be referentially stable (memoize in the caller) or the menu re-evaluates on
 *   every render
 * @returns The evaluated menu document (hidden items removed, `disabled`/`checked` decorated), or
 *   `undefined` if `menuData` is `undefined`
 * @experimental This function is unstable and may change or disappear without notice
 */
export function useEvaluatedMenu<T extends EvaluatableMenu>(
  menuData: T | undefined,
  templateVars: Record<string, string | undefined>,
): T | undefined {
  const [contextKeysVersion, setContextKeysVersion] = useState(0);

  // The change sequence the shown evaluation saw; written only in the layout effect, so a render
  // React discards (a suspended transition, for example) cannot advance it past what is shown
  const evaluatedChangeSequenceRef = useRef(0);

  // The context keys the shown evaluation read; only a change to one of them can change the result,
  // so only those changes re-evaluate. Written only in the layout effect, for the reason above
  const readKeysRef = useRef<ReadonlySet<string>>(new Set());

  useEffect(() => {
    const unsubscribe = contextKeysService.onDidChange((event) => {
      if (readKeysRef.current.has(event.key)) setContextKeysVersion((version) => version + 1);
    });
    // A key can change between the layout effect and this subscription (for example in a sibling
    // effect); re-evaluate only in that case so a plain mount evaluates once
    if (contextKeysService.getChangeSequence() !== evaluatedChangeSequenceRef.current)
      setContextKeysVersion((version) => version + 1);
    return () => {
      unsubscribe();
    };
  }, []);

  const evaluation = useMemo(() => {
    const changeSequence = contextKeysService.getChangeSequence();
    if (!menuData) return { evaluatedMenu: undefined, readKeys: NO_READ_KEYS, changeSequence };
    const { evaluatedMenu, readKeys } = evaluateMenuRecordingReads(
      menuData,
      templateVars,
      (expression, error) => {
        logger.warn(
          `Error evaluating menu when-expression '${expression}': ${getErrorMessage(error)}`,
        );
      },
    );
    return { evaluatedMenu, readKeys, changeSequence };
    // contextKeysVersion intentionally triggers re-evaluation when a context key it read changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuData, templateVars, contextKeysVersion]);

  // Runs only for a render React shows. A key that changed after the evaluation read it (before the
  // subscription existed, or between a discarded render and this one) is caught here.
  useLayoutEffect(() => {
    readKeysRef.current = evaluation.readKeys;
    evaluatedChangeSequenceRef.current = evaluation.changeSequence;
    if (contextKeysService.getChangeSequence() !== evaluation.changeSequence)
      setContextKeysVersion((version) => version + 1);
  }, [evaluation]);

  return evaluation.evaluatedMenu;
}

export default useEvaluatedMenu;
