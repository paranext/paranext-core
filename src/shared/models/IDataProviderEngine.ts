import { SelectorEventGenerator } from '@shared/models/PNetworkSelectorEventEmitter';

/**
 * The object to register with the DataProviderService to create a data provider.
 * The DataProviderService creates a IDataProvider on the papi that layers over this engine, providing special functionality
 *
 * Note: methods on objects that implement this interface must be unbound functions, not arrow functions.
 * @type `TSelector` - the type of selector used to get some data from this provider.
 *  A selector is an object a caller provides to the data provider to tell the provider what subset of data it wants.
 * @type `TData` - the type of data provided by this data provider based on a provided selector
 */

// TODO: fix this interface's usage in DataProviderService so you can use arrow functions? https://stackoverflow.com/questions/35686850/determine-if-a-javascript-function-is-a-bound-function
interface IDataProviderEngine<TSelector, TData> {
  /**
   * Set a subset of data according to the selector.
   * Run by the data provider on set
   * @param selector tells the provider what subset of data is being set
   * @param data the data to set at the selector
   * @returns true if successfully set (will send updates), false otherwise (will not send updates)
   */
  set: (selector: TSelector, data: TData) => Promise<boolean>;
  /**
   * Get a subset of data from the provider according to the selector.
   * Run by the data provider on get
   * @param selector tells the provider what subset of data to get
   * @returns the subset of data represented by the selector
   */
  get: (selector: TSelector) => Promise<TData>;
  /**
   * Generates data updates for each listener based on what was updated and what listeners are listening for.
   * Run by the data provider on set if the data was updated
   * @param setSelector selector for the set operation that caused an update - represents what changed for this update
   * @param listenerSelectors array of the selector for each listener subscribed to this data provider - represents what each listener is listening for
   * @returns array of update information for each listener including whether or not an update should be sent to that listener and what that update data is.
   *   Each index in this array should correspond to the same index in the listenerSelectors array
   */
  generateUpdates: SelectorEventGenerator<TSelector, TData>;
}

export default IDataProviderEngine;

// TODO: Please remove this test code
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TestGreetingsDataProviderEngine
  implements IDataProviderEngine<string, string>
{
  people: { [name: string]: string } = {
    bill: 'Hi, my name is Bill!',
    kathy: 'Hello. My name is Kathy.',
  };

  async set(selector: string, data: string) {
    // Don't change someone's greeting, you heathen!
    if (await this.get(selector)) return false;

    this.people[selector] = data;
    return true;
  }

  async get(selector: string) {
    return this.people[selector];
  }

  async generateUpdates(setSelector: string, listenerSelectors: string[]) {
    const data = await this.get(setSelector);
    const update = { shouldUpdate: true, event: data };
    return listenerSelectors.map((sel) => setSelector === sel && update);
  }
}
