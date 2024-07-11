import { ScriptureItemDetail } from 'scripture-item-detail-model';
import { ScriptureCheckDefinition } from 'scripture.model';

/**
 * Represents a source of results keyed by Scripture reference. Generally, the source will be a
 * particular Scripture check, but this type also allows for other types of (uniquely identifiable
 * but potentially unnamed) sources.
 */
export type ResultsSource = {
  /**
   * Object that defines/describes the backing source associated with this results source, ensuring
   * that it can be uniquely identified.
   *
   * @type {string | ScriptureCheckDefinition}
   */
  src: string | ScriptureCheckDefinition;

  /**
   * Array of Scripture item details (messages keyed by Scripture reference).
   *
   * @type {ScriptureItemDetail[]}
   */
  data: ScriptureItemDetail[];
};
