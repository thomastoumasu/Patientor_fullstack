// Principle: Infer internal types from external types schemata defined with zod.
// Exception from principle: Patient. Reason for exception: To be reminded that it can be done differently.
import * as z from "zod";

// Patient related
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date().optional(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof newPatientSchema>;

export interface Patient {
  // or keep the principle and simply extend NewPatient
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

// Diagnosis related
const diagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export type Diagnosis = z.infer<typeof diagnosisSchema>;

// Entry-related
const baseEntrySchema = z.object({
  date: z.string().date(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(diagnosisSchema.shape.code).optional(),
});

const sickLeave = z.object({
  startDate: z.string().date(),
  endDate: z.string().date(),
});

const discharge = z.object({
  date: z.string().date(),
  criteria: z.string(),
});

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export enum EntryType {
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
}

export const healthCheckEntrySchema = baseEntrySchema.extend({
  // type: z.literal("HealthCheck"),
  type: z.literal(EntryType.HealthCheck),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  // type: z.literal("OccupationalHealthcare"),
  type: z.literal(EntryType.OccupationalHealthcare),
  employerName: z.string(),
  sickLeave: sickLeave.optional(),
});

export const hospitalEntrySchema = baseEntrySchema.extend({
  // type: z.literal("Hospital"),
  type: z.literal(EntryType.Hospital),
  discharge: discharge,
});

export const newEntrySchema = z.discriminatedUnion("type", [
  healthCheckEntrySchema,
  occupationalHealthcareEntrySchema,
  hospitalEntrySchema,
]);

export type NewEntry = z.infer<typeof newEntrySchema>;

export type Entry = NewEntry & { id: string };
