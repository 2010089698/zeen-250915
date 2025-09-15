export type Shift = { id: string; startsAt: string; endsAt: string; capacity: number };
export interface ShiftRepo {
  byId(shiftId: string): Promise<Shift>;
}
