export interface ResultsEventTarget<T> {
  addEventListener: (type: 'resultsUpdated', listener: (event: CustomEvent<T>) => void) => void;
  removeEventListener: (type: 'resultsUpdated', listener: (event: CustomEvent<T>) => void) => void;
  dispatchEvent: (event: CustomEvent<T>) => void;
}

export default class ResultsEventDispatcher<T> implements ResultsEventTarget<T> {
  private listeners: { [type: string]: ((event: CustomEvent<T>) => void)[] } = {};

  addEventListener(type: 'resultsUpdated', listener: (event: CustomEvent<T>) => void) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
  }

  removeEventListener(type: 'resultsUpdated', listener: (event: CustomEvent<T>) => void) {
    const index = this.listeners[type]?.indexOf(listener);
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
