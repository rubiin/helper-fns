import type { FunctionType } from "./types";

/* The Semaphore class is a concurrency control mechanism that limits the number of concurrent
operations and queues the rest. */

class Semaphore {
  maxConcurrency: number;
  currentConcurrency: number;
  queue: any[];

  constructor(maxConcurrency: number) {
    this.maxConcurrency = maxConcurrency;
    this.currentConcurrency = 0;
    this.queue = [];
  }

  async acquire(): Promise<void> {
    return new Promise((resolve) => {
      if (this.currentConcurrency < this.maxConcurrency) {
        this.currentConcurrency++;
        resolve();
      }
      else {
        this.queue.push(resolve);
      }
    });
  }

  release() {
    if (this.queue.length > 0) {
      const resolve = this.queue.shift();
      resolve();
    }
    else {
      this.currentConcurrency--;
    }
  }
}

export function rateLimit(asyncFunction: FunctionType, rate: number): (...arguments_: any[]) => Promise<any> {
  if (!Number.isInteger(rate) || rate <= 0)
    throw new Error("Rate must be a positive integer");

  const semaphore = new Semaphore(rate);

  return async function process(...arguments_): Promise<any> {
    await semaphore.acquire();
    try {
      return asyncFunction(...arguments_);
    }
    finally {
      semaphore.release();
    }
  };
}
