import React, { createContext, useContext, useMemo } from "react";
import type { Deps } from "app/di";
import { createDeps } from "app/di";

const DepsContext = createContext<Deps | null>(null);

export function DepsProvider({ children }: { children: React.ReactNode }) {
  const deps = useMemo(() => createDeps(), []);
  return <DepsContext.Provider value={deps}>{children}</DepsContext.Provider>;
}

export function useDeps(): Deps {
  const ctx = useContext(DepsContext);
  if (!ctx) throw new Error("DepsProvider is missing");
  return ctx;
}
