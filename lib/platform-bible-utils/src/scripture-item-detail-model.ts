import { ScriptureSelection } from 'scripture.model';

/**
 * Information (e.g., a checking error or some other type of "transient" annotation) about something
 * noteworthy at a specific place in an instance of the Scriptures.
 */
export type ScriptureItemDetail = ScriptureSelection & {
  /**
   * Text of the error, note, etc. In the future, we might want to support something more than just
   * text so that a JSX element could be provided with a link or some other controls related to the
   * issue being reported. That presumably can't be represented here in the model, unless we just
   * turn this into an "any" and determine the actual type at runtime.
   */
  detail: string;
};
