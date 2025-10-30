import * as z from "zod";

import type {
  Entry,
  healthCheckEntrySchema,
  occupationalHealthcareEntrySchema,
  hospitalEntrySchema,
} from "../shared/types";

export type HealthCheckEntry = z.infer<typeof healthCheckEntrySchema>;

export type OccupationalHealthcareEntry = z.infer<
  typeof occupationalHealthcareEntrySchema
>;

export type HospitalEntry = z.infer<typeof hospitalEntrySchema>;

export interface EntryFormRef {
  toggleVisibility: () => void;
}

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: Entry): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};
