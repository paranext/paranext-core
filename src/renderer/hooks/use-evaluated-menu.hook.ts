import { useEffect, useMemo, useState } from 'react';
import { EvaluatableMenu, evaluateMenu, getErrorMessage } from 'platform-bible-utils';
import { contextKeysService } from '@shared/services/context-keys.service';
import { logger } from '@shared/services/logger.service';

/**
 * Evaluates the when-expressions in a menu document against current context keys and re-evaluates
 * whenever any context key changes.
 *
 * @param menuData The menu document to evaluate (pass a referentially stable object — e.g. state or
 *   memoized data)
 * @param templateVars Values for `{placeholder}` segments in expression property references. MUST
 *   be referentially stable (memoize in the caller) or the menu re-evaluates every render
 * @returns The evaluated menu document (hidden items removed, `disabled`/`checked` decorated), or
 *   `undefined` if `menuData` is `undefined`
 */
export function useEvaluatedMenu<T extends EvaluatableMenu>(
  menuData: T | undefined,
  templateVars: Record<string, string | undefined>,
): T | undefined {
  const [contextKeysVersion, setContextKeysVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = contextKeysService.onDidChange(() =>
      setContextKeysVersion((version) => version + 1),
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return useMemo(() => {
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
