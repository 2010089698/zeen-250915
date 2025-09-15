import { ConsoleLogger } from "infra/logger/ConsoleLogger";
import { SystemClock } from "infra/clock/SystemClock";
import { EnvFlags } from "infra/flags/EnvFlags";
import type { Logger } from "ports/Logger";
import type { Clock } from "ports/Clock";
import type { Flags } from "ports/Flags";

export type Deps = {
  logger: Logger;
  clock: Clock;
  flags: Flags;
  // 後でここに repos を足す: assignments: AssignmentRepo; shifts: ShiftRepo; など
};

export function createDeps(): Deps {
  return {
    logger: new ConsoleLogger(),
    clock: new SystemClock(),
    flags: new EnvFlags(process.env as Record<string, string>)
  };
}
