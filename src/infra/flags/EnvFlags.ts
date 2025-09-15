import type { Flags } from "ports/Flags";

export class EnvFlags implements Flags {
  constructor(private readonly env: Record<string, string | undefined>) {}
  isEnabled(name: string): boolean {
    const v = this.env[`EXPO_PUBLIC_FLAG_${name.toUpperCase()}`];
    return v === "1" || v?.toLowerCase() === "true";
  }
}
