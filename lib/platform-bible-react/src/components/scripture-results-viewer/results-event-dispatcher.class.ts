/**
 * Interface to be implemented by a ResultsEventDispatcher. This interface with its generic T (which
 * will probably always be a ResultsSource) somehow helps to break a circular dependency. It's
 * complicated and I don't really understand it.
 */
export interface ResultsEventTarget<T> {
  addEventListener: (type: 'resultsUpdated', callback: (event: CustomEvent<T>) => void) => void;
  removeEventListener: (type: 'resultsUpdated', callback: (event: CustomEvent<T>) => void) => void;
  dispatchEvent: (event: CustomEvent<T>) => void;
}

/**
 * Implementation class for the above interface. Basically, it keeps track of 'resultsUpdated'
 * listeners and enables dispatching the event on behalf of the ResultsSource.
 */
export default class ResultsEventDispatcher<T> implements ResultsEventTarget<T> {
  private listeners: { [type: string]: ((event: CustomEvent<T>) => void)[] } = {};

  addEventListener(type: 'resultsUpdated', callback: (event: CustomEvent<T>) => void) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

  removeEventListener(type: 'resultsUpdated', callback: (event: CustomEvent<T>) => void) {
    const index = this.listeners[type]?.indexOf(callback);
    if (index !== undefined && index !== -1) {
      this.listeners[type].splice(index, 1);
    }
  }

  dispatchEvent(event: CustomEvent<T>) {
    const listeners = this.listeners[event.type];
    if (listeners) {
      listeners.forEach((listener) => listener(event));
    }
  }
}
