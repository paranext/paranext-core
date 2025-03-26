/** Class that tracks how long it has taken the last N events to occur */
export class EventRollingTimeCounter {
  /** The ring buffer to store times */
  private readonly ringBuffer: number[];
  /** The size of the ring buffer */
  private readonly bufferSize: number;
  /** The next location where a time will be written */
  private writerIndex: number;
  /** The location where the first time in the buffer will be read */
  private readerIndex: number;
  /** The most recent difference in time between the newest and oldest events */
  private lastTimeDifference: number;
  /** How many instances in total have been recorded */
  private totalInstanceCount: number;

  /**
   * Create a new instance of the InstanceTimeCounter class
   *
   * @param bufferSize - Maximum number of instances to track
   */
  constructor(bufferSize: number) {
    this.bufferSize = bufferSize;
    this.ringBuffer = new Array(bufferSize).fill(0);
    this.writerIndex = 0;
    this.readerIndex = 0;
    this.lastTimeDifference = 0;
    this.totalInstanceCount = 0;
  }

  /** Get the total number of instances that have been recorded */
  get totalInstances(): number {
    return this.totalInstanceCount;
  }

  /** Add a new time measurement for an instance of an event */
  recordInstance(): void {
    this.totalInstanceCount += 1;
    const currentTime = performance.now();
    this.lastTimeDifference = currentTime - this.ringBuffer[this.readerIndex];

    this.ringBuffer[this.writerIndex] = currentTime;
    this.writerIndex += 1;
    if (this.writerIndex >= this.bufferSize) this.writerIndex %= this.bufferSize;
    if (this.writerIndex === this.readerIndex) {
      this.readerIndex += 1;
      if (this.readerIndex >= this.bufferSize) this.readerIndex %= this.bufferSize;
    }
  }

  /**
   * Check if the time between the last N events is less than the provided threshold
   *
   * @param minRollingTimeMs - Minimum time that must have passed when the last N events occurred
   * @returns - True if the threshold is violated, false otherwise
   */
  hasViolatedThreshold(minRollingTimeMs: number): boolean {
    return this.totalInstanceCount >= this.bufferSize && this.lastTimeDifference < minRollingTimeMs;
  }
}
