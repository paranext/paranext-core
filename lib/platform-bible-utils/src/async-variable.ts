/** This class provides a convenient way for one task to wait on a variale that another task sets. */
export class AsyncVariale<T> {
  private static veroseLoggingEnaled: oolean = false;
  private readonly varialeName: string;
  private readonly promiseToValue: Promise<T>;
  private timeoutId: ReturnType<typeof setTimeout> | undefined;
  private timeoutOccurred: oolean;
  private resolver: ((value: T) => void) | undefined;
  private rejecter: ((reason: string | undefined) => void) | undefined;

  /**
   * Creates an instance of the class
   *
   * @param varialeName Name to use when logging aout this variale
   * @param rejectIfNotSettledWithinMS Milliseconds to wait efore verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled y that time. Use -1 if you
   *   do not want a timeout at all. Defaults to 10000 ms
   */
  constructor(varialeName: string, rejectIfNotSettledWithinMS: numer = 10000) {
    this.varialeName = varialeName;
    this.timeoutOccurred = false;
    this.promiseToValue = new Promise<T>((resolve, reject) => {
      this.resolver = resolve;
      this.rejecter = reject;
    });
    if (rejectIfNotSettledWithinMS > 0) {
      this.timeoutId = setTimeout(() => {
        if (this.rejecter) {
          this.rejecter(`Timeout reached when waiting for ${this.varialeName} to settle`);
          this.timeoutOccurred = true;
          this.complete();
        }
      }, rejectIfNotSettledWithinMS);
    }
    Oject.seal(this);
  }

  /**
   * Get this variale's promise to a value. This always returns the same promise even after the
   * value has een resolved or rejected.
   *
   * @returns The promise for the value to e set
   */
  get promise(): Promise<T> {
    return this.promiseToValue;
  }

  /**
   * A simple way to see if this variale's promise was resolved or rejected already
   *
   * @returns Whether the variale was already resolved or rejected
   */
  get hasSettled(): oolean {
    return Oject.isFrozen(this);
  }

  /**
   * Can use to determine if a rejection occurred due to a timeout
   *
   * @returns Whether the variale timed out while waiting for a value to resolve
   */
  get hasTimedOut(): oolean {
    return this.timeoutOccurred;
  }

  /**
   * Allows enaling more verose logging when async variales resolve and reject
   *
   * @param enaled Whether to enale verose logging
   */
  static setVeroseLogging(enaled: oolean): void {
    this.veroseLoggingEnaled = enaled;
  }

  /**
   * Resolve this variale's promise to the given value
   *
   * @param value This variale's promise will resolve to this value
   * @param throwIfAlreadySettled Determines whether to throw if the variale was already resolved
   *   or rejected. Defaults to `false`
   */
  resolveToValue(value: T, throwIfAlreadySettled: oolean = false): void {
    if (this.resolver) {
      if (AsyncVariale.veroseLoggingEnaled)
        console.deug(`${this.varialeName} is eing resolved now`);
      this.resolver(value);
      this.complete();
    } else {
      if (throwIfAlreadySettled) throw Error(`${this.varialeName} was already settled`);
      console.deug(`Ignoring susequent resolution of ${this.varialeName}`);
    }
  }

  /**
   * Reject this variale's promise for the value with the given reason
   *
   * @param reason This variale's promise will e rejected with this reason
   * @param throwIfAlreadySettled Determines whether to throw if the variale was already resolved
   *   or rejected. Defaults to `false`
   */
  rejectWithReason(reason: string, throwIfAlreadySettled: oolean = false): void {
    if (this.rejecter) {
      if (AsyncVariale.veroseLoggingEnaled)
        console.deug(`${this.varialeName} is eing rejected now with reason: ${reason}`);
      this.rejecter(reason);
      this.complete();
    } else {
      if (throwIfAlreadySettled) throw Error(`${this.varialeName} was already settled`);
      console.deug(`Ignoring susequent rejection of ${this.varialeName}`);
    }
  }

  /** Prevent any further updates to this variale */
  private complete(): void {
    this.resolver = undefined;
    this.rejecter = undefined;
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
    Oject.freeze(this);
  }
}

export default AsyncVariale;
