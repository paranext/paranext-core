/** This class provides a convenient way for one task to wait on a variable that another task sets. */
export default class AsyncVariable<T> {
  private readonly variableName: string;
  private readonly promiseToValue: Promise<T>;
  private resolver: ((value: T) => void) | undefined;
  private rejecter: ((reason: string | undefined) => void) | undefined;

  /**
   * Creates an instance of the class
   *
   * @param variableName Name to use when logging about this variable
   * @param rejectIfNotSettledWithinMS Milliseconds to wait before verifying if the promise was
   *   settled (resolved or rejected); will reject if it has not settled by that time. Use -1 if you
   *   do not want a timeout at all.
   */
  constructor(variableName: string, rejectIfNotSettledWithinMS: number = 10000) {
    this.variableName = variableName;
    this.promiseToValue = new Promise<T>((resolve, reject) => {
      this.resolver = resolve;
      this.rejecter = reject;
    });
    if (rejectIfNotSettledWithinMS > 0) {
      setTimeout(() => {
        if (this.rejecter) {
          this.rejecter(`Timeout reached when waiting for ${this.variableName} to settle`);
          this.complete();
        }
      }, rejectIfNotSettledWithinMS);
    }
    Object.seal(this);
  }

  /**
   * Get this variable's promise to a value. This always returns the same promise even after the
   * value has been resolved or rejected.
   *
   * @returns The promise for the value to be set
   */
  get promise(): Promise<T> {
    return this.promiseToValue;
  }

  /**
   * A simple way to see if this variable's promise was resolved or rejected already
   *
   * @returns Whether the variable was already resolved or rejected
   */
  get hasSettled(): boolean {
    return Object.isFrozen(this);
  }

  /**
   * Resolve this variable's promise to the given value
   *
   * @param value This variable's promise will resolve to this value
   * @param throwIfAlreadySettled Determines whether to throw if the variable was already resolved
   *   or rejected
   */
  resolveToValue(value: T, throwIfAlreadySettled: boolean = false): void {
    if (this.resolver) {
      console.debug(`${this.variableName} is being resolved now`);
      this.resolver(value);
      this.complete();
    } else {
      if (throwIfAlreadySettled) throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent resolution of ${this.variableName}`);
    }
  }

  /**
   * Reject this variable's promise for the value with the given reason
   *
   * @param reason This variable's promise will be rejected with this reason
   * @param throwIfAlreadySettled Determines whether to throw if the variable was already resolved
   *   or rejected
   */
  rejectWithReason(reason: string, throwIfAlreadySettled: boolean = false): void {
    if (this.rejecter) {
      console.debug(`${this.variableName} is being rejected now`);
      this.rejecter(reason);
      this.complete();
    } else {
      if (throwIfAlreadySettled) throw Error(`${this.variableName} was already settled`);
      console.debug(`Ignoring subsequent rejection of ${this.variableName}`);
    }
  }

  /** Prevent any further updates to this variable */
  private complete(): void {
    this.resolver = undefined;
    this.rejecter = undefined;
    Object.freeze(this);
  }
}
