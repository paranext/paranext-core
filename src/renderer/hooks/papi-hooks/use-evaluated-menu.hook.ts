import { useEffect, useMemo, useRef, useState } from 'react';
import { EvaluatableMenu, evaluateMenu, getErrorMessage } from 'platform-bible-utils';
import { contextKeysService } from '@shared/services/context-keys.service';
import { logger } from '@shared/services/logger.service';

/**
 * Evaluates the when-expressions (`when`, `enabledWhen`, `checkedWhen`) in a menu document against
 * the current context keys and re-evaluates on every context key change, local or remote. Use it in
 * a web view that renders its own menu and must react to keys it does not own.
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

  // The change sequence the committed evaluation saw; written only inside the memo so a render that
  // reuses the memoized result cannot advance it past that evaluation
  const evaluatedChangeSequenceRef = useRef(0);

  useEffect(() => {
    const unsubscribe = contextKeysService.onDidChange(() =>
      setContextKeysVersion((version) => version + 1),
    );
    // A key can change between the render that evaluated and this subscription (for example in a
    // sibling effect); re-evaluate only in that case so a plain mount evaluates once
    if (contextKeysService.getChangeSequence() !== evaluatedChangeSequenceRef.current)
      setContextKeysVersion((version) => version + 1);
    return () => {
      unsubscribe();
    };
  }, []);

  return useMemo(() => {
    evaluatedChangeSequenceRef.current = contextKeysService.getChangeSequence();
    if (!menuData) return undefined;
    return evaluateMenu(menuData, contextKeysService.get, templateVars, (expression, error) => {
      logger.warn(
        `Error evaluating menu when-expression '${expression}': ${getErrorMessage(error)}`,
      );
    });
    // contextKeysVersion intentionally triggers re-evaluation when any context key changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuData, templateVars, contextKeysVersion]);
}

export default useEvaluatedMenu;
