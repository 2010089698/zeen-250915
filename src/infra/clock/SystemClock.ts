import type { Clock } from "ports/Clock";

export class SystemClock implements Clock {
  now(): Date {
    return new Date();
  }
  isoNow(): string {
    return new Date().toISOString();
  }
}
