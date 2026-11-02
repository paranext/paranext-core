import { EvaluatableMenu, WhenExpressionErrorHandler, evaluateMenu } from 'platform-bible-utils';
import { contextKeysService } from '@shared/services/context-keys.service';

/**
 * A menu evaluated against the current context keys, with the keys the evaluation actually read
 *
 * @experimental This type is unstable and may change or disappear without notice
 */
export type MenuEvaluationWithReads<T extends EvaluatableMenu> = {
  /** The evaluated menu, as {@link evaluateMenu} returns it */
  evaluatedMenu: T;
  /**
   * Every context key the evaluation looked up. A key outside this set cannot change the result
   * until a key inside it changes: unresolved template variables return before any lookup, and
   * `&&`/`||` short-circuit.
   */
  readKeys: ReadonlySet<string>;
};

/**
 * Evaluates a menu like {@link evaluateMenu} against the current context keys and reports which keys
 * the evaluation read, so a surface can skip re-evaluating when an unrelated key changes.
 *
 * @param menu The menu document to evaluate
 * @param templateVars Values for `{placeholder}` segments in expression property references
 * @param onError Called for each expression that fails to evaluate
 * @returns The evaluated menu and the set of keys it read
 * @experimental This function is unstable and may change or disappear without notice
 */
export function evaluateMenuRecordingReads<T extends EvaluatableMenu>(
  menu: T,
  templateVars: Record<string, string | undefined>,
  onError: WhenExpressionErrorHandler,
): MenuEvaluationWithReads<T> {
  const readKeys = new Set<string>();
  const evaluatedMenu = evaluateMenu(
    menu,
    (key) => {
      readKeys.add(key);
      return contextKeysService.get(key);
    },
    templateVars,
    onError,
  );
  return { evaluatedMenu, readKeys };
}
