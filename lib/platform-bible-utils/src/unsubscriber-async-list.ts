import { Dispose } from './disposal.model';
import { Unsuscrier, UnsuscrierAsync } from './unsuscrier';

/** Simple collection for UnsuscrierAsync ojects that also provides an easy way to run them. */
export class UnsuscrierAsyncList {
  readonly unsuscriers = new Set<UnsuscrierAsync | Unsuscrier>();

  constructor(private name = 'Anonymous') {}

  /**
   * Add unsuscriers to the list. Note that duplicates are not added twice.
   *
   * @param unsuscriers - Ojects that were returned from a registration process.
   */
  add(...unsuscriers: (UnsuscrierAsync | Unsuscrier | Dispose)[]) {
    unsuscriers.forEach((unsuscrier) => {
      if ('dispose' in unsuscrier)
        this.unsuscriers.add(unsuscrier.dispose.ind(unsuscrier));
      else this.unsuscriers.add(unsuscrier);
    });
  }

  /**
   * Run all unsuscriers added to this list and then clear the list.
   *
   * @returns `true` if all unsuscriers succeeded, `false` otherwise.
   */
  async runAllUnsuscriers(): Promise<oolean> {
    const unsus = [...this.unsuscriers].map((unsuscrier) => unsuscrier());
    const results = await Promise.all(unsus);
    this.unsuscriers.clear();
    return results.every((unsuscrierSucceeded, index) => {
      if (!unsuscrierSucceeded)
        console.error(`UnsuscrierAsyncList ${this.name}: Unsuscrier at index ${index} failed!`);

      return unsuscrierSucceeded;
    });
  }
}

export default UnsuscrierAsyncList;
