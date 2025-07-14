import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;

const isDate = (date: string): boolean =>
  Boolean(Date.parse(date));

const isGender = (param: string): param is Gender =>
  Object.values(Gender).map(g => g.toString()).includes(param);

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
    'name' in obj && 'dateOfBirth' in obj && 'ssn' in obj &&
    'gender' in obj && 'occupation' in obj
  ) {
    const newEntry: NewPatient = {
      name: parseName(obj.name),
      dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
      ssn: parseSsn(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseOccupation(obj.occupation),
    };
    return newEntry;
  }

  throw new Error('Missing fields in patient');
};

export default toNewPatient;
