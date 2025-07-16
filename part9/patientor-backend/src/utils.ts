import { NewPatient, Gender, Entry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, Diagnose } from './types';
import { v1 as uuid } from 'uuid';

// ---------- Validaciones ----------

const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;

const isDate = (date: string): boolean =>
  Boolean(Date.parse(date));

const isGender = (param: string): param is Gender =>
  Object.values(Gender).map(g => g.toString()).includes(param);

const isHealthCheckRating = (param: number): param is HealthCheckRating =>
  Object.values(HealthCheckRating).includes(param);

// ---------- Parsers para Patient ----------

const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error('Incorrect name');
  return name;
};

const parseDateOfBirth = (dob: unknown): string => {
  if (!isString(dob) || !isDate(dob)) throw new Error('Incorrect date of birth');
  return dob;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) throw new Error('Incorrect ssn');
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error('Incorrect occupation');
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) throw new Error('Incorrect gender');
  return gender;
};

const toNewPatient = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in obj &&
    'dateOfBirth' in obj &&
    'ssn' in obj &&
    'gender' in obj &&
    'occupation' in obj
  ) {
    const newPatient: NewPatient = {
      name: parseName(obj.name),
      dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
      ssn: parseSsn(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseOccupation(obj.occupation)
    };
    return newPatient;
  }

  throw new Error('Missing fields in patient');
};

// ---------- Parsers para Entry ----------

const parseDescription = (desc: unknown): string => {
  if (!isString(desc)) throw new Error('Incorrect description');
  return desc;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) throw new Error('Incorrect date');
  return date;
};

const parseSpecialist = (spec: unknown): string => {
  if (!isString(spec)) throw new Error('Incorrect specialist');
  return spec;
};

const parseDiagnosisCodes = (obj: unknown): Array<Diagnose['code']> => {
  if (
    !obj ||
    typeof obj !== 'object' ||
    !('diagnosisCodes' in obj) ||
    !Array.isArray((obj as any).diagnosisCodes)
  ) {
    return [];
  }

  return (obj as any).diagnosisCodes as Array<Diagnose['code']>;
};

const toNewEntry = (obj: unknown): Entry => {
  if (!obj || typeof obj !== 'object' || !('type' in obj)) {
    throw new Error('Invalid or missing entry data');
  }

  const base = {
    id: uuid(),
    description: parseDescription((obj as any).description),
    date: parseDate((obj as any).date),
    specialist: parseSpecialist((obj as any).specialist),
    diagnosisCodes: parseDiagnosisCodes(obj)
  };

  switch ((obj as any).type) {
    case 'Hospital': {
      const hospitalEntry: HospitalEntry = {
        ...base,
        type: 'Hospital',
        discharge: {
          date: parseDate((obj as any).discharge?.date),
          criteria: parseDescription((obj as any).discharge?.criteria)
        }
      };
      return hospitalEntry;
    }

    case 'OccupationalHealthcare': {
      const occupationalEntry: OccupationalHealthcareEntry = {
        ...base,
        type: 'OccupationalHealthcare',
        employerName: parseName((obj as any).employerName),
        sickLeave: (obj as any).sickLeave
          ? {
              startDate: parseDate((obj as any).sickLeave.startDate),
              endDate: parseDate((obj as any).sickLeave.endDate)
            }
          : undefined
      };
      return occupationalEntry;
    }

    case 'HealthCheck': {
      const rating = Number((obj as any).healthCheckRating);
      if (!isHealthCheckRating(rating)) throw new Error('Invalid healthCheckRating');
      const healthEntry: HealthCheckEntry = {
        ...base,
        type: 'HealthCheck',
        healthCheckRating: rating
      };
      return healthEntry;
    }

    default:
      throw new Error(`Unknown entry type: ${(obj as any).type}`);
  }
};

export default toNewPatient;
export { toNewEntry };
