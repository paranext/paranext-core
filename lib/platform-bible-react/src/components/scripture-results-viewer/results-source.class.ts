import { ScriptureCheckDefinition, ScriptureItemDetail } from 'platform-bible-utils';
import ResultsEventDispatcher, { ResultsEventTarget } from './results-event-dispatcher.class';

/**
 * Class representing a source of results keyed by Scripture reference. Generally, the source will
 * be a particular Scripture check, but this class also allows for other types of (uniquely
 * identifiable but potentially unnamed) sources. It handles storing and updating Scripture item
 * details and notifies listeners about updates.
 */
export default class ResultsSource {
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

  /**
   * Event target for dispatching results-updated events.
   *
   * @type {ResultsEventTarget<ResultsSource>}
   */
  resultsUpdated: ResultsEventTarget<ResultsSource>;

  /**
   * Creates an instance of ResultsSource.
   *
   * @param {string | ScriptureCheckDefinition} [source] - Object that defines/describes the backing
   *   source associated with this results source, ensuring that it can be uniquely identified
   * @param {ScriptureItemDetail[]} initialData - Initial data for the results source.
   */
  constructor(source: string | ScriptureCheckDefinition, initialData: ScriptureItemDetail[]) {
    this.src = source;
    this.data = initialData;
    this.resultsUpdated = new ResultsEventDispatcher<ResultsSource>();
  }

  /**
   * Updates the results data with new Scripture item details and dispatches a 'resultsUpdated'
   * event.
   */
  updateData(newData: ScriptureItemDetail[]) {
    this.data = newData;
    const event: CustomEvent<ResultsSource> = new CustomEvent('resultsUpdated', {
      detail: this,
    });
    this.resultsUpdated.dispatchEvent(event);
  }

  /**
   * Adds an event listener to receive notification when the results for this source are updated.
   *
   * @param {'resultsUpdated'} type - Type of the event to listen for (always 'resultsUpdated').
   * @param {(event: CustomEvent<ResultsSource>) => void} callback - Function to call when the event
   *   is dispatched.
   */
  addEventListener(type: 'resultsUpdated', callback: (event: CustomEvent<ResultsSource>) => void) {
    this.resultsUpdated.addEventListener(type, callback);
  }

  /**
   * Removes a 'resultsUpdated' event listener.
   *
   * @param {'resultsUpdated'} type - Type of the event to remove the listener for (always
   *   'resultsUpdated').
   * @param {(event: CustomEvent<ResultsSource>) => void} callback - Listener callback function to
   *   remove.
   */
  removeEventListener(
    type: 'resultsUpdated',
    callback: (event: CustomEvent<ResultsSource>) => void,
  ) {
    this.resultsUpdated.removeEventListener(type, callback);
  }
}
