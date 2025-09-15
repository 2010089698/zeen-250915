export type Assignment = { id: string; shiftId: string; personId: string; createdAt: string };
export interface AssignmentRepo {
  byShift(shiftId: string): Promise<Assignment[]>;
  add(input: { shiftId: string; personId: string }): Promise<void>;
}
