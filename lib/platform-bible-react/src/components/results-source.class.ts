import { ScriptureCheckDefinition, ScriptureItemDetail } from 'platform-bible-utils';
import ResultsEventDispatcher, { ResultsEventTarget } from './results-events-dispatcher.class';

export default class ResultsSource {
  id: string;
  checkDefinition?: ScriptureCheckDefinition;
  data: ScriptureItemDetail[];
  resultsUpdated: ResultsEventTarget<ResultsSource>;

  constructor(
    initialData: ScriptureItemDetail[],
    id?: string,
    checkDefinition?: ScriptureCheckDefinition,
  ) {
    if (checkDefinition) {
      this.id = checkDefinition.id;
      this.checkDefinition = checkDefinition;
    } else {
      if (!id) throw new Error("Either 'id' or 'checkDefinition' must be provided.");
      this.id = id;
    }

    this.data = initialData;
    this.resultsUpdated = new ResultsEventDispatcher<ResultsSource>();
  }

  updateData(newData: ScriptureItemDetail[]) {
    this.data = newData;
    const event: CustomEvent<ResultsSource> = new CustomEvent('resultsUpdated', {
      detail: this,
    });
    this.resultsUpdated.dispatchEvent(event);
  }

  addEventListener(type: 'resultsUpdated', listener: (event: CustomEvent<ResultsSource>) => void) {
    this.resultsUpdated.addEventListener(type, listener);
  }

  removeEventListener(
    type: 'resultsUpdated',
    listener: (event: CustomEvent<ResultsSource>) => void,
  ) {
    this.resultsUpdated.removeEventListener(type, listener);
  }
}
